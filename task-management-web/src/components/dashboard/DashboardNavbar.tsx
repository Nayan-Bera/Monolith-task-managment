import { LogOut, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

interface DashboardNavbarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onCreateTask: () => void;
}

const DashboardNavbar = ({
  search,
  setSearch,
  onCreateTask,
}: DashboardNavbarProps) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            TaskFlow
          </h1>

          <p className="text-sm text-slate-500">
            Welcome back, {user?.name}
          </p>
        </div>

        {/* Search */}

        <div className="relative hidden w-full max-w-md lg:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

        </div>

        {/* Actions */}

        <div className="flex items-center gap-3">

          <button
            onClick={onCreateTask}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            New Task
          </button>

          <button
            onClick={handleLogout}
            className="rounded-xl border p-3 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={20} />
          </button>

        </div>

      </div>
    </header>
  );
};

export default DashboardNavbar;