import { Task } from "./task.interface";

export interface TaskFormProps {
  task?: Task | null;
  onClose: () => void;
}
