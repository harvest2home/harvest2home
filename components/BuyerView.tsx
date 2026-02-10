
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icons, CATEGORIES, PLATFORM_COMMISSION, AGRI_FALLBACK_IMAGE } from '../constants';
import { Product, OrderStatus, User } from '../types';
import { supabase } from '../supabase';

export const MarketBrowser: React.FC = () => {
  const { products, refreshData, user } = useApp();
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filtered = products.filter(p => 
    (selectedCat === 'all' || p.category === selectedCat) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || 
     p.location.toLowerCase().includes(search.toLowerCase()))
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleBuy = async (p: Product) => {
    if (!user) {
      alert("Please log in to participate in the exchange.");
      return;
    }

    // Shadow user locally for CI compiler safety
    const activeBuyer: User = user;

    const qty = p.minOrderQuantity;
    const baseTotal = qty * p.pricePerKg;
    const commission = baseTotal * PLATFORM_COMMISSION;
    const grandTotal = baseTotal + commission;

    if (confirm(`WHOLESALE ORDER CONFIRMATION\n-------------------------\nCommodity: ${p.name}\nQuantity: ${qty}kg\nRate: ₹${p.pricePerKg}/kg\n-------------------------\nEscrow Total: ₹${grandTotal.toLocaleString()}\n\nProceed to Secure Escrow?`)) {
      
      const newOrderId = Math.random().toString(36).substr(2, 9);
      
      const { error } = await supabase.from('orders').insert([{
        id: newOrderId,
        buyerId: activeBuyer.id,
        buyerName: activeBuyer.name,
        farmerId: p.farmerId,
        productId: p.id,
        productName: p.name,
        quantity: qty,
        totalPrice: grandTotal,
        status: OrderStatus.PAID,
        createdAt: new Date().toISOString(),
        commission: commission,
        payoutAmount: baseTotal
      }]);

      if (!error) {
        await supabase.from('products')
          .update({ availableQuantity: p.availableQuantity - qty })
          .eq('id', p.id);
          
        await refreshData();
        alert("Escrow Activated! Logistics notified.");
      } else {
        alert("Connectivity Error. Order not placed.");
      }
    }
  };

  return (
    <div className="space-y-8 animate-enter">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-[40px] shadow-sm border border-stone-100 space-y-6 sticky top-[80px] z-30">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Icons.Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-[#1b4332] transition-colors w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by crop name or source location..."
              className="w-full pl-16 pr-6 py-4 bg-stone-50 border-2 border-transparent rounded-[24px] focus:outline-none focus:border-[#1b4332] focus:bg-white text-sm font-bold transition-all"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button 
              onClick={handleRefresh}
              className={`px-6 py-4 rounded-[20px] transition-all flex items-center justify-center ${
                isRefreshing ? 'bg-orange-100 text-[#ff9f1c] animate-spin' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'
              }`}
            >
              <Icons.Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSelectedCat('all')}
              className={`px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                selectedCat === 'all' ? 'bg-[#1b4332] text-white shadow-xl' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'
              }`}
            >
              Exchange Hub
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-3 ${
                  selectedCat === cat.id ? 'bg-[#1b4332] text-white shadow-xl' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full py-32 text-center bg-white rounded-[50px] border-2 border-dashed border-stone-100">
             <p className="text-stone-300 font-black uppercase text-xs tracking-[0.3em]">No matching lots found</p>
          </div>
        ) : (
          filtered.map(p => (
            <div key={p.id} className="bg-white rounded-[32px] border border-stone-100 shadow-sm overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={p.image || AGRI_FALLBACK_IMAGE} 
                  className="h-full w-full object-cover" 
                  alt={p.name}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1b4332]/80 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest">
                    {p.supplyFrequency}
                  </span>
                </div>
                <div className="absolute bottom-4 left-6">
                   <p className="text-white font-black text-2xl tracking-tighter">₹{p.pricePerKg}<span className="text-[10px] opacity-70">/kg</span></p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h4 className="font-black text-lg text-stone-800 tracking-tight leading-tight">{p.name}</h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase truncate">{p.location}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-stone-50">
                  <button 
                    onClick={() => handleBuy(p)}
                    className="w-full bg-[#1b4332] text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2"
                  >
                    ACQUIRE LOT
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export const BuyerOrders: React.FC = () => {
  const { orders, user } = useApp();
  const myOrders = user ? orders.filter(o => o.buyerId === user.id) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-black text-stone-800 tracking-tighter italic">Acquisition Ledger</h2>
      {myOrders.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-stone-100 p-20 rounded-[50px] text-center">
          <p className="text-stone-300 font-black uppercase text-[10px] tracking-[0.4em]">Exchange Idle</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {myOrders.map(o => (
            <div key={o.id} className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[#fcfbf9] rounded-2xl flex items-center justify-center text-3xl">🌾</div>
                <div>
                  <h4 className="font-black text-xl text-stone-800 italic">{o.productName}</h4>
                  <p className="text-[11px] text-stone-400 font-black uppercase tracking-widest mt-1">
                    {o.quantity}kg • ₹{o.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <span className={`text-[9px] px-5 py-2 rounded-full font-black uppercase tracking-widest ${o.status === OrderStatus.PAID ? 'bg-green-500 text-white' : 'bg-stone-100 text-stone-500'}`}>
                {o.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
