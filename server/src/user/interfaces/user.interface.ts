export const enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  PREMIUM = 'PREMIUM',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
}
