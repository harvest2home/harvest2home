
import React, { useState, useRef, useEffect } from 'react';
import { getAiAssistance } from '../services/geminiService';
import { useApp } from '../context/AppContext';
import { Icons } from '../constants';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer, data.byteOffset, data.byteLength / 2);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAiTalking, setIsAiTalking] = useState(false);
  const { user } = useApp();

  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const currentInputTransRef = useRef('');
  const currentOutputTransRef = useRef('');

  const stopVoice = () => {
    setIsVoiceActive(false);
    setIsAiTalking(false);
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch (e) {}
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    sourcesRef.current.forEach(source => { try { source.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const startVoice = async () => {
    try {
      if (!process.env.API_KEY) throw new Error("API Key Missing");
      
      setIsVoiceActive(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }
      if (!outputAudioContextRef.current) {
        outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }

      await audioContextRef.current.resume();
      await outputAudioContextRef.current.resume();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) { int16[i] = inputData[i] * 32768; }
              const pcmBlob = { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then(session => {
                if (sessionRef.current === session) session.sendRealtimeInput({ media: pcmBlob });
              }).catch(() => {});
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.inputTranscription) currentInputTransRef.current += message.serverContent.inputTranscription.text;
            if (message.serverContent?.outputTranscription) currentOutputTransRef.current += message.serverContent.outputTranscription.text;
            
            if (message.serverContent?.turnComplete) {
              const input = currentInputTransRef.current;
              const output = currentOutputTransRef.current;
              if (input || output) {
                setHistory(prev => [
                  ...prev, 
                  ...(input ? [{ role: 'user' as const, text: input }] : []), 
                  ...(output ? [{ role: 'ai' as const, text: output }] : [])
                ]);
              }
              currentInputTransRef.current = ''; currentOutputTransRef.current = '';
            }

            const modelTurn = message.serverContent?.modelTurn;
            if (modelTurn?.parts && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              setIsAiTalking(true);
              for (const part of modelTurn.parts) {
                if (part.inlineData?.data) {
                  const base64Audio = part.inlineData.data;
                  nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                  const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
                  const source = ctx.createBufferSource();
                  source.buffer = audioBuffer;
                  source.connect(ctx.destination);
                  source.addEventListener('ended', () => { sourcesRef.current.delete(source); if (sourcesRef.current.size === 0) setIsAiTalking(false); });
                  source.start(nextStartTimeRef.current);
                  nextStartTimeRef.current += audioBuffer.duration;
                  sourcesRef.current.add(source);
                }
              }
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsAiTalking(false);
            }
          },
          onerror: (e) => { console.error("Voice Connection Failed", e); stopVoice(); },
          onclose: () => { setIsVoiceActive(false); setIsAiTalking(false); },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: `You are the Harvest2Home Krishi Sahayak. 
          Language Requirements:
          - If the user speaks KANNADA, you respond in sweet, helpful KANNADA audio.
          - You are a native speaker of Kannada, Hindi, and English.
          - Expertise: Bulk agricultural trade, soil health, market arbitrage.
          - Style: Professional, respectful, and family-like warmth.`,
        },
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsVoiceActive(false);
      alert("Sahayak is momentarily offline. Please check your signal.");
    }
  };

  const handleSend = async () => {
    if (!query.trim()) return;
    const userMsg = query; setQuery('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    const aiResponse = await getAiAssistance(userMsg, `User: ${user?.name}, Role: ${user?.role}, Location: ${user?.location}`);
    setHistory(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setLoading(false);
  };

  useEffect(() => { return () => stopVoice(); }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-[#1b4332] text-white rounded-full shadow-2xl flex items-center justify-center z-[100] transition-all hover:scale-110 active:scale-90 animate-bounce group"
      >
        {!isOpen && <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>}
        <Icons.Plus className={`${isOpen ? 'rotate-45' : 'rotate-0'} transition-transform w-8 h-8`} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-end sm:items-center sm:justify-center p-4" onClick={() => setIsOpen(false)}>
          <div className="bg-white w-full max-w-lg rounded-t-[40px] sm:rounded-[40px] shadow-2xl flex flex-col h-[80vh] overflow-hidden animate-enter" onClick={e => e.stopPropagation()}>
            <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-[#1b4332] text-white">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isAiTalking ? 'bg-orange-500 scale-110' : 'bg-white/10'}`}>
                   {isAiTalking ? <div className="flex gap-1"><div className="w-1 h-3 bg-white animate-bounce" /><div className="w-1 h-5 bg-white animate-bounce" style={{animationDelay: '0.1s'}} /></div> : <Icons.Shield />}
                </div>
                <div><h3 className="font-black text-xl tracking-tight">Krishi Sahayak AI</h3><p className="text-[10px] uppercase font-black tracking-widest text-white/40">{isVoiceActive ? 'Voice Syncing...' : 'Direct Chat'}</p></div>
              </div>
              <button onClick={() => setIsOpen(false)} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all"><Icons.Plus className="rotate-45 w-6 h-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar bg-stone-50/30">
              {history.length === 0 && (
                <div className="text-center pt-10 space-y-4">
                   <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto"><Icons.Check className="text-green-600" /></div>
                   <h4 className="text-xl font-black text-stone-800 italic">Namaste, {user?.name || 'Kisan'}!</h4>
                   <p className="text-xs text-stone-400 font-bold">Ask me about market rates, crop listing, or buyer help in Kannada, Hindi, or English.</p>
                </div>
              )}
              {history.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-enter`}>
                  <div className={`max-w-[85%] px-6 py-4 rounded-[28px] ${msg.role === 'user' ? 'bg-[#1b4332] text-white rounded-tr-none shadow-md' : 'bg-white text-stone-800 rounded-tl-none border border-stone-100 shadow-sm'}`}>
                    <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {loading && <div className="bg-white border border-stone-100 px-6 py-4 rounded-3xl text-[10px] font-black uppercase text-stone-400 inline-block">Sahayak Thinking...</div>}
            </div>
            <div className="p-8 border-t border-stone-50 bg-white space-y-4">
              <div className="flex gap-3">
                <input type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Speak or Type..." className="flex-1 border-2 border-stone-100 rounded-[24px] px-6 py-4 text-sm font-bold focus:outline-none focus:border-[#1b4332] bg-stone-50 transition-all" />
                <button onClick={handleSend} disabled={loading || !query.trim()} className="bg-[#1b4332] text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform"><Icons.ArrowRight /></button>
              </div>
              <button onClick={isVoiceActive ? stopVoice : startVoice} className={`w-full py-6 rounded-[24px] font-black text-sm tracking-widest uppercase flex items-center justify-center gap-4 transition-all shadow-xl ${isVoiceActive ? 'bg-red-500 text-white animate-pulse' : 'bg-[#ff9f1c] text-white'}`}>
                {isVoiceActive ? 'Stop Listening' : 'Start Multi-lang Voice'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Assistant;
