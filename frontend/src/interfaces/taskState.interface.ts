import { Task } from "../interfaces/task.interface";

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}
