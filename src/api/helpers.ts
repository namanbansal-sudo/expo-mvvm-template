import { ApiResponse, ApiError, PaginationMeta } from './types';

// API Helper Functions
// Utility functions for common API operations and data manipulation

/**
 * API Helper Functions
 * Utility functions for common API operations and data manipulation
 */

export const apiHelpers = {
  /**
   * Handle API errors consistently
   */
  handleApiError: (error: any): ApiError => {
    if (error.response) {
      return {
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        errors: error.response.data?.errors,
        timestamp: error.response.data?.timestamp,
      };
    }

    if (error.request) {
      return {
        message: 'Network error - please check your connection',
        status: 0,
      };
    }

    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
    };
  },

  /**
   * Check if API response is successful
   */
  isSuccessResponse: <T>(response: ApiResponse<T>): boolean => {
    return response.success && response.status >= 200 && response.status < 300;
  },

  /**
   * Create FormData for file uploads
   */
  createFormData: (data: Record<string, any>): FormData => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item instanceof File) {
              formData.append(`${key}[${index}]`, item);
            } else {
              formData.append(`${key}[${index}]`, String(item));
            }
          });
        } else {
          formData.append(key, String(value));
        }
      }
    });

    return formData;
  },

  /**
   * Create pagination parameters
   */
  createPaginationParams: (page: number = 1, limit: number = 10) => {
    return {
      page: Math.max(1, page),
      limit: Math.min(100, Math.max(1, limit)),
    };
  },

  /**
   * Calculate pagination metadata
   */
  calculatePaginationMeta: (
    currentPage: number,
    totalItems: number,
    itemsPerPage: number
  ): PaginationMeta => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  },

  /**
   * Build query string from parameters
   */
  buildQueryString: (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((item) => searchParams.append(key, String(item)));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    return searchParams.toString();
  },

  /**
   * Parse API response headers for pagination
   */
  parsePaginationFromHeaders: (headers: any): Partial<PaginationMeta> => {
    const meta: Partial<PaginationMeta> = {};

    if (headers['x-current-page']) {
      meta.currentPage = parseInt(headers['x-current-page'], 10);
    }
    if (headers['x-total-pages']) {
      meta.totalPages = parseInt(headers['x-total-pages'], 10);
    }
    if (headers['x-total-count']) {
      meta.totalItems = parseInt(headers['x-total-count'], 10);
    }
    if (headers['x-per-page']) {
      meta.itemsPerPage = parseInt(headers['x-per-page'], 10);
    }

    return meta;
  },

  /**
   * Retry function for failed requests
   */
  retry: async <T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    let lastError: any;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;

        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)));
        }
      }
    }

    throw lastError;
  },

  /**
   * Debounce function for search requests
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  /**
   * Format API response for consistent data structure
   */
  formatResponse: <T>(data: T, message?: string): ApiResponse<T> => {
    return {
      data,
      message: message || 'Success',
      status: 200,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Check if running on mobile device
   */
  isMobile: (): boolean => {
    // Check if running in React Native environment
    return typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  /**
   * Get device type for API requests
   */
  getDeviceInfo: () => {
    const isMobile = apiHelpers.isMobile();
    return {
      platform: isMobile ? 'mobile' : 'web',
      version: '1.0.0',
      isMobile,
    };
  },

  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number format
   */
  isValidPhoneNumber: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Format file size for display
   */
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  /**
   * Generate random ID for temporary operations
   */
  generateTempId: (): string => {
    return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Deep clone object
   */
  deepClone: <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime()) as T;
    if (Array.isArray(obj)) return obj.map(item => apiHelpers.deepClone(item)) as T;

    const cloned = {} as T;
    Object.keys(obj).forEach(key => {
      (cloned as any)[key] = apiHelpers.deepClone((obj as any)[key]);
    });

    return cloned;
  },
};

// Export individual functions for convenience
export const {
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
} = apiHelpers;
