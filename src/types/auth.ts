export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string | null;
  lastLogin: string;
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}
