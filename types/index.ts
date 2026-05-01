export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: UserDto;
}

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  role: string;
  plan: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface WaitlistRequest {
  email: string;
  company?: string;
  role?: string;
  plan?: string;
}

export interface WaitlistResponse {
  position: number;
  message: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readTimeMinutes: number;
  imageUrl?: string;
  tags: string[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  role: string;
  createdAt: string;
  subscriptionPlan: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
}

export interface SubscriptionInfo {
  plan: string;
  status: string;
  startDate: string;
  nextBillingDate: string;
  price: number;
  features: string[];
}

export interface PlanDto {
  name: string;
  price: number;
  annualPrice: number;
  features: string[];
  isPopular: boolean;
  cta: string;
}

export interface Visual {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  downloadUrl?: string;
  isPremium: boolean;
  requiredPlan: string;
  tags: string[];
}

export interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  details?: string[];
  longDescription?: string[];
}

export interface PricingTier {
  name: string;
  price: number;
  annualPrice: number;
  description: string;
  features: string[];
  isPopular: boolean;
  cta: string;
}
