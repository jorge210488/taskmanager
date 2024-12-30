import { Task } from "./task.interface";

export interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}
