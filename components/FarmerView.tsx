
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icons, CROP_DATA, AGRI_FALLBACK_IMAGE } from '../constants';
import { Product, User } from '../types';
import { supabase } from '../supabase';

export const FarmerDashboard: React.FC = () => {
  const { user, products, orders, refreshData } = useApp();
  const [isPaying, setIsPaying] = useState(false);

  // 1. Strict Null Guard
  if (!user) {
    return (
      <div className="p-20 text-center bg-white rounded-[50px] border border-stone-100 shadow-sm">
        <p className="text-stone-400 font-black uppercase text-xs tracking-[0.3em]">Identity Verification Required</p>
      </div>
    );
  }

  // 2. Explicit Shadowing for CI Compiler
  const activeUser: User = user;
  const myProducts = products.filter(p => p.farmerId === activeUser.id);
  const myOrders = orders.filter(o => o.farmerId === activeUser.id);

  if (!activeUser.hasPaidFee) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-white border-4 border-[#1b4332] p-10 rounded-[50px] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5"><Icons.Shield className="w-48 h-48" /></div>
          <div className="w-24 h-24 bg-green-50 text-[#1b4332] rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-inner">
             <Icons.Wallet className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-stone-800 mb-4 italic tracking-tighter">Activate Your Farm</h2>
          <p className="text-stone-400 font-bold mb-10 leading-relaxed max-w-sm mx-auto">Join the National B2B Exchange. Get discovered by wholesale buyers across Bharat instantly.</p>
          
          <div className="bg-[#fcfbf9] border-2 border-dashed border-stone-200 p-8 rounded-[40px] mb-10 text-center">
             <p className="text-[11px] font-black text-stone-300 uppercase tracking-[0.4em] mb-2">Lifetime Registration</p>
             <p className="text-6xl font-black text-[#1b4332]">₹500</p>
          </div>

          <button 
            disabled={isPaying}
            onClick={async () => {
              setIsPaying(true);
              // Use shadowed constant for closure safety
              const userIdForClosure = activeUser.id;
              setTimeout(async () => {
                const { error } = await supabase.from('users').update({ hasPaidFee: true, isApproved: true }).eq('id', userIdForClosure);
                if (!error) {
                  await refreshData();
                  alert("KYC Verified! Welcome to the Exchange.");
                }
                setIsPaying(false);
              }, 1500);
            }}
            className="w-full bg-[#1b4332] text-white py-7 rounded-[32px] font-black text-2xl shadow-2xl shadow-green-900/20"
          >
            {isPaying ? "VERIFYING..." : "ACTIVATE FARM ACCOUNT"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
         <h2 className="text-3xl font-black text-stone-800 tracking-tighter italic">Farm Overview</h2>
         <span className="bg-green-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Live</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-stone-100 flex items-center justify-between">
          <div>
            <p className="text-stone-400 text-[9px] uppercase font-black tracking-widest mb-1">Incoming Orders</p>
            <p className="text-4xl font-black text-stone-800">{myOrders.length}</p>
          </div>
          <Icons.Orders className="w-8 h-8 text-[#1b4332]" />
        </div>
      </div>

      <section className="space-y-6">
        <h3 className="text-xl font-black text-stone-800 uppercase tracking-tighter">My Active Inventory</h3>
        {myProducts.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-stone-100 p-20 rounded-[50px] text-center">
            <p className="text-stone-300 font-black uppercase text-xs tracking-[0.3em]">No crops listed</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProducts.map(p => (
              <div key={p.id} className="bg-white rounded-[32px] border border-stone-100 shadow-sm overflow-hidden p-5">
                <img src={p.image || AGRI_FALLBACK_IMAGE} className="w-full h-32 object-cover rounded-2xl mb-4" alt={p.name} />
                <h4 className="font-black text-stone-800">{p.name}</h4>
                <p className="text-[10px] text-stone-400 font-bold uppercase">₹{p.pricePerKg}/kg • {p.availableQuantity}kg</p>
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
  const [loading, setLoading] = useState(false);

  // Strict Null Guard
  if (!user) return null;
  const activeUser: User = user;

  const handleSubmit = async () => {
    if (!selectedCrop || !selectedCategory) return;
    
    setLoading(true);
    
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      farmerId: activeUser.id,
      farmerName: activeUser.name || 'Farmer',
      name: selectedCrop.name,
      category: selectedCategory.id,
      pricePerKg: price,
      availableQuantity: qty,
      minOrderQuantity: 100,
      image: selectedCrop.image || AGRI_FALLBACK_IMAGE,
      location: activeUser.location || 'Farm',
      supplyFrequency: 'DAILY'
    };
    
    const { error } = await supabase.from('products').insert([newProduct]);
    if (!error) {
      await refreshData();
      onComplete();
    } else {
      alert("Platform Connectivity Error.");
    }
    setLoading(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-enter">
            <h2 className="text-4xl font-black text-[#1b4332] text-center italic">Product Category</h2>
            <div className="grid grid-cols-2 gap-6">
              {CROP_DATA.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat); setStep(2); }}
                  className="bg-white border-2 border-stone-100 p-10 rounded-[50px] shadow-sm flex flex-col items-center gap-6"
                >
                  <span className="text-7xl">{cat.icon}</span>
                  <span className="font-black text-xs text-stone-700 uppercase">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-enter">
            <button onClick={() => setStep(1)} className="p-4 bg-white rounded-2xl border border-stone-100 text-stone-400"><Icons.ChevronLeft /></button>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedCategory?.items.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => { setSelectedCrop(item); setStep(3); }}
                  className="bg-white border-2 border-stone-100 p-4 rounded-[32px] shadow-sm flex flex-col items-center gap-4"
                >
                  <img src={item.image} className="w-full h-24 object-cover rounded-2xl" alt={item.name} />
                  <span className="font-black text-[10px] text-stone-600 uppercase">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-10 animate-enter pb-12">
            <button onClick={() => setStep(2)} className="p-4 bg-white rounded-2xl border border-stone-100 text-stone-400"><Icons.ChevronLeft /></button>
            <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm space-y-6">
              <label className="text-[11px] font-black text-stone-400 uppercase tracking-[0.4em] block text-center">Available Stock (kg)</label>
              <div className="flex items-center justify-between">
                 <button onClick={() => setQty(Math.max(100, qty - 100))} className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center"><Icons.Minus /></button>
                 <span className="text-6xl font-black text-[#1b4332]">{qty}</span>
                 <button onClick={() => setQty(qty + 100)} className="w-16 h-16 bg-[#1b4332] text-white rounded-2xl flex items-center justify-center"><Icons.Plus /></button>
              </div>
            </div>
            <button 
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-[#1b4332] text-white py-8 rounded-[40px] font-black text-2xl"
            >
              {loading ? "PROCESSING..." : "CONFIRM LISTING"}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="pb-12">{renderStep()}</div>;
};
