export interface HomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  type?: "signup" | "signin";
}
