// Main API exports
export { default as apiClient } from './config';
export { default as api } from './client';
export { apiEndpoints, getEndpoint, buildUrl } from './endpoints';
export { apiHelpers } from './helpers';

// Type exports
export type {
  ApiResponse,
  ApiError,
  PaginationMeta,
  PaginatedResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  UpdateProfileRequest,
  RequestConfig,
  UploadProgressCallback,
  SearchFilters,
  ListRequest,
  CreateRequest,
  UpdateRequest,
  HttpMethod,
  ApiDataResponse,
} from './types';

// Helper function exports
export {
  handleApiError,
  isSuccessResponse,
  createFormData,
  createPaginationParams,
  calculatePaginationMeta,
  buildQueryString,
  parsePaginationFromHeaders,
  retry,
  debounce,
  formatResponse,
  isMobile,
  getDeviceInfo,
  isValidEmail,
  isValidPhoneNumber,
  formatFileSize,
  generateTempId,
  deepClone,
} from './helpers';
