import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import { UserRole, User, Product } from './types';
import { Icons, FARMER_FEE, BUYER_FEE, MainLogo, AppIcon, FarmerIllustration, FooterLogo, COLORS, LEGAL_CONTENT, HERO_BG_URL } from './constants';
import { FarmerDashboard, AddProductForm } from './components/FarmerView';
import { MarketBrowser, BuyerOrders } from './components/BuyerView';
import { AdminDashboard } from './components/AdminView';
import Assistant from './components/Assistant';

const Navigation: React.FC = () => (
  <nav className="bg-[#1b4332] text-white px-6 md:px-12 py-2.5 hidden md:flex items-center justify-between border-b border-white/10 sticky top-0 z-50 backdrop-blur-lg">
    <div className="flex items-center gap-12 lg:gap-16">
      <div className="flex-shrink-0 transition-all hover:scale-105">
        <MainLogo className="h-24 lg:h-24 w-auto object-contain" />
      </div>
      
      <div className="flex gap-6 lg:gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
        <a href="#" className="hover:text-white transition-all">Home</a>
        <a href="#" className="hover:text-white transition-all">Exchange</a>
        <a href="#" className="hover:text-white transition-all">Logistics</a>
        <a href="#" className="hover:text-white transition-all">Support</a>
      </div>
    </div>

    <div className="flex gap-5 lg:gap-6 flex-shrink-0 ml-4">
      <div className="flex items-center gap-3 mr-4">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Global Node Active</span>
      </div>
      <button className="px-7 lg:px-9 py-3 rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-wider hover:bg-white hover:text-[#1b4332] transition-all whitespace-nowrap">
        Farmer Enrollment
      </button>
      <button className="px-7 lg:px-9 py-3 rounded-full bg-[#ff9f1c] text-white text-[10px] font-black uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-orange-500/20 whitespace-nowrap">
        Institutional Access
      </button>
    </div>
  </nav>
);

const MarketTicker: React.FC = () => (
  <div className="bg-[#0a1811] py-3 ticker-container overflow-hidden flex items-center gap-4 text-white border-b border-white/5">
    <div className="flex w-fit animate-marquee whitespace-nowrap items-center">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="flex gap-16 px-8 items-center">
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] opacity-80">
            <span className="text-xl">🍅</span> LIVE: 1200kg Tomato — Amritsar — ₹22/kg <Icons.ArrowRight className="w-3.5 h-3.5 text-[#ff9f1c]"/>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] opacity-80">
            <span className="text-xl">🍚</span> LIVE: 2000kg Basmati — Punjab — ₹65/kg <Icons.ArrowRight className="w-3.5 h-3.5 text-[#ff9f1c]"/>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] opacity-80">
            <span className="text-xl">🧅</span> LIVE: 800kg Onion — Nashik — ₹18/kg <Icons.ArrowRight className="w-3.5 h-3.5 text-[#ff9f1c]"/>
          </div>
        </div>
      ))}
    </div>
    <style>{`
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .animate-marquee { animation: marquee 35s linear infinite; display: flex; }
    `}</style>
  </div>
);

