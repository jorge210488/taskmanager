export interface TaskControlsProps {
  onAddTask: () => void;
  onFilterChange: (filters: {
    searchQuery: string;
    filterStatus: string;
    sortBy: string;
  }) => void;
}
