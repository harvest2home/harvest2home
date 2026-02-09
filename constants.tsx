
import React from 'react';

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

export const MainLogo: React.FC<{ className?: string }> = ({ className = "h-24 w-auto" }) => (
  <img 
    src="https://lhgadfdwfevounfhbkvx.supabase.co/storage/v1/object/public/branding/harvest2home-logo-main" 
    alt="Harvest2Home" 
    className={className} 
    style={{ display: 'block', opacity: 1 }}
    onError={(e) => {
      e.currentTarget.src = "https://lhgadfdwfevounfhbkvx.supabase.co/storage/v1/object/public/branding/harvest2home-logo-main.png";
    }}
  />
);

export const AppIcon: React.FC<{ className?: string }> = ({ className = "w-24 h-24" }) => (
  <img src={`${STORAGE_BASE}harvest2home-icon.png`} alt="H2H" className={className} />
);

export const FarmerIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-auto" }) => (
  <img src={`${STORAGE_BASE}harvest2home-farmer.png`} alt="Indian Farmer" className={className} />
);

export const FooterLogo: React.FC<{ className?: string }> = ({ className = "h-40 w-auto" }) => (
  <img 
    src="https://lhgadfdwfevounfhbkvx.supabase.co/storage/v1/object/public/branding/harvest2home-logo-footerN.png" 
    alt="Harvest2Home Footer" 
    className={className}
    style={{ 
      display: 'block', 
      opacity: 1,
      filter: 'brightness(1.1) contrast(1.1)'
    }}
    onError={(e) => {
      e.currentTarget.src = "https://lhgadfdwfevounfhbkvx.supabase.co/storage/v1/object/public/branding/harvest2home-logo-footer.png";
    }}
  />
);

export const HERO_BG_URL = `${STORAGE_BASE}harvest2home-hero-template.png`;

export const Icons = {
  Home: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Orders: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  Profile: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Truck: (props: any) => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}><path d="M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M17,12V9.5H19.5L21.47,12H17Z" /></svg>,
  Handshake: (props: any) => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}><path d="M12.44,17.29L10,14.85L7,17.85L5,15.85L8,12.85L5.56,10.41C5.17,10.03 5.17,9.4 5.56,9.03L9.03,5.56C9.4,5.17 10.03,5.17 10.41,5.56L12.85,8L15.85,5L17.85,7L14.85,10L17.29,12.44C17.68,12.83 17.68,13.46 17.29,13.84L13.84,17.29C13.46,17.68 12.83,17.68 12.44,17.29M1,19V21H23V19H1Z" /></svg>,
  Farmer: (props: any) => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,13.86 19.36,15.57 18.29,16.92C17.75,15.5 16.14,14.5 14.29,14.5C13.68,14.5 13.11,14.65 12.6,14.92L12,15.26L11.4,14.92C10.89,14.65 10.32,14.5 9.71,14.5C7.86,14.5 6.25,15.5 5.71,16.92C4.64,15.57 4,13.86 4,12A8,8 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z" /></svg>,
  Plus: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Shield: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  ArrowRight: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  ChevronLeft: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"/></svg>,
  Phone: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Mail: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Facebook: (props: any) => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>,
  Twitter: (props: any) => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>,
  LinkedIn: (props: any) => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2z"/></svg>,
  Instagram: (props: any) => <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" {...props}><path d="M7 2h10c2.76 0 5 2.24 5 5v10c0 2.76-2.24 5-5 5H7c-2.76 0-5-2.24-5-5V7c0-1.66 1.34-3 3-3h10c1.66 0 3-1.34 3-3V7c0-1.66-1.34-3-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5-1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>,
  Settings: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1-1 1.73l-.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  Wallet: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>,
  Check: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"/></svg>,
  Minus: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Map: (props: any) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
};

export const LEGAL_CONTENT = {
  terms: "By accessing Harvest2Home, you agree to our direct-trade protocol. Farmers must provide verified land records. Buyers must maintain institutional-grade storage for perishable bulk orders. Payments are held in neutral bank escrow until quality delivery is confirmed.",
  privacy: "We collect only essential KYC data to facilitate agricultural trade. land record details, GST/PAN information, and bank details are strictly used for financial settlements and government compliance.",
  shipping: "Logistics is managed via our partner network. Standard TAT for bulk perishables is 24-48 hours within 500km. Real-time GPS tracking is provided for all institutional orders.",
  returns: "Given the perishable nature of crops, returns are only permitted if quality significantly deviates from the listed specifications. Disputes are handled by the Ag-Exchange Arbitration Council."
};

export const CROP_DATA = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: '🥦',
    items: [
      { id: 'v1', name: 'Tomato (Hybrid)', icon: '🍅', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800' },
      { id: 'v2', name: 'Red Onion', icon: '🧅', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80&w=800' },
      { id: 'v3', name: 'Potato (Jyoti)', icon: '🥔', image: 'https://images.unsplash.com/photo-1518977676601-b53f02ac6d5d?q=80&w=800' },
      { id: 'v4', name: 'Green Chilli', icon: '🌶️', image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?q=80&w=800' },
      { id: 'v5', name: 'Fresh Carrots', icon: '🥕', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=800' },
    ]
  },
  {
    id: 'grains',
    name: 'Grains',
    icon: '🌾',
    items: [
      { id: 'g1', name: 'Sharbati Wheat', icon: '🌾', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800' },
      { id: 'g2', name: 'Basmati Rice (1121)', icon: '🍚', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800' },
      { id: 'g3', name: 'Yellow Corn', icon: '🌽', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800' },
    ]
  },
  {
    id: 'fruits',
    name: 'Fruits',
    icon: '🍎',
    items: [
      { id: 'f1', name: 'Alphanso Mango', icon: '🥭', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800' },
      { id: 'f2', name: 'Royal Gala Apple', icon: '🍎', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?q=80&w=800' },
      { id: 'f3', name: 'Robusta Banana', icon: '🍌', image: 'https://images.unsplash.com/photo-1571771894821-ad99026b0acb?q=80&w=800' },
      { id: 'f4', name: 'Green Grapes', icon: '🍇', image: 'https://images.unsplash.com/photo-1537640538966-79f369b41f8f?q=80&w=800' },
    ]
  }
];

export const CATEGORIES = CROP_DATA;
