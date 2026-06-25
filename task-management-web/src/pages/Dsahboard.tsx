import { useState } from "react";

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import DashboardStats from "../components/dashboard/DashboardStats";
import StatusFilter from "../components/dashboard/StatusFilter";

import TaskGrid from "../components/task/TaskGrid";
import TaskModal from "../components/task/TaskModal";
import { Task } from "../features/task/type";


const Dashboard = () => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<
    "all" | "pending" | "in_progress" | "completed"
  >("all");

  const [openModal, setOpenModal] = useState(false);

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  return (
    <div className="min-h-screen bg-slate-50">

      <DashboardNavbar
        search={search}
        setSearch={setSearch}
        onCreateTask={() => {
          setSelectedTask(null);
          setOpenModal(true);
        }}
      />

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">

        <DashboardStats />

        <StatusFilter
          value={status}
          onChange={setStatus}
        />

        <TaskGrid
          search={search}
          status={status}
          onEdit={(task) => {
            setSelectedTask(task);
            setOpenModal(true);
          }}
        />

      </main>

      <TaskModal
        open={openModal}
        task={selectedTask}
        onClose={() => {
          setSelectedTask(null);
          setOpenModal(false);
        }}
      />

    </div>
  );
};

export default Dashboard;