import AsyncStorage from '@react-native-async-storage/async-storage';

import type { User } from '@/types';

const TOKEN_STORAGE_KEY = 'schedule-app:auth-token';
const USER_STORAGE_KEY = 'schedule-app:user';

const mockUsers: Array<Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'role'>> = [
  { id: 'admin-1', email: 'admin@schedule.app', firstName: 'Admin', lastName: 'User', role: 'ADMIN' },
  { id: 'admin-2', email: 'demo@schedule.app', firstName: 'Demo', lastName: 'Account', role: 'ADMIN' },
];

const createUser = (email: string, password: string): User => {
  const match = mockUsers.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());

  if (match) {
    return {
      id: match.id,
      email: match.email,
      passwordHash: `mock:${password}`,
      firstName: match.firstName,
      lastName: match.lastName,
      role: match.role,
      isActive: true,
      failedLoginAttempts: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'system',
    };
  }

  return {
    id: `user-${Date.now()}`,
    email,
    passwordHash: `mock:${password}`,
    firstName: email.split('@')[0],
    lastName: 'User',
    role: 'ADMIN',
    isActive: true,
    failedLoginAttempts: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'system',
  };
};

export const authService = {
  async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = createUser(normalizedEmail, password);

    // if (!mockUsers.some((candidate) => candidate.email.toLowerCase() === normalizedEmail)) {
    //   throw new Error('Invalid email or password.');
    // }

    const token = `mock-token-${user.id}`;
    await AsyncStorage.multiSet([
      [TOKEN_STORAGE_KEY, token],
      [USER_STORAGE_KEY, JSON.stringify(user)],
    ]);

    return { token, user };
  },

  async getStoredToken() {
    return AsyncStorage.getItem(TOKEN_STORAGE_KEY);
  },

  async getProfile(): Promise<User | null> {
    const rawUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (!rawUser) {
      return null;
    }

    try {
      return JSON.parse(rawUser) as User;
    } catch {
      return null;
    }
  },

  async clearStoredToken() {
    await AsyncStorage.multiRemove([TOKEN_STORAGE_KEY, USER_STORAGE_KEY]);
  },

  async logout() {
    await this.clearStoredToken();
  },
};
