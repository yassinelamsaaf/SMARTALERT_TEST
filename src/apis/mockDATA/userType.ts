// User Types for SmartAlert Application

// Basic user information
export interface User {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  activated: boolean;
  langKey: string;
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  authorities: string[];
}

// User registration data
export interface UserRegistration {
  login: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  langKey: string;
}

// User account update data
export interface UserUpdateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  langKey?: string;
  imageUrl?: string;
}

// Authentication response
export interface AuthResponse {
  id_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
}

// Login request
export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
  expoToken?: string;
}

// Google OAuth request
export interface GoogleAuthRequest {
  token: string;
  expoToken: string | null;
  langKey: string;
}

// Facebook OAuth request
export interface FacebookAuthRequest {
  token: string;
  expoToken: string | null;
  langKey: string;
}

// JWT Token payload structure
export interface JWTPayload {
  sub?: string;
  login?: string;
  email?: string;
  iat?: number;
  exp?: number;
  authorities?: string[];
  [key: string]: any;
}

// User session state
export interface UserSession {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Social login user info (for Facebook/Google)
export interface SocialUserInfo {
  name?: string;
  email?: string;
  picture?: string;
  provider: 'google' | 'facebook';
}

// User preferences
export interface UserPreferences {
  language: string;
  theme?: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

// User statistics
export interface UserStats {
  totalAlerts: number;
  activeAlerts: number;
  totalAnnouncements: number;
  unreadAnnouncements: number;
  lastLoginDate: string;
  accountCreatedDate: string;
}

// Extended user profile with additional data
export interface UserProfile extends User {
  preferences: UserPreferences;
  stats: UserStats;
  socialAccounts?: {
    google?: string;
    facebook?: string;
  };
}

// Mock user data structure for testing
export interface MockUser extends User {
  password: string; // Only for mock data, never in real API responses
  socialLogin?: boolean;
  lastLogin?: string;
  preferences?: UserPreferences;
  stats?: UserStats;
}

// User roles and permissions
export type UserRole = 'ROLE_USER' | 'ROLE_ADMIN' | 'ROLE_MODERATOR';

export interface UserPermissions {
  canCreateAlerts: boolean;
  canDeleteAlerts: boolean;
  canModifyAlerts: boolean;
  canViewAllAlerts: boolean;
  canManageUsers: boolean;
  canAccessAdminPanel: boolean;
}

// Error types for authentication
export interface AuthError {
  message: string;
  code?: string;
  field?: string;
  timestamp?: string;
}

// API response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: AuthError;
}

// User verification status
export interface UserVerification {
  emailVerified: boolean;
  phoneVerified: boolean;
  identityVerified: boolean;
  verificationDate?: string;
}

// User activity log entry
export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, any>;
}

// Password reset request
export interface PasswordResetRequest {
  email: string;
}

// Password reset confirmation
export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}

// Account activation
export interface AccountActivation {
  key: string;
}

// Resend activation code
export interface ResendActivation {
  email: string;
} 