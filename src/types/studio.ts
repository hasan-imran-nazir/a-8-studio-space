export interface Studio {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  location: string;
  hourlyRate?: number | string;
  price?: number;
  securityDeposit?: number;
  maxCapacity?: string | number;
  imageUrl?: string;
  image?: string;
  amenities?: string[];
  overview?: string;
  hostName?: string;
  hostEmail?: string;
  instantBook?: boolean;
  naturalLight?: boolean;
  sqft?: number;
  rating?: number;
  reviews?: number;
}
