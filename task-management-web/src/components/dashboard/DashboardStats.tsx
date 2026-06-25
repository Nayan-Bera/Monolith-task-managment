import {
  CheckCircle2,
  CircleDashed,
  Clock3,
  ListTodo,
} from "lucide-react";
import { useGetTasksQuery } from "../../features/task/taskApi";


const DashboardStats = () => {
  const { data } = useGetTasksQuery();

  const tasks = data?.data ?? [];

  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: ListTodo,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: tasks.filter(
        (task) => task.status === "pending"
      ).length,
      icon: CircleDashed,
      bg: "bg-gray-100",
      color: "text-gray-600",
    },
    {
      title: "In Progress",
      value: tasks.filter(
        (task) => task.status === "in_progress"
      ).length,
      icon: Clock3,
      bg: "bg-amber-100",
      color: "text-amber-600",
    },
    {
      title: "Completed",
      value: tasks.filter(
        (task) => task.status === "completed"
      ).length,
      icon: CheckCircle2,
      bg: "bg-green-100",
      color: "text-green-600",
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold text-slate-900">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`rounded-2xl p-4 ${stat.bg}`}
              >
                <Icon
                  size={28}
                  className={stat.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default DashboardStats;