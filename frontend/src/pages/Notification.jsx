import React, { useState, useEffect } from "react";
import HeaderPage from "@/components/HeaderPage";
import NotificationCard from "@/components/NotificationCard";
import { api } from "@/lib/api";
import { toast } from "sonner";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await api.tasks.getNotifications();
      if (data.success) {
        setNotifications(data.notifications || []);
      }
    } catch (err) {
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <HeaderPage
        title="Notifications"
        description="View and manage your latest task reminders and alerts"
        showButton={false}
      />

      <NotificationCard
        title="Upcoming Deadline Notifications"
        notifications={notifications}
        onRefresh={fetchNotifications}
      />
    </div>
  );
};

export default Notification;
