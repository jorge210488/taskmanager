import { useState } from "react";

interface TaskControlsProps {
  onAddTask: () => void;
  onFilterChange: (filters: {
    searchQuery: string;
    filterStatus: string;
  }) => void;
}

export default function TaskControls({
  onAddTask,
  onFilterChange,
}: TaskControlsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onFilterChange({ searchQuery: query, filterStatus });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setFilterStatus(status);
    onFilterChange({ searchQuery, filterStatus: status });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
      {/* Crear Tarea */}
      <button
        onClick={onAddTask}
        className="bg-[#9575CD] text-white font-bold hover:bg-gray-600 rounded-lg px-4 py-2"
      >
        Crear Tarea
      </button>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Busca tu tarea..."
        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/3"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Filtro */}
      <select
        className="border border-gray-300 rounded-lg px-4 py-2"
        value={filterStatus}
        onChange={handleFilterChange}
      >
        <option value="">Todos</option>
        <option value="completed">Completadas</option>
        <option value="pending">Pendientes</option>
      </select>
    </div>
  );
}
