import { Task } from "./task.interface";

export interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  type: "create" | "update";
  task?: Task;
}
