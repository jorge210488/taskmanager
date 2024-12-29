import TaskOverview from "./taskOverview";
import TaskControls from "./taskControl";

export default function TasksPage() {
  const handleAddTask = () => {
    console.log("Abrir modal para crear tarea");
    // Aquí puedes manejar la lógica para abrir un modal o formulario para crear tareas
  };

  return (
    <div className="min-h-screen flex flex-col overflow-auto mt-4 mb-8">
      {/* Headline */}
      <div className="w-full text-center text-white px-4 md:px-8 mt-8 sm:mt-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-md">
          Aquí puedes ver todas tus{" "}
          <span className="text-yellow-300">tareas</span> y{" "}
          <span className="text-yellow-300">estadísticas</span>
        </h1>
        <p className="mt-2 md:mt-4 text-base md:text-lg font-light">
          Organiza y gestiona tus pendientes fácilmente con TaskManager.
        </p>
      </div>

      {/* Task Overview y Controls juntos en el mismo flujo */}
      <div className="flex flex-col gap-6 px-6">
        <TaskOverview />
        <div className="mx-auto w-full lg:w-1/2">
          <TaskControls onAddTask={handleAddTask} />
        </div>
      </div>
    </div>
  );
}
