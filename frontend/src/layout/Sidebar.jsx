import React from "react";
import {
  BarChart3,
  Calendar,
  CheckSquare,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNewTask = () => {
    navigate("/tasks?new=true");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200 shadow-sm p-4">
      {/* New Task */}
      <div className="p-2 mt-4">
        <button
          className="hidden md:flex w-full items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded-md"
          onClick={handleNewTask}
        >
          {" "}
          <Plus />
          New Task
        </button>
      </div>

      {/* Navbar */}
      <nav className="flex-1 p-2 mt-10 md:mt-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-2
                transition-colors duration-150
                ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
