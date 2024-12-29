import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Task } from "../../interfaces/task.interface";
import AnimationLottie from "../../helpers/animationLottie";
import chart from "../../assets/chart.json";

export default function TaskOverview() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-lg">No tasks available</p>;
  }

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task: Task) => task.completed).length;
  const notCompletedTasks = totalTasks - completedTasks;

  const completedData = {
    labels: ["Completada", "Pendiente"],
    datasets: [
      {
        data: [completedTasks, notCompletedTasks],
        backgroundColor: ["#B0BEC5", "#9575CD"],
      },
    ],
  };

  const completedOptions = {
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 20,
          padding: 10,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const tasksByHour = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const createdHour = new Date(task.createdAt).getHours();
      acc[createdHour] = (acc[createdHour] || 0) + 1;
      return acc;
    },
    {}
  );

  const barData = {
    labels: Object.keys(tasksByHour).map((hour) => `${hour}:00`),
    datasets: [
      {
        label: "Tareas vs hora",
        data: Object.values(tasksByHour),
        backgroundColor: "#9575CD",
      },
    ],
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 px-4 pt-0 pb-4 sm:p-4">
      <div className="rounded-lg p-4 flex flex-col items-center justify-center flex-1">
        <div className="w-[200px] h-[150px] sm:w-[300px] sm:h-[250px]">
          <AnimationLottie animationData={chart} />
        </div>
      </div>

      {/* Total Tasks */}
      <div className="bg-gray-200 shadow-md rounded-lg flex flex-col items-center justify-center flex-1">
        <h2 className="text-xl md:text-5xl font-bold pb-1 sm:pb-4">
          Total de Tareas
        </h2>
        <p className="text-3xl md:text-5xl font-bold text-indigo-500">
          {totalTasks}
        </p>
      </div>

      {/* Completed vs Not Completed */}
      <div className="bg-gray-400 shadow-md rounded-lg flex flex-col items-center justify-center flex-1 pb-1">
        <h2 className="text-lg md:text-2xl font-bold text-center mb-0 sm:mb-2">
          Completadas vs pendientes
        </h2>
        <div className="w-[150px] h-[150px] sm:w-[150px] sm:h-[150px]">
          <Pie data={completedData} options={completedOptions} />
        </div>
      </div>

      {/* Tasks by Hour */}
      <div className="bg-gray-200 shadow-md rounded-lg p-4 flex flex-col items-center justify-center flex-1">
        <h2 className="text-lg md:text-2xl font-bold text-center mb-2 md:mb-4">
          Tareas creadas por hora
        </h2>
        <div className="w-full max-w-xs">
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}
