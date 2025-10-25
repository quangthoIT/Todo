import React, { useRef, useState } from "react";
import {
  Bell,
  BellIcon,
  ChevronDown,
  LogOut,
  Moon,
  Search,
  Settings,
  SquareCheckBig,
  Sun,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Header = ({ currentUser, onLogout }) => {
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const menuref = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    onLogout();
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-50 shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-around max-w-7xl mx-auto">
        {/* Logo */}
        <div
          className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group cursor-pointer"
          onClick={() => navigate("/")}
        >
          {/* Icon */}
          <div className="relative w-10 h-10 bg-blue-600 flex items-center justify-center rounded-xl">
            <SquareCheckBig className="w-6 h-6 text-white" />
          </div>
          {/* Brand */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Todo</h1>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl relative mx-6">
          {/* Icon tìm kiếm */}
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          {/* Ô input có padding-left để chừa chỗ cho icon */}
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-full border border-gray-300"
          />
        </div>

        {/* Theme - Notification - Avatar */}
        <div className="flex items-center justify-between gap-1 sm:gap-3">
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

          {/* Avatar và Menu */}
          <div ref={menuref} className="relative">
            <button
              onClick={handleMenuToggle}
              className="flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer border border-gray-100 hover:border-gray-300 hover:bg-blue-50 transition-all"
            >
              <div className="relative">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full shadow-sm"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold shadow-sm">
                    {currentUser?.userName?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              <div className="text-left hiden md:block">
                <p className="text-sm font-medium text-gray-800">
                  {currentUser?.userName}
                </p>
                <p className="text-xs text-gray-600 font-normal">
                  {currentUser?.email}
                </p>
              </div>

              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                  menuOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {menuOpen && (
              <ul className="absolute top-14 right-0 w-56 bg-gray-50 rounded-xl shadow-md border border-gray-200 z-50 overflow-hidden animate-fadeIn">
                <li className="p-2">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-blue-50 group text-sm text-gray-700 flex items-center rounded-xl transition-all cursor-pointer"
                  >
                    <Settings className="w-4 h-4 mr-2 text-gray-700" />
                    Profile Setting
                  </button>
                </li>

                <li className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-red-50 group text-sm text-red-500 flex items-center rounded-xl transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2 text-red-500" />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
