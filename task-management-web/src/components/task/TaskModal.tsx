import { useEffect } from "react";
import { X } from "lucide-react";



import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Task } from "../../features/task/type";
import { useCreateTaskMutation, useUpdateTaskMutation } from "../../features/task/taskApi";


interface Props {
  open: boolean;
  task: Task | null;
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
}

const TaskModal = ({
  open,
  task,
  onClose,
}: Props) => {
  const [createTask, { isLoading: creating }] =
    useCreateTaskMutation();

  const [updateTask, { isLoading: updating }] =
    useUpdateTaskMutation();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || "",
        status: task.status,
      });
    } else {
      reset({
        title: "",
        description: "",
        status: "pending",
      });
    }
  }, [task, reset]);

  if (!open) return null;

  const onSubmit = async (data: FormData) => {
    try {
      if (task) {
        await updateTask({
          id: task.id,
          ...data,
        }).unwrap();

        toast.success("Task updated");
      } else {
        await createTask(data).unwrap();

        toast.success("Task created");
      }

      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-3xl bg-white p-8">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            {task ? "Edit Task" : "Create Task"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          <input
            {...register("title")}
            placeholder="Task title"
            className="w-full rounded-xl border px-4 py-3"
          />

          <textarea
            {...register("description")}
            placeholder="Description"
            rows={5}
            className="w-full rounded-xl border px-4 py-3"
          />

          <select
            {...register("status")}
            className="w-full rounded-xl border px-4 py-3"
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

          <button
            disabled={creating || updating}
            className="w-full rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
            {creating || updating
              ? "Saving..."
              : task
              ? "Update Task"
              : "Create Task"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default TaskModal;