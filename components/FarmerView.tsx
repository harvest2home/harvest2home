import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icons, CROP_DATA } from '../constants';
import { OrderStatus, Product } from '../types';
import { supabase } from '../supabase';

export const FarmerDashboard: React.FC = () => {
  const { user, products, orders, refreshData } = useApp();
  const [isPaying, setIsPaying] = useState(false);

  // Strict guard for build safety
  if (!user || !user.id) {
    return (
      <div className="p-20 text-center bg-white rounded-[50px] border border-stone-100 shadow-sm">
        <p className="text-stone-400 font-black uppercase text-xs tracking-[0.3em]">Identity Verification Required</p>
      </div>
    );
  }

  // Capture ID in a local constant so TS knows it stays stable in async closures
  const currentUserId = user.id;

  const myProducts = products.filter(p => p.farmerId === currentUserId);
  const myOrders = orders.filter(o => o.farmerId === currentUserId);

  if (!user.hasPaidFee) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-white border-4 border-[#1b4332] p-10 rounded-[50px] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5"><Icons.Shield className="w-48 h-48" /></div>
          <div className="w-24 h-24 bg-green-50 text-[#1b4332] rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-inner">
             <Icons.Wallet className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-stone-800 mb-4 italic tracking-tighter">Activate Your Farm</h2>
          <p className="text-stone-400 font-bold mb-10 leading-relaxed max-w-sm mx-auto">Join the National B2B Exchange. Get discovered by wholesale buyers across Bharat instantly.</p>
          
          <div className="bg-[#fcfbf9] border-2 border-dashed border-stone-200 p-8 rounded-[40px] mb-10">
             <p className="text-[11px] font-black text-stone-300 uppercase tracking-[0.4em] mb-2">Lifetime Registration</p>
             <p className="text-6xl font-black text-[#1b4332]">₹500</p>
             <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-black text-green-600 uppercase tracking-widest">
                <Icons.Shield className="w-3 h-3" /> SECURE ESCROW SETTLEMENT
             </div>
          </div>

          <button 
            disabled={isPaying}
            onClick={async () => {
              setIsPaying(true);
              setTimeout(async () => {
                const { error } = await supabase.from('users').update({ hasPaidFee: true, isApproved: true }).eq('id', currentUserId);
                if (!error) {
                  await refreshData();
                  alert("KYC & Payment Verified! Welcome to Harvest2Home Exchange.");
                }
                setIsPaying(false);
              }, 2000);
            }}
            className="w-full bg-[#1b4332] text-white py-7 rounded-[32px] font-black text-2xl shadow-2xl shadow-green-900/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50"
          >
            {isPaying ? "VERIFYING KYC..." : "PAY ₹500 & START SELLING"}
          </button>
          <p className="mt-6 text-[10px] font-black text-stone-300 uppercase tracking-widest">Secured by Samanvaya Trust Gateway</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
         <h2 className="text-3xl font-black text-stone-800 tracking-tighter italic">Farm Overview</h2>
         <span className="bg-green-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">Live on Exchange</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-stone-100 flex items-center justify-between group hover:border-[#1b4332] transition-colors">
          <div>
            <p className="text-stone-400 text-[9px] uppercase font-black tracking-widest mb-1">Incoming Orders</p>
            <p className="text-4xl font-black text-stone-800">{myOrders.length}</p>
          </div>
          <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-stone-300 group-hover:text-[#1b4332] transition-colors">
             <Icons.Orders className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-stone-100 flex items-center justify-between group hover:border-[#ff9f1c] transition-colors">
          <div>
            <p className="text-stone-400 text-[9px] uppercase font-black tracking-widest mb-1">Escrow Balance</p>
            <p className="text-4xl font-black text-[#ff9f1c]">₹0</p>
          </div>
          <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-stone-300 group-hover:text-[#ff9f1c] transition-colors">
             <Icons.Wallet className="w-6 h-6" />
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-stone-100 pb-4">
          <h3 className="text-xl font-black text-stone-800 uppercase tracking-tighter">My Active Inventory</h3>
        </div>
        {myProducts.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-stone-100 p-20 rounded-[50px] text-center">
            <p className="text-stone-300 font-black uppercase text-xs tracking-[0.3em]">No crops listed yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProducts.map(p => (
              <div key={p.id} className="bg-white rounded-[32px] border border-stone-100 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all group">
                <div className="h-40 relative">
                   <img src={p.image} className="w-full h-full object-cover" />
                   <div className="absolute top-3 left-3">
                      <span className="bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg text-[8px] font-black uppercase">{p.supplyFrequency}</span>
                   </div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="font-black text-stone-800 leading-tight">{p.name}</h4>
                    <p className="text-[10px] text-stone-400 font-bold uppercase mt-1">₹{p.pricePerKg}/kg • {p.availableQuantity}kg Left</p>
                  </div>
                  <button className="w-full py-2.5 bg-stone-50 text-stone-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-stone-100 transition-colors">Manage Stock</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export const AddProductForm: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { user, refreshData } = useApp();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [qty, setQty] = useState(500);
  const [price, setPrice] = useState(25);
  const [frequency, setFrequency] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE'>('DAILY');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user || !user.id || !selectedCrop || !selectedCategory) return;
    setLoading(true);
    
    // Stable variables for async call
    const currentUserId = user.id;
    const currentUserName = user.name;
    const currentLocation = user.location || 'Direct Farm';

    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      farmerId: currentUserId,
      farmerName: currentUserName,
      name: selectedCrop.name,
      category: selectedCategory.id,
      pricePerKg: price,
      availableQuantity: qty,
      minOrderQuantity: 100,
      image: selectedCrop.image || `https://picsum.photos/seed/${selectedCrop.name}/800/600`,
      location: currentLocation,
      supplyFrequency: frequency
    };
    
    const { error } = await supabase.from('products').insert([newProduct]);
    if (!error) {
      await refreshData();
      onComplete();
    } else {
      alert("Trade Listing Failed. Check network.");
    }
    setLoading(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-enter">
            <div className="text-center">
              <h2 className="text-4xl font-black text-[#1b4332] tracking-tighter italic">Create Listing</h2>
              <p className="text-stone-400 font-bold mt-2">What are you harvesting?</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {CROP_DATA.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat); setStep(2); }}
                  className="bg-white border-2 border-stone-100 p-10 rounded-[50px] shadow-sm flex flex-col items-center gap-6 transition-all hover:border-[#1b4332] hover:shadow-xl active:scale-95 group"
                >
                  <span className="text-7xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className="font-black text-xs text-stone-700 uppercase tracking-[0.3em]">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-enter">
            <div className="flex items-center gap-6">
              <button onClick={() => setStep(1)} className="p-4 bg-white rounded-2xl border border-stone-100 text-stone-400 shadow-sm"><Icons.ChevronLeft /></button>
              <div>
                 <h2 className="text-3xl font-black text-stone-800 italic">{selectedCategory?.name} Selection</h2>
                 <p className="text-stone-400 font-bold text-xs uppercase tracking-widest">Select specific commodity</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedCategory?.items.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => { setSelectedCrop(item); setStep(3); }}
                  className="bg-white border-2 border-stone-100 p-4 rounded-[32px] shadow-sm flex flex-col items-center gap-4 transition-all hover:border-[#1b4332] hover:shadow-lg active:scale-95"
                >
                  <img src={item.image} className="w-full h-24 object-cover rounded-2xl" />
                  <span className="font-black text-[10px] text-stone-600 text-center uppercase tracking-tighter leading-tight">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-10 animate-enter pb-12">
            <div className="flex items-center gap-6">
              <button onClick={() => setStep(2)} className="p-4 bg-white rounded-2xl border border-stone-100 text-stone-400 shadow-sm"><Icons.ChevronLeft /></button>
              <div className="flex items-center gap-4">
                <img src={selectedCrop?.image} className="w-16 h-16 rounded-2xl object-cover border-2 border-[#1b4332]" />
                <h2 className="text-4xl font-black text-[#1b4332] tracking-tighter italic">{selectedCrop?.name}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm space-y-6">
                  <label className="text-[11px] font-black text-stone-400 uppercase tracking-[0.4em] block text-center">Available Stock (kg)</label>
                  <div className="flex items-center justify-between">
                     <button onClick={() => setQty(Math.max(100, qty - 100))} className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 hover:bg-stone-100"><Icons.Minus /></button>
                     <span className="text-6xl font-black text-[#1b4332]">{qty}</span>
                     <button onClick={() => setQty(qty + 100)} className="w-16 h-16 bg-[#1b4332] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/20"><Icons.Plus /></button>
                  </div>
               </div>

               <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm space-y-6">
                  <label className="text-[11px] font-black text-stone-400 uppercase tracking-[0.4em] block text-center">Asking Price (₹/kg)</label>
                  <div className="flex items-center justify-between">
                     <button onClick={() => setPrice(Math.max(1, price - 2))} className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 hover:bg-stone-100"><Icons.Minus /></button>
                     <span className="text-6xl font-black text-[#ff9f1c]">₹{price}</span>
                     <button onClick={() => setPrice(price + 2)} className="w-16 h-16 bg-[#ff9f1c] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20"><Icons.Plus /></button>
                  </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm space-y-6">
              <label className="text-[11px] font-black text-stone-400 uppercase tracking-[0.4em] block text-center">Harvest Supply Cycle</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'DAILY', label: 'Daily', icon: '☀️' },
                  { id: 'WEEKLY', label: 'Weekly', icon: '📅' },
                  { id: 'MONTHLY', label: 'Monthly', icon: '🌙' },
                  { id: 'ONCE', label: 'Bulk Lot', icon: '📦' },
                ].map(freq => (
                  <button
                    key={freq.id}
                    onClick={() => setFrequency(freq.id as any)}
                    className={`py-6 rounded-[28px] border-2 font-black flex flex-col items-center gap-3 transition-all ${
                      frequency === freq.id ? 'bg-green-50 border-[#1b4332] text-[#1b4332] shadow-xl' : 'bg-[#fcfbf9] border-transparent text-stone-400 hover:border-stone-200'
                    }`}
                  >
                    <span className="text-3xl">{freq.icon}</span>
                    <span className="text-[10px] uppercase tracking-widest">{freq.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-[#1b4332] text-white py-8 rounded-[40px] font-black text-2xl shadow-2xl shadow-green-900/20 flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-95 transition-all mt-8"
            >
              {loading ? "COMMITTING TO BLOCKCHAIN..." : "LIST ON NATIONAL EXCHANGE"}
              <Icons.ArrowRight className="w-6 h-6" />
            </button>
          </div>
        );
    }
  };

  return <div className="pb-12">{renderStep()}</div>;
};
