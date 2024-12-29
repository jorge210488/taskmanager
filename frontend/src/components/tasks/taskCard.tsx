import { Task } from "../../interfaces/task.interface";
import taskImage from "../../assets/task.png";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center bg-white shadow-lg rounded-lg p-4 w-full max-w-sm md:max-w-md">
      {/* Imagen e indicador */}
      <div className="flex-shrink-0 flex flex-col items-center gap-2">
        <img
          src={taskImage}
          alt="Task"
          className="w-24 h-24 object-cover rounded-full"
        />
        <span
          className={`text-sm font-semibold ${
            task.completed ? "text-green-600" : "text-red-600"
          }`}
        >
          {task.completed ? "Completado" : "Pendiente"}
        </span>
      </div>

      {/* Información de la tarea */}
      <div className="flex-grow ml-4 md:ml-6">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {task.description || "Sin descripción"}
        </p>
        <p className="text-xs text-gray-500">
          Creado: {new Date(task.createdAt).toLocaleString()}
        </p>
        <p className="text-xs text-gray-500">
          Actualizado: {new Date(task.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
