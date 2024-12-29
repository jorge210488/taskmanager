import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface TaskControlsProps {
  onAddTask: () => void; //
}

export default function TaskControls({ onAddTask }: TaskControlsProps) {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<
    "" | "completed" | "pending"
  >("");
  const [sortOrder, setSortOrder] = useState<"recent" | "oldest">("recent");

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((task) =>
        filterStatus ? task.completed === (filterStatus === "completed") : true
      )
      .sort((a, b) =>
        sortOrder === "recent"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }, [tasks, searchQuery, filterStatus, sortOrder]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
      {/* Crear Tarea */}
      <button
        onClick={onAddTask}
        className="bg-[#9575CD] text-white rounded-lg px-4 py-2"
      >
        Crear Tarea
      </button>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Busca tu tarea..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Filtro */}
      <select
        className="border border-gray-300 rounded-lg px-4 py-2"
        value={filterStatus}
        onChange={(e) =>
          setFilterStatus(e.target.value as "" | "completed" | "pending")
        }
      >
        <option value="">Todos</option>
        <option value="completed">Completadas</option>
        <option value="pending">Pendientes</option>
      </select>

      {/* Orden */}
      <select
        className="border border-gray-300 rounded-lg px-4 py-2"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "recent" | "oldest")}
      >
        <option value="recent">Más recientes</option>
        <option value="oldest">Más antiguas</option>
      </select>
    </div>
  );
}
