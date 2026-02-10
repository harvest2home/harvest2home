
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, User, OrderStatus } from '../types';
import { Icons } from '../constants';
import { supabase } from '../supabase';

export const AdminDashboard: React.FC = () => {
  const { user, allUsers, orders, products, refreshData } = useApp();
  const [activeTab, setActiveTab] = useState<'pending' | 'users' | 'revenue'>('pending');

  // Strict null guard for admin portal
  if (!user || user.role !== UserRole.ADMIN) {
    return (
      <div className="p-20 text-center bg-white rounded-[50px] border border-stone-100 shadow-sm">
        <p className="text-stone-400 font-black uppercase text-xs tracking-[0.3em]">Restricted Access</p>
      </div>
    );
  }

  const pendingApprovals = allUsers.filter(u => !u.isApproved);
  const totalRevenue = orders.reduce((acc, o) => acc + o.commission, 0);

  const handleApprove = async (userId: string) => {
    const { error } = await supabase
      .from('users')
      .update({ isApproved: true, hasPaidFee: true })
      .eq('id', userId);
    
    if (!error) {
      await refreshData();
      alert("Registration Approved.");
    }
  };

  const handleReject = async (userId: string) => {
    if (confirm("Reject this registration?")) {
      const { error } = await supabase.from('users').delete().eq('id', userId);
      if (!error) await refreshData();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
         <div className="bg-red-100 p-2 rounded-xl text-red-600">
            <Icons.Shield />
         </div>
         <h2 className="text-2xl font-black text-stone-800 italic tracking-tight">System Control</h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-stone-100 text-center">
          <p className="text-[9px] uppercase font-black text-stone-400 tracking-widest mb-1">Fee Revenue</p>
          <p className="text-xl font-black text-green-700">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-stone-100 text-center">
          <p className="text-[9px] uppercase font-black text-stone-400 tracking-widest mb-1">Total Stakeholders</p>
          <p className="text-xl font-black text-stone-800">{allUsers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-stone-100 text-center">
          <p className="text-[9px] uppercase font-black text-stone-400 tracking-widest mb-1">Live Listings</p>
          <p className="text-xl font-black text-stone-800">{products.length}</p>
        </div>
      </div>

      <div className="flex bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
        <button onClick={() => setActiveTab('pending')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'pending' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400'}`}>Approvals ({pendingApprovals.length})</button>
        <button onClick={() => setActiveTab('users')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'users' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400'}`}>Directory</button>
        <button onClick={() => setActiveTab('revenue')} className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'revenue' ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-400'}`}>Revenue</button>
      </div>

      {activeTab === 'pending' && (
        <div className="space-y-4 animate-fade-in">
          {pendingApprovals.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-[40px] border border-stone-100 border-dashed">
               <p className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">Queue Clear</p>
            </div>
          ) : (
            pendingApprovals.map(u => (
              <div key={u.id} className="bg-white p-6 rounded-[32px] border border-stone-100 shadow-sm flex items-center justify-between">
                <div>
                  <h4 className="font-black text-stone-800">{u.name}</h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">{u.role} • {u.location}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleReject(u.id)} className="p-3 text-red-500 bg-red-50 rounded-2xl">
                    <Icons.Plus className="rotate-45" />
                  </button>
                  <button 
                    onClick={() => handleApprove(u.id)}
                    className="bg-[#1b4332] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest"
                  >
                    APPROVE
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-3 animate-fade-in">
          {allUsers.map(u => (
            <div key={u.id} className="bg-white p-4 rounded-2xl border border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${u.role === UserRole.FARMER ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                    {u.name.charAt(0)}
                 </div>
                 <div>
                    <h5 className="font-bold text-sm text-stone-800">{u.name}</h5>
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">{u.role} • {u.location}</p>
                 </div>
              </div>
              <span className={`text-[8px] font-black px-2 py-1 rounded-lg uppercase ${u.isApproved ? 'bg-green-500 text-white' : 'bg-stone-200 text-stone-500'}`}>
                 {u.isApproved ? 'ACTIVE' : 'LOCKED'}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'revenue' && (
        <div className="bg-white rounded-[40px] border border-stone-100 p-8 space-y-6 animate-fade-in">
           <h4 className="font-black text-stone-400 text-[10px] uppercase tracking-widest">Trade Settlements</h4>
           <div className="space-y-4">
              {orders.length === 0 ? (
                <p className="text-center py-4 text-stone-300">No data.</p>
              ) : (
                orders.map(o => (
                  <div key={o.id} className="flex justify-between items-center py-3 border-b border-stone-50 last:border-0">
                    <div>
                      <p className="text-sm font-bold text-stone-800">{o.productName}</p>
                      <p className="text-[10px] text-stone-400">{o.buyerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-green-700">+₹{o.commission}</p>
                    </div>
                  </div>
                ))
              )}
           </div>
        </div>
      )}
    </div>
  );
};
