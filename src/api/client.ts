import apiClient from './config';
import {
  ApiResponse,
  ApiError,
  PaginatedResponse,
  RequestConfig,
  UploadProgressCallback,
  HttpMethod,
  ApiDataResponse,
} from './types';

class ApiClient {
  private defaultConfig: Partial<RequestConfig> = {
    showLoader: true,
    showErrorToast: true,
    retries: 0,
  };

  /**
   * Generic request method
   */
  private async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const requestConfig: RequestConfig = {
      ...this.defaultConfig,
      ...config,
      method,
      url: endpoint,
    };

    // Add data to request config based on method
    if (data) {
      if (method === 'GET') {
        requestConfig.params = data;
      } else {
        requestConfig.data = data;
      }
    }

    try {
      const response = await apiClient.request<ApiResponse<T>>(requestConfig);

      return {
        data: response.data.data,
        message: response.data.message,
        status: response.data.status,
        success: response.data.success,
        timestamp: response.data.timestamp,
      };
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * GET request
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, params, config);
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, config);
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, config);
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data, config);
  }

  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }

  /**
   * File upload with progress tracking
   */
  async uploadFile<T>(
    endpoint: string,
    file: FormData | File,
    onProgress?: UploadProgressCallback,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const uploadConfig: RequestConfig = {
      ...this.defaultConfig,
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          onProgress(progress);
        }
      },
    };

    // Convert File to FormData if needed
    let formData = file;
    if (file instanceof File && !(file instanceof FormData)) {
      const fd = new FormData();
      fd.append('file', file);
      formData = fd;
    }

    return this.request<T>('POST', endpoint, formData, uploadConfig);
  }

  /**
   * Paginated GET request
   */
  async getPaginated<T>(
    endpoint: string,
    params?: Record<string, any>,
    config?: RequestConfig
  ): Promise<PaginatedResponse<T>> {
    const response = await this.get<T[]>(endpoint, params, config);
    return response as PaginatedResponse<T>;
  }

  /**
   * Set default configuration
   */
  setDefaultConfig(config: Partial<RequestConfig>) {
    this.defaultConfig = { ...this.defaultConfig, ...config };
  }

  /**
   * Set authorization header
   */
  setAuthToken(token: string) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Remove authorization header
   */
  removeAuthToken() {
    delete apiClient.defaults.headers.common['Authorization'];
  }

  /**
   * Update base URL
   */
  setBaseURL(baseURL: string) {
    apiClient.defaults.baseURL = baseURL;
  }

  /**
   * Handle and transform errors
   */
  private handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        message: error.response.data?.message || 'An error occurred',
        status: error.response.status,
        errors: error.response.data?.errors,
        timestamp: error.response.data?.timestamp,
      };
    } else if (error.request) {
      // Network error
      return {
        message: 'Network error - please check your connection',
        status: 0,
      };
    } else {
      // Other error
      return {
        message: error.message || 'An unexpected error occurred',
        status: 0,
      };
    }
  }
}

// Create and export default instance
export const api = new ApiClient();
export default api;
