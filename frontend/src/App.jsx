import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster, toast } from "sonner";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <>
      <BrowserRouter>
        <Toaster richColors closeButton position="top-right" />
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout currentUser={currentUser} onLogout={handleLogout} />
            }
          >
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
