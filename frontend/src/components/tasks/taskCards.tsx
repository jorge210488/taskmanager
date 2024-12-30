import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TaskCard from "./taskCard";
import { Task } from "../../interfaces/task.interface";

interface TaskCardsProps {
  onTaskClick: (task: Task) => void;
  filters: { searchQuery: string; filterStatus: string };
}

export default function TaskCards({ onTaskClick, filters }: TaskCardsProps) {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = tasks
    .filter((task: Task) =>
      task.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    )
    .filter((task: Task) =>
      filters.filterStatus
        ? task.completed === (filters.filterStatus === "completed")
        : true
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 justify-items-center p-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task._id} task={task} onClick={onTaskClick} />
      ))}
    </div>
  );
}
