// API Response types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
  timestamp?: string;
}

// API Error types
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  timestamp?: string;
}

// Pagination types
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

// Common API data types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  avatar?: string;
}

// Request configuration types
export interface RequestConfig {
  showLoader?: boolean;
  showErrorToast?: boolean;
  retries?: number;
  method?: HttpMethod;
  url?: string;
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  onUploadProgress?: (progressEvent: any) => void;
}

// Upload progress callback type
export type UploadProgressCallback = (progress: number) => void;

// Filter and search types
export interface SearchFilters {
  query?: string;
  category?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ListRequest extends SearchFilters {
  page?: number;
  limit?: number;
}

// Generic CRUD types
export interface CreateRequest {
  [key: string]: any;
}

export interface UpdateRequest extends CreateRequest {
  id: string;
}

// API method types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// Response wrapper for different data types
export type ApiDataResponse<T> = T extends any[] ? PaginatedResponse<T> : ApiResponse<T>;
