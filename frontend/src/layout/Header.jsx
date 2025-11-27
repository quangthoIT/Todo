import React, { useEffect, useState } from "react";
import {
  BellIcon,
  Menu,
  Moon,
  Search,
  SquareCheckBig,
  Sun,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

const Header = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkNotifications = async () => {
      try {
        const data = await api.tasks.getNotifications();

        if (data.success && data.notifications.length > 0) {
          setNotifications(true);
        } else {
          setNotifications(false);
        }
      } catch (error) {
        toast.error("Failed to check notifications");
      }
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-600 py-4 px-8 md:px-12 md:py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center gap-1 md:gap-3 flex-shrink-0 group cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          {/* Icon */}
          <div className="relative w-10 h-10 bg-blue-600 flex items-center justify-center rounded-xl">
            <SquareCheckBig className="w-6 h-6 text-white" />
          </div>
          {/* Brand */}
          <div>
            <h1 className="hidden md:block text-2xl font-bold text-gray-900 dark:text-gray-100">
              Todo
            </h1>
          </div>
        </div>

        {/* Search */}
        {/* <div className="flex-1 max-w-xl mx-6">
          <Input
            type="search"
            icon={<Search size={20} />}
            placeholder="Search..."
          />
        </div> */}

        {/* Theme - Notification - Infomation */}
        <div className="flex items-center justify-between gap-1 md:gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 dark:text-gray-100 transition cursor-pointer"
          >
            {theme === "light" ? (
              <Moon className="w-6 h-6" />
            ) : (
              <Sun className="w-6 h-6" />
            )}
          </button>

          {/* Thông báo */}
          <button
            className="p-2 rounded-xl dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-800 transition cursor-pointer relative"
            onClick={() => {
              navigate("/notifications");
            }}
          >
            <BellIcon className="w-6 h-6" />
            {notifications && (
              <div className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></div>
            )}
          </button>

          {/* Thông tin người dùng */}
          <div className="hidden md:block">
            <UserMenu />
          </div>

          {/* Nút Menu cho Mobile */}
          <button
            className="p-2 rounded-lg md:hidden cursor-pointer"
            onClick={onMenuClick}
          >
            <Menu className="w-6 h-6 text-gray-900 dark:text-gray-100" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
