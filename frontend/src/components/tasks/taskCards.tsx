import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TaskCard from "./taskCard";
import { Task } from "../../interfaces/task.interface";
import { TaskCardsProps } from "../../interfaces/taskCardsProps";

export default function TaskCards({ onTaskClick, filters }: TaskCardsProps) {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  let filteredTasks = tasks
    .filter((task: Task) =>
      task.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
    )
    .filter((task: Task) =>
      filters.filterStatus
        ? task.completed === (filters.filterStatus === "completed")
        : true
    );

  if (filters.sortBy === "newest") {
    filteredTasks = filteredTasks.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (filters.sortBy === "oldest") {
    filteredTasks = filteredTasks.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 justify-items-center p-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task._id} task={task} onClick={onTaskClick} />
      ))}
    </div>
  );
}
