import { GoogleGenAI, Type } from "@google/genai";

// Fix: Always use the named parameter for apiKey initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiAssistance = async (prompt: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context: ${context}\n\nUser Question: ${prompt}`,
      config: {
        systemInstruction: "You are the Harvest2Home assistant. Help farmers list crops or buyers find products. Keep answers short, helpful, and in simple language. Use bullet points if needed.",
        temperature: 0.7,
      },
    });
    // Fix: response.text is a property, not a method
    return response.text || "I'm sorry, I couldn't understand that. Please try again!";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};