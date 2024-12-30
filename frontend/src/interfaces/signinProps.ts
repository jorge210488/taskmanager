export interface SignInProps {
  onLogin?: (userData: {
    name: string;
    email: string;
    token: string;
    userId: string;
  }) => void;
}
