import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TaskCard from "./taskCard";

export default function TaskCards() {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-2 justify-items-center p-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
