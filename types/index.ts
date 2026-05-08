// ─── Generic wrappers ───────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Auth ───────────────────────────────────────────────────
export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
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
  subscriptionTier: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ─── Waitlist ───────────────────────────────────────────────
export interface WaitlistRequest {
  email: string;
  company?: string;
  role?: string;
  plan?: string;
}

export interface WaitlistResponse {
  position: number;
  totalCount: number;
  message: string;
}

// ─── Blog ───────────────────────────────────────────────────
export interface BlogPostDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readTimeMinutes: number;
  thumbnailUrl?: string;
  tags: string[];
}

export type BlogPost = BlogPostDto;

// ─── Contact ────────────────────────────────────────────────
export interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

// ─── Subscriptions & Billing ────────────────────────────────
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

export interface PricingTier {
  name: string;
  price: number;
  annualPrice: number;
  description: string;
  features: string[];
  isPopular: boolean;
  cta: string;
}

// ─── Visuals ────────────────────────────────────────────────
export interface Visual {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  downloadUrl?: string;
  requiredPlan: string;
  downloadCount: number;
  tags: string[];
}

export interface VisualDetailDto extends Visual {
  fullDescription: string;
  previewImageUrls: string[];
  technicalSpecs: string;
  dataRequirements: string;
}

// ─── Marketing page types ───────────────────────────────────
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

// ─── Platform modules ───────────────────────────────────────
export interface PlatformModule {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  requiredPlan: string;
}
