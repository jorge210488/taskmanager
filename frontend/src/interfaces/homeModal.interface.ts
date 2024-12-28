export interface HomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animation?: React.ReactNode;
}
