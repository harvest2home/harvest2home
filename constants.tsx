import React from 'react';

/**
 * 1. CRITICAL BUILD EXPORT
 * This must remain at the very top for the CI bundler to resolve imports correctly.
 */
export const AGRI_FALLBACK_IMAGE: string = "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=1200&auto=format&fit=crop";

// 2. Branding Constants
export const COLORS = {
  primary: '#1b4332',
  secondary: '#ff9f1c',
  accent: '#a7c957',
  bg: '#fcfbf9',
  footer: '#0d1b14',
};

export const FARMER_FEE = 500;
export const BUYER_FEE = 1000;
export const PLATFORM_COMMISSION = 0.10;

const STORAGE_BASE = "https://lhgadfdwfevounfhbkvx.supabase.co/storage/v1/object/public/branding/";

// 3. UI Interfaces
export interface LogoProps {
  className?: string;
  onClick?: () => void;
}

// 4. UI Components
export const VerifiedBadge: React.FC = () => (
  <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
    <span className="text-[8px] font-black uppercase tracking-widest">Verified Producer</span>
  </div>
);

export const MainLogo: React.FC<LogoProps> = ({ className = "h-32 w-auto", onClick }) => {
  return (
    <img 
      src="https://lhgadfdwfevounfhbkvx.supabase.co/storage/v1/object/public/branding/harvest2home-logo-main" 
      alt="Harvest2Home" 
      className={`${className} cursor-pointer`}
      onClick={onClick}
      style={{ display: 'block', opacity: 1 }}
      onError={(e) => {
        e.currentTarget.src = "https://lhgadfdwfevounfhbkvx.supabase.co/storage/v1/object/public/branding/harvest2home-logo-main.png";
      }}
    />
  );
};

export const FooterLogo: React.FC<{ className?: string }> = ({ className = "h-48 w-auto" }) => {
  return (
    <img 
      src="https://lhgadfdwfevounfhbkvx.supabase.co/storage/v1/object/public/branding/harvest2home-logo-footerN.png" 
      alt="Harvest2Home Footer" 
      className={className}
      style={{ display: 'block', opacity: 1 }}
      onError={(e) => {
        e.currentTarget.src = "https://lhgadfdwfevounfhbkvx.supabase.co/storage/v1/object/public/branding/harvest2home-logo-footer.png";
      }}
    />
  );
};

export const HERO_BG_URL = `${STORAGE_BASE}harvest2home-hero-template.png`;

// 5. Icons
export const Icons = {
  Home: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Orders: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  Profile: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Truck: (props: any) => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}><path d="M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M17,12V9.5H19.5L21.47,12H17Z" /></svg>,
  Farmer: (props: any) => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,13.86 19.36,15.57 18.29,16.92C17.75,15.5 16.14,14.5 14.29,14.5C13.68,14.5 13.11,14.65 12.6,14.92L12,15.26L11.4,14.92C10.89,14.65 10.32,14.5 9.71,14.5C7.86,14.5 6.25,15.5 5.71,16.92C4.64,15.57 4,13.86 4,12A8,8 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z" /></svg>,
  Plus: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Shield: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  ArrowRight: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  ChevronLeft: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"/></svg>,
  Wallet: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>,
  Check: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"/></svg>,
  Minus: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Settings: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1-1 1.73l-.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
};

export const LEGAL_CONTENT = {
  terms: "By accessing Harvest2Home, you agree to our direct-trade protocol. Farmers must provide verified land records. Buyers must maintain institutional-grade storage for perishable bulk orders. Payments are held in neutral bank escrow until quality delivery is confirmed.",
  privacy: "We collect only essential KYC data to facilitate agricultural trade. land record details, GST/PAN information, and bank details are strictly used for financial settlements and government compliance.",
  shipping: "Logistics is managed via our partner network. Standard TAT for bulk perishables is 24-48 hours within 500km. Real-time GPS tracking is provided for all institutional orders.",
  returns: "Given the perishable nature of crops, returns are only permitted if quality significantly deviates from the listed specifications."
};

export const CROP_DATA = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: '🥦',
    items: [
      { id: 'v1', name: 'Tomato (Hybrid)', icon: '🍅', image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d5d?q=80&w=800' },
      { id: 'v2', name: 'Red Onion', icon: '🧅', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=800' },
      { id: 'v3', name: 'Potato (Jyoti)', icon: '🥔', image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d5d?q=80&w=800' },
    ]
  },
  {
    id: 'grains',
    name: 'Grains',
    icon: '🌾',
    items: [
      { id: 'g1', name: 'Sharbati Wheat', icon: '🌾', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800' },
      { id: 'g2', name: 'Basmati Rice (1121)', icon: '🍚', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800' },
    ]
  }
];

export const CATEGORIES = CROP_DATA;
