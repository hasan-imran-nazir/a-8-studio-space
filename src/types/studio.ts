export interface Studio {
  id: string;
  title: string;
  location: string;
  price: number;
  category: string;
  sqft: number;
  rating: number;
  image: string;
  instantBook?: boolean;
  naturalLight?: boolean;
  hourlyRate?: number
  maxCapacity?: string | number;
  securityDeposit?: number;
}
