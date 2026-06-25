import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit,
  Trash2,
} from "lucide-react";

import { toast } from "sonner";

import { Task } from "../../features/task/type";
import { useUpdateTaskMutation } from "../../features/task/taskApi";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskCard = ({
  task,
  onEdit,
  onDelete,
}: Props) => {
  const [updateTask, { isLoading }] =
    useUpdateTaskMutation();

  const handleStatusChange = async (
    status: "pending" | "in_progress" | "completed"
  ) => {
    try {
      await updateTask({
        id: task.id,
        status,
      }).unwrap();

      toast.success("Task status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="group rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between gap-4">

        <h2 className="text-lg font-semibold text-slate-900">
          {task.title}
        </h2>

        <select
          value={task.status}
          disabled={isLoading}
          onChange={(e) =>
            handleStatusChange(
              e.target.value as
                | "pending"
                | "in_progress"
                | "completed"
            )
          }
          className={`rounded-xl border px-3 py-2 text-sm font-medium outline-none transition

          ${
            task.status === "completed"
              ? "border-green-200 bg-green-100 text-green-700"
              : task.status === "in_progress"
              ? "border-blue-200 bg-blue-100 text-blue-700"
              : "border-yellow-200 bg-yellow-100 text-yellow-700"
          }

          disabled:opacity-60`}
        >
          <option value="pending">
            Pending
          </option>

          <option value="in_progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>
        </select>

      </div>

      <p className="mt-4 line-clamp-3 text-sm text-slate-500">
        {task.description || "No description"}
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">

        <CalendarDays size={16} />

        {new Date(task.createdAt).toLocaleDateString()}

      </div>

      <div className="mt-6 flex items-center justify-between">

        <div className="flex items-center gap-2">

          {task.status === "completed" ? (
            <>
              <CheckCircle2
                size={18}
                className="text-green-600"
              />

              <span className="text-sm text-green-600">
                Completed
              </span>
            </>
          ) : (
            <>
              <Clock3
                size={18}
                className="text-yellow-600"
              />

              <span className="text-sm text-slate-500">
                Active
              </span>
            </>
          )}

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(task)}
            className="rounded-xl border p-2 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Edit size={18} />
          </button>

          <button
            onClick={() => onDelete(task)}
            className="rounded-xl border p-2 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default TaskCard;