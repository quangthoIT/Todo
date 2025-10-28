import React, { useState } from "react";
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

const Header = ({ onMenuClick }) => {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 py-4 px-8 md:px-12 md:py-3">
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
            <h1 className="hidden md:block text-2xl font-bold text-gray-900">
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
          {/* Chuyển đổi giao diện sáng/tối */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-xl hover:bg-blue-50 transition cursor-pointer"
          >
            {theme === "light" ? (
              <Moon className="w-6 h-6" />
            ) : (
              <Sun className="w-6 h-6" />
            )}
          </button>

          {/* Thông báo */}
          <button className="p-2 rounded-xl hover:bg-blue-50 transition cursor-pointer">
            <BellIcon className="w-6 h-6" />
          </button>

          {/* Thông tin người dùng */}
          <div className="hidden md:block">
            <UserMenu />
          </div>

          {/* Nút Menu cho Mobile */}
          <button
            className="p-2 rounded-lg hover:bg-blue-50 md:hidden cursor-pointer"
            onClick={onMenuClick}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
