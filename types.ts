
export enum UserRole {
  FARMER = 'FARMER',
  BUYER = 'BUYER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED'
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  category: string;
  pricePerKg: number;
  availableQuantity: number;
  minOrderQuantity: number;
  image: string;
  location: string;
  supplyFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';
}

export interface Order {
  id: string;
  buyerId: string;
  farmerId: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  commission: number;
  payoutAmount: number;
  buyerName: string;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  role: UserRole;
  isApproved: boolean;
  location?: string;
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
  };
  hasPaidFee: boolean;
  registeredAt?: string;
}
