import { useState } from "react";
import TaskOverview from "./taskOverview";
import TaskControls from "./taskControl";
import TaskModal from "./taskModal";
import TaskForm from "./taskForm";
import TaskCards from "./taskCards";
import { Task } from "../../interfaces/task.interface";

export default function TasksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({
    searchQuery: "",
    filterStatus: "",
    sortBy: "",
  });

  const handleAddTask = () => {
    // console.log("Abrir modal para crear tarea");
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFilterChange = (newFilters: {
    searchQuery: string;
    filterStatus: string;
    sortBy: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-auto mt-4 mb-10 sm:mr-10">
      {/* Headline */}
      <div className="w-full text-center text-white px-4 md:px-8 pb-0 sm:pb-6 mt-8 sm:mt-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-md">
          Aquí puedes ver todas tus{" "}
          <span className="text-yellow-300">tareas</span> y{" "}
          <span className="text-yellow-300">estadísticas</span>
        </h1>
        <p className="mt-2 md:mt-4 text-base md:text-lg font-light">
          Organiza y gestiona tus pendientes fácilmente con TaskManager.
        </p>
      </div>

      {/* Task Overview y Controls */}
      <div className="flex flex-col gap-6 px-6">
        <TaskOverview />
        <div className="mx-auto w-full lg:w-1/2">
          <TaskControls
            onAddTask={handleAddTask}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="w-full">
          <TaskCards filters={filters} onTaskClick={handleTaskClick} />
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        type={selectedTask ? "update" : "create"}
      >
        <TaskForm task={selectedTask} onClose={handleCloseModal} />
      </TaskModal>
    </div>
  );
}
