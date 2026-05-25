export interface StoreDeal {
  storeName: 'Steam' | 'Epic Games' | 'GOG' | 'Humble Bundle' | 'PlayStation Store' | 'Xbox Store';
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  historicalLow: number;
  buyUrl: string;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  isFree?: boolean;
}

export interface UserReview {
  id: string;
  avatarColor: string;
  username: string;
  rating: number; // 1-10
  text: string;
  helpfulVotes: number;
  date: string;
  isRecommended: boolean;
}

export interface Game {
  id: string;
  title: string;
  coverImage: string;
  heroImage: string;
  shortDescription: string;
  longDescription: string;
  genres: string[];
  platforms: ('PC' | 'PS5' | 'XSX' | 'Switch' | 'PS4' | 'Xbox One')[];
  rating: number; // 0-100% or 0-10 rating, let's use percent e.g. 96
  metacriticScore: number;
  userScore: number; // e.g. 9.2
  lowestPrice: number;
  originalPrice: number;
  discount: number; // percentage
  releaseDate: string;
  developer: string;
  publisher: string;
  engine: string;
  developmentTime: string;
  budget: string;
  gameplayDuration: string;
  multiplayerSupport: string;
  modSupport: string;
  drmInfo: string;
  optimizationScore: number;
  performanceRating: string;
  deals: StoreDeal[];
  priceHistory: PriceHistoryPoint[];
  reviews: UserReview[];
}
