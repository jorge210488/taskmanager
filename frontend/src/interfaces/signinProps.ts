export interface SignInProps {
  onLogin?: (userData: { name: string; email: string; token: string }) => void;
}
