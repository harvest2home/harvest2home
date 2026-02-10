
import React from 'react';
import { useApp } from '../context/AppContext';
import { Icons, MainLogo, COLORS } from '../constants';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const { user, logout } = useApp();

  const farmerTabs = [
    { id: 'dashboard', label: 'My Farm', icon: <Icons.Home /> },
    { id: 'add', label: 'Sell', icon: <Icons.Plus /> },
    { id: 'orders', label: 'Orders', icon: <Icons.Orders /> },
    { id: 'profile', label: 'Account', icon: <Icons.Profile /> },
  ];

  const buyerTabs = [
    { id: 'browse', label: 'Market', icon: <Icons.Search /> },
    { id: 'orders', label: 'Acquisitions', icon: <Icons.Orders /> },
    { id: 'profile', label: 'Profile', icon: <Icons.Profile /> },
  ];

  const adminTabs = [
    { id: 'admin', label: 'Command', icon: <Icons.Shield /> },
    { id: 'browse', label: 'Market', icon: <Icons.Search /> },
    { id: 'profile', label: 'System', icon: <Icons.Settings /> },
  ];

  const tabs = user?.role === UserRole.ADMIN ? adminTabs : 
               user?.role === UserRole.FARMER ? farmerTabs : buyerTabs;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] font-outfit">
      {/* Reduced Height Green Header with Extra Large Logo */}
      <header className="sticky top-0 z-40 bg-[#1b4332] text-white px-4 sm:px-8 py-2 md:py-3 flex justify-between items-center shadow-lg border-b border-white/10">
        <div className="flex items-center gap-6 lg:gap-10">
          <div className="flex items-center group cursor-pointer" onClick={() => setActiveTab(tabs[0].id)}>
             <MainLogo className="h-28 md:h-40 lg:h-48 w-auto object-contain transition-all group-hover:scale-105" />
          </div>
          
          <nav className="hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-white/40">
            <button onClick={() => { logout(); window.location.href='/'; }} className="hover:text-white transition-all">Home</button>
            <button onClick={() => setActiveTab('browse')} className="hover:text-white transition-all">Exchange</button>
            <button className="hover:text-white transition-all">Logistics</button>
            <button className="hover:text-white transition-all">Support</button>
          </nav>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex flex-col text-right">
             <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Node Active</span>
             <span className="text-sm font-black text-white">{user?.name || 'Authorized'}</span>
          </div>
          <button 
            onClick={logout}
            className="bg-white/10 hover:bg-white/20 text-white rounded-[16px] md:rounded-[20px] h-10 w-10 md:h-12 md:w-12 flex items-center justify-center border border-white/10 transition-all shadow-inner relative group overflow-hidden"
          >
             <span className="text-lg md:text-xl font-black">{user?.name?.charAt(0) || 'U'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-48 max-w-5xl mx-auto w-full px-4 sm:px-6 pt-6 md:pt-10">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[94%] max-w-xl bg-[#1b4332] rounded-[40px] sm:rounded-[50px] shadow-[0_30px_80px_-15px_rgba(27,67,50,0.6)] z-50 p-2 border border-white/10">
        <div className="flex justify-around items-center h-16 sm:h-20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center transition-all duration-500 rounded-[20px] sm:rounded-[30px] h-full relative group ${
                activeTab === tab.id ? 'text-[#ff9f1c]' : 'text-white/30 hover:text-white/60'
              }`}
            >
              <div className={`transition-all duration-300 relative z-10 ${activeTab === tab.id ? 'scale-110 sm:scale-125' : 'scale-100'}`}>
                {tab.icon}
              </div>
              <span className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-1 sm:mt-2 transition-all duration-300 relative z-10 ${activeTab === tab.id ? 'opacity-100' : 'opacity-0 scale-75'}`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-white/5 rounded-[20px] sm:rounded-[30px] scale-90 blur-sm"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
