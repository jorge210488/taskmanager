import { useState } from "react";
import { TaskControlsProps } from "../../interfaces/taskControlProps.interface";

export default function TaskControls({
  onAddTask,
  onFilterChange,
}: TaskControlsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onFilterChange({ searchQuery: query, filterStatus, sortBy });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    setFilterStatus(status);
    onFilterChange({ searchQuery, filterStatus: status, sortBy });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    setSortBy(sort);
    onFilterChange({ searchQuery, filterStatus, sortBy: sort });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
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

      {/* Filtros */}
      <div className="flex flex-row items-center gap-1 w-full sm:w-auto">
        {/* Filtro por Estado */}
        <select
          className="border border-transparent rounded-lg px-3 py-2 bg-gradient-to-r from-blue-600 via-purple-700 to-blue-800 font-semibold shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterStatus}
          onChange={handleFilterChange}
        >
          <option value="">Todos</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>

        {/* Filtro por Orden */}
        <select
          className="border border-transparent rounded-lg px-3 py-2 bg-gradient-to-r from-blue-600 via-purple-700 to-blue-800 font-semibold shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="">Ordenar</option>
          <option value="newest">Más nuevo</option>
          <option value="oldest">Más antiguo</option>
        </select>
      </div>
    </div>
  );
}
