import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Environment configuration
const isDevelopment = process.env.NODE_ENV === 'development' || true; // Fallback to true for React Native
const API_BASE_URL = isDevelopment
  ? 'http://localhost:3000/api' // Development API URL
  : 'https://api.yourapp.com/api'; // Production API URL

// Request timeout in milliseconds
const REQUEST_TIMEOUT = 30000;

// Default headers
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: DEFAULT_HEADERS,
});

// Request interceptor for adding authentication token
apiClient.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    // const token = getAuthToken(); // Implement this based on your auth system
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // Log requests in development
    if (isDevelopment) {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        headers: config.headers,
      });
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling common responses
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log responses in development
    if (isDevelopment) {
      console.log('API Response:', {
        status: response.status,
        data: response.data,
        url: response.config.url,
      });
    }

    return response;
  },
  (error) => {
    // Handle common error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (isDevelopment) {
        console.error('API Error Response:', {
          status,
          data,
          url: error.config?.url,
        });
      }

      // Handle specific error codes
      switch (status) {
        case 401:
          // Unauthorized - redirect to login or refresh token
          // handleUnauthorized();
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Internal server error');
          break;
        default:
          console.error('API error:', status, data);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.message);
    } else {
      // Other error
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL, REQUEST_TIMEOUT };
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse };
