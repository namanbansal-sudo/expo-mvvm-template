# API Documentation

This API folder contains a comprehensive setup for handling HTTP requests using Axios in your React Native/Expo application.

## Installation

Make sure to install the required dependency:

```bash
npm install axios
```

## Structure

- `config.ts` - Axios configuration and interceptors
- `client.ts` - Main API client class with all HTTP methods
- `endpoints.ts` - Centralized endpoint definitions
- `types.ts` - TypeScript interfaces and types
- `helpers.ts` - Utility functions for API operations
- `index.ts` - Main export file

## Usage

### Basic Usage

```typescript
import { api, apiEndpoints } from '../api';

// Simple GET request
const users = await api.get(apiEndpoints.users.list);

// POST request with data
const loginResponse = await api.post(apiEndpoints.auth.login, {
  email: 'user@example.com',
  password: 'password'
});

// File upload with progress
const formData = new FormData();
formData.append('file', file);

const uploadResponse = await api.uploadFile(
  apiEndpoints.media.upload,
  formData,
  (progress) => console.log('Upload progress:', progress)
);
```

### Configuration

```typescript
import { api } from '../api';

// Set authentication token
api.setAuthToken('your-jwt-token');

// Set custom base URL
api.setBaseURL('https://custom-api.com');

// Set default configuration
api.setDefaultConfig({
  showLoader: false,
  retries: 3
});
```

### Error Handling

```typescript
import { api, handleApiError } from '../api';

try {
  const response = await api.get('/users');
  console.log(response.data);
} catch (error) {
  const apiError = handleApiError(error);
  console.log('Error:', apiError.message);
}
```

### Pagination

```typescript
import { api } from '../api';

const response = await api.getPaginated(apiEndpoints.users.list, {
  page: 1,
  limit: 10
});

console.log(response.meta); // Pagination metadata
console.log(response.data); // Array of users
```

### Custom Endpoints

```typescript
// Using predefined endpoints
const user = await api.get(apiEndpoints.users.detail('123'));

// Using custom endpoints
const customResponse = await api.get('/custom/endpoint');
```

## Available Methods

- `api.get()` - GET requests
- `api.post()` - POST requests
- `api.put()` - PUT requests
- `api.patch()` - PATCH requests
- `api.delete()` - DELETE requests
- `api.uploadFile()` - File uploads with progress tracking
- `api.getPaginated()` - Paginated GET requests

## Helper Functions

- `handleApiError()` - Consistent error handling
- `isSuccessResponse()` - Check if response is successful
- `createFormData()` - Create FormData for uploads
- `buildQueryString()` - Build query strings
- `isValidEmail()` - Email validation
- `isValidPhoneNumber()` - Phone number validation
- `formatFileSize()` - Format file sizes
- `retry()` - Retry failed requests
- `debounce()` - Debounce function for search

## Environment Configuration

Update the base URL in `config.ts`:

```typescript
const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api'
  : 'https://your-production-api.com/api';
```

## Authentication

The API client automatically includes authentication headers when set:

```typescript
api.setAuthToken('your-jwt-token');
```

## Interceptors

The configuration includes request and response interceptors for:
- Adding authentication tokens
- Request/response logging in development
- Error handling
- Retry logic

## TypeScript Support

All functions are fully typed with TypeScript. Import types as needed:

```typescript
import type {
  ApiResponse,
  ApiError,
  User,
  PaginationMeta
} from '../api';
```

## Backward Compatibility

The old `utils/api.ts` file now re-exports from this API folder, so existing imports will continue to work.
