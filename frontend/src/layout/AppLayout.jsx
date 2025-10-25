import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header/>

      <div className="flex flex-1">
        <aside className="w-56">
          <Sidebar />
        </aside>

        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
