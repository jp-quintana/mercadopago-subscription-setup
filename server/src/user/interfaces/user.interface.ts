export const enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PREMIUM = 'PREMIUM',
}

export interface UserSubscription {
  id: string;
  status: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  subscription: UserSubscription | null;
}
