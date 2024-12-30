export interface AuthState {
  name: string | null;
  email: string | null;
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
}
