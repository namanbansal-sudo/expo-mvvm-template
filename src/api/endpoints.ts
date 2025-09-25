/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for better maintainability
 */

export const apiEndpoints = {
  // Authentication endpoints
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
    verifyEmail: '/auth/verify-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    changePassword: '/auth/change-password',
  },

  // User management endpoints
  users: {
    list: '/users',
    detail: (id: string) => `/users/${id}`,
    create: '/users',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    avatar: (id: string) => `/users/${id}/avatar`,
    bulkDelete: '/users/bulk-delete',
    export: '/users/export',
  },

  // Posts/Blog endpoints
  posts: {
    list: '/posts',
    detail: (id: string) => `/posts/${id}`,
    create: '/posts',
    update: (id: string) => `/posts/${id}`,
    delete: (id: string) => `/posts/${id}`,
    publish: (id: string) => `/posts/${id}/publish`,
    unpublish: (id: string) => `/posts/${id}/unpublish`,
    categories: '/posts/categories',
    tags: '/posts/tags',
    featured: '/posts/featured',
    search: '/posts/search',
  },

  // Categories endpoints
  categories: {
    list: '/categories',
    detail: (id: string) => `/categories/${id}`,
    create: '/categories',
    update: (id: string) => `/categories/${id}`,
    delete: (id: string) => `/categories/${id}`,
    subcategories: (id: string) => `/categories/${id}/subcategories`,
  },

  // Comments endpoints
  comments: {
    list: '/comments',
    detail: (id: string) => `/comments/${id}`,
    create: '/comments',
    update: (id: string) => `/comments/${id}`,
    delete: (id: string) => `/comments/${id}`,
    approve: (id: string) => `/comments/${id}/approve`,
    reject: (id: string) => `/comments/${id}/reject`,
    replies: (id: string) => `/comments/${id}/replies`,
  },

  // Media/Files endpoints
  media: {
    list: '/media',
    upload: '/media/upload',
    detail: (id: string) => `/media/${id}`,
    delete: (id: string) => `/media/${id}`,
    bulkDelete: '/media/bulk-delete',
    optimize: (id: string) => `/media/${id}/optimize`,
  },

  // Settings/Configuration endpoints
  settings: {
    general: '/settings/general',
    update: '/settings',
    backup: '/settings/backup',
    restore: '/settings/restore',
    clearCache: '/settings/clear-cache',
  },

  // Analytics endpoints
  analytics: {
    overview: '/analytics/overview',
    users: '/analytics/users',
    posts: '/analytics/posts',
    traffic: '/analytics/traffic',
    revenue: '/analytics/revenue',
  },

  // Notifications endpoints
  notifications: {
    list: '/notifications',
    markAsRead: (id: string) => `/notifications/${id}/read`,
    markAllAsRead: '/notifications/mark-all-read',
    delete: (id: string) => `/notifications/${id}`,
    settings: '/notifications/settings',
  },

  // Search endpoints
  search: {
    global: '/search',
    users: '/search/users',
    posts: '/search/posts',
    media: '/search/media',
  },

  // Dashboard endpoints
  dashboard: {
    stats: '/dashboard/stats',
    recentActivity: '/dashboard/recent-activity',
    quickActions: '/dashboard/quick-actions',
  },

  // Utility endpoints
  utils: {
    health: '/health',
    version: '/version',
    ping: '/ping',
    uploadToken: '/utils/upload-token',
  },
} as const;

// Helper function to build URLs with parameters
export const buildUrl = (template: string, params: Record<string, string | number>): string => {
  let url = template;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, String(value));
  });
  return url;
};

// Helper function to get endpoint with parameters
export const getEndpoint = {
  users: {
    detail: (id: string) => buildUrl(apiEndpoints.users.detail(id), { id }),
    update: (id: string) => buildUrl(apiEndpoints.users.update(id), { id }),
    delete: (id: string) => buildUrl(apiEndpoints.users.delete(id), { id }),
    avatar: (id: string) => buildUrl(apiEndpoints.users.avatar(id), { id }),
  },
  posts: {
    detail: (id: string) => buildUrl(apiEndpoints.posts.detail(id), { id }),
    update: (id: string) => buildUrl(apiEndpoints.posts.update(id), { id }),
    delete: (id: string) => buildUrl(apiEndpoints.posts.delete(id), { id }),
    publish: (id: string) => buildUrl(apiEndpoints.posts.publish(id), { id }),
    unpublish: (id: string) => buildUrl(apiEndpoints.posts.unpublish(id), { id }),
  },
  categories: {
    detail: (id: string) => buildUrl(apiEndpoints.categories.detail(id), { id }),
    update: (id: string) => buildUrl(apiEndpoints.categories.update(id), { id }),
    delete: (id: string) => buildUrl(apiEndpoints.categories.delete(id), { id }),
    subcategories: (id: string) => buildUrl(apiEndpoints.categories.subcategories(id), { id }),
  },
  comments: {
    detail: (id: string) => buildUrl(apiEndpoints.comments.detail(id), { id }),
    update: (id: string) => buildUrl(apiEndpoints.comments.update(id), { id }),
    delete: (id: string) => buildUrl(apiEndpoints.comments.delete(id), { id }),
    approve: (id: string) => buildUrl(apiEndpoints.comments.approve(id), { id }),
    reject: (id: string) => buildUrl(apiEndpoints.comments.reject(id), { id }),
    replies: (id: string) => buildUrl(apiEndpoints.comments.replies(id), { id }),
  },
  media: {
    detail: (id: string) => buildUrl(apiEndpoints.media.detail(id), { id }),
    delete: (id: string) => buildUrl(apiEndpoints.media.delete(id), { id }),
    optimize: (id: string) => buildUrl(apiEndpoints.media.optimize(id), { id }),
  },
  notifications: {
    markAsRead: (id: string) => buildUrl(apiEndpoints.notifications.markAsRead(id), { id }),
    delete: (id: string) => buildUrl(apiEndpoints.notifications.delete(id), { id }),
  },
} as const;
