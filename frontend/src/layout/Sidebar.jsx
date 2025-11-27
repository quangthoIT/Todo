import React from "react";
import {
  BarChart3,
  Building2,
  Calendar,
  CheckSquare,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserMenu from "../components/UserMenu";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Organization", href: "/organization", icon: Building2 },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNewTask = () => {
    navigate("/tasks?new=true");
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 shadow-sm p-4">
      {/* New Task */}
      {/* <div className="p-2 mt-4">
        <button
          className="hidden md:flex w-full items-center justify-center gap-2 py-3 px-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md cursor-pointer"
          onClick={handleNewTask}
        >
          {" "}
          <Plus />
          New Task
        </button>
      </div> */}

      {/* Navbar */}
      <nav className="flex-1 p-2 mt-16 md:mt-4">
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
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:dark:text-gray-100"
                }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Menu Mobile */}
      <div className="mt-auto pt-4 border-t border-gray-300 md:hidden">
        <UserMenu isMobile />
      </div>
    </div>
  );
};

export default Sidebar;
