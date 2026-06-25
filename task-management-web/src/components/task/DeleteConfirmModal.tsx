import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { Task } from "../../features/task/type";
import { useDeleteTaskMutation } from "../../features/task/taskApi";


interface Props {
  task: Task | null;
  onClose: () => void;
}

const DeleteConfirmModal = ({
  task,
  onClose,
}: Props) => {
  const [deleteTask, { isLoading }] =
    useDeleteTaskMutation();

  if (!task) return null;

  const handleDelete = async () => {
    try {
      await deleteTask(task.id).unwrap();

      toast.success("Task deleted successfully");

      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to delete task"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle
            className="text-red-600"
            size={32}
          />
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold">
          Delete Task?
        </h2>

        <p className="mt-3 text-center text-slate-500">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            "{task.title}"
          </span>
          ?
          <br />
          This action cannot be undone.
        </p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-300 py-3 font-medium hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            onClick={handleDelete}
            className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteConfirmModal;