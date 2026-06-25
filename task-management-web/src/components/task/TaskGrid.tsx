import DeleteConfirmModal from "./DeleteConfirmModal";
import TaskCard from "./TaskCard";

import { useState } from "react";

import { useGetTasksQuery } from "../../features/task/taskApi";
import type { Task } from "../../features/task/type";

interface Props {
  search: string;

  status:
    | "all"
    | "pending"
    | "in_progress"
    | "completed";

  onEdit: (task: Task) => void;
}

const TaskGrid = ({
  search,
  status,
  onEdit,
}: Props) => {
  const { data, isLoading } = useGetTasksQuery();

  const [deleteTask, setDeleteTask] =
    useState<Task | null>(null);

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-56 animate-pulse rounded-3xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  const tasks = data?.data ?? [];

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (task.description ?? "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      status === "all" ||
      task.status === status;

    return matchesSearch && matchesStatus;
  });

  if (!filteredTasks.length) {
    return (
      <div className="rounded-3xl border bg-white py-20 text-center">

        <h2 className="text-2xl font-bold">
          No Tasks Found
        </h2>

        <p className="mt-3 text-slate-500">
          Try changing your search or filter.
        </p>

      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={setDeleteTask}
          />
        ))}

      </div>

      <DeleteConfirmModal
        task={deleteTask}
        onClose={() => setDeleteTask(null)}
      />
    </>
  );
};

export default TaskGrid;