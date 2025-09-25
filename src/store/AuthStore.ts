import { User, AuthState, LoginCredentials } from '../types/auth';
import { Storage } from '../utils/storage';

const AUTH_USER_KEY = 'auth_user';

export class AuthStore {
  private static instance: AuthStore;
  private authState: AuthState = {
    user: null,
    isLoading: true,
    isAuthenticated: false,
  };

  private listeners: Array<(state: AuthState) => void> = [];

  private constructor() {
    this.initializeAuthState();
  }

  static getInstance(): AuthStore {
    if (!AuthStore.instance) {
      AuthStore.instance = new AuthStore();
    }
    return AuthStore.instance;
  }

  private async initializeAuthState() {
    try {
      const storedUser = await Storage.getItem<User>(AUTH_USER_KEY);
      if (storedUser) {
        this.authState = {
          user: storedUser,
          isLoading: false,
          isAuthenticated: true,
        };
      } else {
        this.authState = {
          user: null,
          isLoading: false,
          isAuthenticated: false,
        };
      }
    } catch (error) {
      console.error('Error initializing auth state:', error);
      this.authState = {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    }
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): AuthState {
    return this.authState;
  }

  async login(credentials: LoginCredentials): Promise<User> {
    this.authState = {
      ...this.authState,
      isLoading: true,
    };
    this.notifyListeners();

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
      };

      await Storage.setItem(AUTH_USER_KEY, user);

      this.authState = {
        user,
        isLoading: false,
        isAuthenticated: true,
      };

      this.notifyListeners();
      return user;
    } catch (error) {
      this.authState = {
        ...this.authState,
        isLoading: false,
      };
      this.notifyListeners();
      throw error;
    }
  }

  async logout(): Promise<void> {
    this.authState = {
      ...this.authState,
      isLoading: true,
    };
    this.notifyListeners();

    try {
      await Storage.removeItem(AUTH_USER_KEY);

      this.authState = {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };

      this.notifyListeners();
    } catch (error) {
      this.authState = {
        ...this.authState,
        isLoading: false,
      };
      this.notifyListeners();
      throw error;
    }
  }

  async updateUser(updates: Partial<User>): Promise<User> {
    if (!this.authState.user) {
      throw new Error('No user logged in');
    }

    const updatedUser = { ...this.authState.user, ...updates };
    await Storage.setItem(AUTH_USER_KEY, updatedUser);

    this.authState = {
      ...this.authState,
      user: updatedUser,
    };

    this.notifyListeners();
    return updatedUser;
  }
}
