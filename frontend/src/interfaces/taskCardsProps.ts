import { Task } from "./task.interface";

export interface TaskCardsProps {
  onTaskClick: (task: Task) => void;
  filters: { searchQuery: string; filterStatus: string; sortBy: string };
}