const LandingPage: React.FC<{ onAction: (role: UserRole) => void }> = ({ onAction }) => {
  const [modalContent, setModalContent] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white font-outfit relative">
      <div className="fixed top-4 right-4 z-[60] pointer-events-none">
        <div className="bg-green-500/10 backdrop-blur-md border border-green-500/20 px-4 py-1.5 rounded-full flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Production Node v1.1.4</span>
        </div>
      </div>
      <Navigation />
      <MarketTicker />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] w-full bg-[#1b4332] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0 bg-[#1b4332]">
          <img 
            src={HERO_BG_URL} 
            alt="Bharat's Direct Bulk Market Hero"
            className="w-full h-full object-cover object-center"
            loading="eager"
            onError={(e) => {
               e.currentTarget.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2560";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b4332]/95 via-[#1b4332]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-10 w-full relative z-20">
          <div className="max-w-4xl space-y-8 animate-enter">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 text-[#ff9f1c] text-[10px] font-black uppercase tracking-[0.4em]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff9f1c] animate-pulse"></span>
              National B2B Exchange System
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-white">
              Bharat's <br/>
              <span className="text-[#ff9f1c]">Direct</span><br/>
              Bulk Market
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-lg leading-relaxed font-medium">
              India's premier digital exchange connecting farmers directly with institutional bulk buyers. Zero middlemen, total transparency.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">
              <button 
                onClick={() => onAction(UserRole.FARMER)}
                className="w-full sm:w-auto px-10 py-5 lg:py-5.5 rounded-[28px] bg-[#ff9f1c] text-white font-black text-lg lg:text-xl hover:scale-105 transition-all shadow-xl shadow-orange-500/30 italic flex items-center justify-center gap-4 group"
              >
                Farmer Enrollment <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => onAction(UserRole.BUYER)}
                className="w-full sm:w-auto px-10 py-5 lg:py-5.5 rounded-[28px] bg-white text-[#1b4332] font-black text-lg lg:text-xl hover:bg-stone-50 transition-all shadow-xl shadow-black/5 border-2 border-stone-100 flex items-center justify-center"
              >
                Bulk Buyer Access
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-10 py-24 grid lg:grid-cols-12 gap-12 xl:gap-20">
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl font-black text-[#1b4332] tracking-normal uppercase border-l-[12px] border-[#ff9f1c] pl-8 leading-tight">
              Direct Trade Protocol
            </h2>
            <p className="text-lg lg:text-xl text-stone-500 font-medium max-w-xl leading-relaxed">Facilitating direct, transparent digital trade between producers and institutional buyers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Farmer Advantage', desc: 'Secure maximum farm-gate pricing directly from our national exchange.', icon: <Icons.Farmer className="w-11 h-11 text-emerald-700"/>, bg: 'bg-[#f0f9f4]', border: 'border-emerald-100/50' },
              { title: 'Institutional Sourcing', desc: 'Direct supply for hotels, retailers, and high-volume distributors.', icon: <Icons.Home className="w-11 h-11 text-orange-700"/>, bg: 'bg-[#fff7ed]', border: 'border-orange-100/50' },
              { title: 'Secure Escrow', desc: 'Advanced trade settlement ensuring total security for all stakeholders.', icon: <Icons.Shield className="w-11 h-11 text-sky-700"/>, bg: 'bg-[#f0f9ff]', border: 'border-sky-100/50' },
              { title: 'National Transit', desc: 'Optimized logistics network connecting heartlands to urban centers.', icon: <Icons.Truck className="w-11 h-11 text-violet-700"/>, bg: 'bg-[#f5f3ff]', border: 'border-violet-100/50' },
            ].map((f, i) => (
              <div key={i} className={`p-10 rounded-[48px] border ${f.border} ${f.bg} hover-lift shadow-sm flex flex-col items-center text-center group transition-all duration-500`}>
                <div className="mb-6 p-7 bg-white/80 backdrop-blur-sm rounded-[28px] shadow-sm group-hover:shadow-md transition-all">{f.icon}</div>
                <h3 className="text-xl lg:text-2xl font-black text-stone-800 mb-3 tracking-tight">{f.title}</h3>
                <p className="text-stone-500 font-bold leading-relaxed text-base lg:text-lg">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white rounded-[56px] border border-stone-100 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.08)] overflow-hidden sticky top-32">
            <div className="p-7 bg-[#1b4332] text-white">
              <h3 className="font-black uppercase text-[11px] tracking-[0.4em] flex items-center justify-between mb-1.5">Market Pulse <span className="bg-[#ff9f1c] text-[#1b4332] px-3 py-1 rounded-xl text-[8px] font-black animate-pulse uppercase tracking-widest">Live</span></h3>
              <p className="text-white/30 text-[8px] font-bold uppercase tracking-[0.2em]">National Direct Rates</p>
            </div>
            <div className="overflow-hidden">
              <table className="w-full text-left border-collapse table-fixed">
                <thead className="bg-[#fcfbf9] text-[8px] font-black uppercase tracking-[0.2em] text-stone-300 border-b">
                  <tr><th className="p-4 w-[45%]">Producer</th><th className="p-4 w-[30%]">Crop</th><th className="p-4 w-[25%] text-right">Rate</th></tr>
                </thead>
                <tbody className="text-sm font-bold text-stone-600">
                  {[
                    { name: 'Rajesh Kumar', loc: 'Punjab', crop: 'Tomato', icon: '🍅', price: '₹22' },
                    { name: 'Sukhbir Singh', loc: 'Amritsar', crop: 'Wheat', icon: '🌾', price: '₹28' },
                    { name: 'Amit Patel', loc: 'Nashik', crop: 'Onion', icon: '🧅', price: '₹18' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-stone-50 transition-colors border-b last:border-0 group">
                      <td className="p-4 leading-tight">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 shrink-0 rounded-xl bg-stone-50 flex items-center justify-center text-[#1b4332] group-hover:bg-[#1b4332] group-hover:text-white transition-all"><Icons.Farmer className="w-4 h-4" /></div>
                           <div className="min-w-0"><span className="text-stone-800 block text-base font-black tracking-tight truncate">{row.name}</span><span className="text-[8px] text-stone-300 uppercase font-black tracking-widest">{row.loc}</span></div>
                        </div>
                      </td>
                      <td className="p-4"><span className="text-lg mr-2">{row.icon}</span><span className="text-xs font-black italic">{row.crop}</span></td>
                      <td className="p-4 text-[#1b4332] text-right font-black text-lg">{row.price}<span className="text-[9px] opacity-40">/kg</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-7 text-center border-t bg-stone-50/50"><button className="text-[9px] font-black uppercase tracking-[0.3em] text-[#1b4332] hover:text-[#ff9f1c] transition-all">Full Market Ledger</button></div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="bg-[#0d1b14] text-white/70 pt-24 pb-16 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-24">
            {/* Branding Column */}
            <div className="space-y-8">
              <div className="inline-block transition-all hover:scale-105">
                <FooterLogo className="h-32 w-auto object-contain pointer-events-none" />
              </div>
              <p className="text-lg leading-relaxed font-medium text-white/50 max-w-xs">
                India's premier digital exchange facilitating high-volume, direct agricultural trade between heartland producers and institutional buyers.
              </p>
              <div className="flex gap-4 pt-4">
                {[Icons.Facebook, Icons.Twitter, Icons.LinkedIn, Icons.Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-[#ff9f1c] hover:text-[#1b4332] transition-all border border-white/10 group">
                    <Icon className="w-5 h-5 group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>

            {/* Market Column */}
            <div className="space-y-8">
              <h4 className="text-white font-black uppercase text-[11px] tracking-[0.4em]">The Exchange</h4>
              <nav className="flex flex-col gap-5 text-[15px] font-bold">
                <button onClick={() => setModalContent(LEGAL_CONTENT.terms)} className="text-left hover:text-[#ff9f1c] transition-colors w-fit">Direct Market Access</button>
                <button onClick={() => setModalContent(LEGAL_CONTENT.shipping)} className="text-left hover:text-[#ff9f1c] transition-colors w-fit">National Supply Chain</button>
                <button onClick={() => setModalContent(LEGAL_CONTENT.terms)} className="text-left hover:text-[#ff9f1c] transition-colors w-fit">Price Transparency Ledger</button>
                <button onClick={() => setModalContent(LEGAL_CONTENT.terms)} className="text-left hover:text-[#ff9f1c] transition-colors w-fit">Institutional Sourcing</button>
              </nav>
            </div>

            {/* Compliance Column */}
            <div className="space-y-8">
              <h4 className="text-white font-black uppercase text-[11px] tracking-[0.4em]">Compliance</h4>
              <nav className="flex flex-col gap-5 text-[15px] font-bold">
                <button onClick={() => setModalContent(LEGAL_CONTENT.terms)} className="text-left hover:text-[#ff9f1c] transition-colors w-fit">Trade Protocol Code</button>
                <button onClick={() => setModalContent(LEGAL_CONTENT.privacy)} className="text-left hover:text-[#ff9f1c] transition-colors w-fit">Privacy Shield (KYC)</button>
                <button onClick={() => setModalContent(LEGAL_CONTENT.returns)} className="text-left hover:text-[#ff9f1c] transition-colors w-fit">Escrow Terms & Safety</button>
                <button onClick={() => setModalContent(LEGAL_CONTENT.terms)} className="text-left hover:text-[#ff9f1c] transition-colors w-fit">Arbitration Rules</button>
              </nav>
            </div>

            {/* Support Column */}
            <div className="space-y-8">
              <h4 className="text-white font-black uppercase text-[11px] tracking-[0.4em]">Connect</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-xl bg-[#ff9f1c]/10 flex items-center justify-center border border-[#ff9f1c]/20">
                    <Icons.Phone className="w-4 h-4 text-[#ff9f1c]"/>
                  </div>
                  <p className="text-sm font-bold text-white/80">+91 1800-123-4567</p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-xl bg-[#ff9f1c]/10 flex items-center justify-center border border-[#ff9f1c]/20">
                    <Icons.Mail className="w-4 h-4 text-[#ff9f1c]"/>
                  </div>
                  <p className="text-sm font-bold text-white/80">trade@harvest2home.store</p>
                </div>
                <button 
                  onClick={() => onAction(UserRole.FARMER)}
                  className="w-full mt-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-[#1b4332] transition-all"
                >
                  Farmer Help Desk
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-white/40">© 2025 HARVEST2HOME.STORE — ALL PROTOCOLS OBSERVED</p>
              <p className="text-[#ff9f1c]/50 font-black">Powered by Samanvaya Trust — Engineered by Starbiztech, LLC</p>
            </div>
            <div className="flex gap-8 text-white/20">
              <span className="hover:text-white cursor-help">Trade ID: 942-XJ</span>
              <span className="hover:text-white cursor-help">Secure Node: 0x82...1F</span>
            </div>
          </div>
        </div>

        {/* Legal Modal */}
        {modalContent && (
          <div className="fixed inset-0 z-[100] bg-[#0d1b14]/95 backdrop-blur-xl flex items-center justify-center p-6 sm:p-12" onClick={() => setModalContent(null)}>
            <div className="bg-white p-12 sm:p-20 rounded-[80px] max-w-3xl w-full animate-enter text-[#1b4332] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.5)] border border-white/20" onClick={e => e.stopPropagation()}>
              <h3 className="text-5xl font-black mb-10 tracking-tighter italic uppercase border-b-8 border-[#ff9f1c] pb-4 inline-block">Direct Protocol</h3>
              <p className="text-2xl font-medium leading-[1.6] text-stone-600 mb-12">{modalContent}</p>
              <button onClick={() => setModalContent(null)} className="w-full py-7 bg-[#1b4332] text-white font-black rounded-[40px] text-2xl hover:brightness-110 active:scale-95 transition-all">ACKNOWLEDGE PROTOCOL</button>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
};

const RegistrationFlow: React.FC<{ role: UserRole, onBack: () => void }> = ({ role, onBack }) => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [formData, setFormData] = useState({ name: '', location: '', bank: '' });
  const { login } = useApp();

  const currentFee = role === UserRole.FARMER ? FARMER_FEE : BUYER_FEE;

  return (
    <div className="min-h-screen bg-[#fcfbf9] flex flex-col items-center justify-center p-12 font-outfit relative overflow-hidden">
      <div className="mb-10"><MainLogo className="h-48 w-auto" /></div>
      
      <div className="w-full max-w-2xl bg-white p-16 md:p-24 rounded-[80px] shadow-[0_120px_240px_-80px_rgba(27,67,50,0.25)] border border-stone-100 relative z-10 animate-enter">
        {step === 1 && (
          <div className="space-y-12">
            <div className="text-center"><h2 className="text-6xl font-black text-[#1b4332] mb-4 italic">Secure Entry</h2><p className="text-stone-400 font-black uppercase text-[12px] tracking-[0.5em]">{role} PORTAL</p></div>
            <div className="space-y-8">
              <input type="tel" placeholder="Mobile Number" className="w-full px-10 py-8 bg-stone-50 rounded-[40px] text-4xl font-black outline-none border-2 border-transparent focus:border-[#1b4332] shadow-inner" value={phone} onChange={e => setPhone(e.target.value)} />
              <button onClick={() => setStep(2)} className="w-full py-8 bg-[#1b4332] text-white rounded-[40px] font-black text-3xl shadow-xl shadow-[#1b4332]/20">Request OTP</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-16 text-center">
            <h2 className="text-6xl font-black text-[#1b4332] italic">Identity Code</h2>
            <div className="flex gap-4 justify-center">
              {otp.map((d, i) => (
                <input key={i} maxLength={1} className="w-20 h-32 bg-stone-50 rounded-[24px] text-center text-6xl font-black focus:border-[#ff9f1c] outline-none shadow-sm transition-all" value={d} onChange={e => {
                  const next = [...otp]; next[i] = e.target.value; setOtp(next);
                  if (e.target.value && e.target.nextElementSibling) (e.target.nextElementSibling as any).focus();
                }} />
              ))}
            </div>
            <button onClick={() => setStep(3)} className="w-full py-8 bg-[#ff9f1c] text-white rounded-[40px] font-black text-3xl shadow-xl mt-12 italic shadow-orange-500/20">Verify Entry</button>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-12 animate-enter">
            <div className="text-center"><h2 className="text-6xl font-black text-[#1b4332] italic">KYC Audit</h2></div>
            <div className="space-y-6">
              <input className="w-full px-12 py-8 bg-stone-50 rounded-[40px] font-black text-2xl outline-none shadow-inner" placeholder="Full Legal Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input className="w-full px-12 py-8 bg-stone-50 rounded-[40px] font-black text-2xl outline-none shadow-inner" placeholder="Trade Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              <button onClick={() => setStep(4)} className="w-full py-8 bg-[#1b4332] text-white rounded-[40px] font-black text-3xl shadow-xl mt-6 italic">Secure Seat</button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-16 animate-enter">
            <div className="bg-[#1b4332] p-20 rounded-[64px] text-white relative shadow-2xl border border-white/5">
              <p className="text-[14px] font-black text-white/30 uppercase tracking-[0.7em] mb-8">Exchange Activation</p>
              <h2 className="text-[100px] font-black italic tracking-tighter mb-10 leading-none">₹{currentFee}</h2>
              <div className="flex items-center gap-6 bg-white/10 p-8 rounded-[32px] border border-white/10"><Icons.Shield className="w-10 h-10 text-[#ff9f1c]" /><span className="text-[14px] font-black uppercase tracking-[0.4em]">ESCROW READY</span></div>
            </div>
            <button onClick={() => login(phone, role, { name: formData.name, location: formData.location })} className="w-full py-8 bg-[#ff9f1c] text-white rounded-[40px] font-black text-4xl shadow-xl italic shadow-orange-500/30">Activate My Seat</button>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  return (
    <AppProvider>
      <AppContent onRegisterAction={setSelectedRole} selectedRole={selectedRole} />
    </AppProvider>
  );
};

const AppContent: React.FC<{ onRegisterAction: (role: UserRole | null) => void, selectedRole: UserRole | null }> = ({ onRegisterAction, selectedRole }) => {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (user) {
      if (user.role === UserRole.ADMIN) setActiveTab('admin');
      else if (user.role === UserRole.FARMER) setActiveTab('dashboard');
      else setActiveTab('browse');
    }
  }, [user]);

  const view = !user ? (
    selectedRole ? <RegistrationFlow role={selectedRole} onBack={() => onRegisterAction(null)} /> : <LandingPage onAction={onRegisterAction} />
  ) : (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-enter">{activeTab === 'dashboard' ? <FarmerDashboard /> : activeTab === 'browse' ? <MarketBrowser /> : activeTab === 'orders' ? <BuyerOrders /> : activeTab === 'admin' ? <AdminDashboard /> : activeTab === 'add' ? <AddProductForm onComplete={() => setActiveTab('dashboard')} /> : null}</div>
    </Layout>
  );

  return (
    <>
      {view}
      <Assistant />
    </>
  );
};

export default App;