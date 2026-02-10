
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Product, Order, OrderStatus } from '../types';
import { supabase } from '../supabase';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
  logout: () => void;
  login: (phone: string, role: UserRole, details?: { name: string, location: string }) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const refreshData = async () => {
    try {
      const { data: usersData } = await supabase.from('users').select('*').order('registeredAt', { ascending: false });
      if (usersData) setAllUsers(usersData);

      const { data: productsData } = await supabase.from('products').select('*');
      if (productsData) setProducts(productsData);

      const { data: ordersData } = await supabase.from('orders').select('*').order('createdAt', { ascending: false });
      if (ordersData) setOrders(ordersData);

      // Refresh current user session data
      if (user) {
        const { data: updatedUser } = await supabase.from('users').select('*').eq('id', user.id).single();
        if (updatedUser) {
          setUser(updatedUser);
          localStorage.setItem('h2h_user_session', JSON.stringify(updatedUser));
        }
      }
    } catch (e) {
      console.error("Data Refresh Error:", e);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('h2h_user_session');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    refreshData();

    // High-performance real-time subscription
    const channel = supabase.channel('h2h-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, refreshData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, refreshData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, refreshData)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const login = async (phone: string, role: UserRole, details?: { name: string, location: string }) => {
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone)
      .single();

    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('h2h_user_session', JSON.stringify(existingUser));
    } else {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        phone,
        name: details?.name || 'New User',
        location: details?.location || 'Unknown',
        role,
        isApproved: role === UserRole.ADMIN,
        hasPaidFee: role === UserRole.ADMIN,
        registeredAt: new Date().toISOString()
      };
      
      const { error } = await supabase.from('users').insert([newUser]);
      if (!error) {
        setUser(newUser);
        localStorage.setItem('h2h_user_session', JSON.stringify(newUser));
        refreshData();
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('h2h_user_session');
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, products, setProducts, orders, setOrders, allUsers, setAllUsers, logout, login, refreshData 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
