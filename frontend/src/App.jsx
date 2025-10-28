import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster, toast } from "sonner";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import NotFound from "./pages/NotFound";
import RequireNoAuth from "./components/RequireNoAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Task from "./pages/Tasks";
import Calendar from "./pages/Calender";
import Report from "./pages/Reports";
import Organization from "./pages/Organization";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster richColors closeButton position="top-right" duration={1500} />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/login"
              element={
                <RequireNoAuth>
                  <Login />
                </RequireNoAuth>
              }
            />
            <Route
              path="/register"
              element={
                <RequireNoAuth>
                  <Register />
                </RequireNoAuth>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tasks" element={<Task />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="organization" element={<Organization />} />
              <Route path="reports" element={<Report />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
