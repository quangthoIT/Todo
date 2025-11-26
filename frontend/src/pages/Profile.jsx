import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import HeaderPage from "@/components/HeaderPage";
import ProfileInfoCard from "@/components/ProfileInfoCard";
import AvatarCard from "@/components/AvatarCard";
import PasswordCard from "@/components/PasswordCard";
import DeleteAccountCard from "@/components/DeleteAccountCard";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { toast } from "sonner";

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(user.userName || "");
      setEmail(user.email || "");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    if (!avatar.trim()) return toast.error("Please enter avatar URL");

    setLoading(true);
    try {
      const data = await api.users.updateAvatar(avatar.trim());
      if (data.success) {
        updateUser(data.user);
        toast.success("Update avatar successfully!");
      }
    } catch (error) {
      toast.error("Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!userName.trim()) return toast.error("Please enter username");

    setLoading(true);
    try {
      const data = await api.users.updateProfile(userName.trim());
      if (data.success) {
        updateUser(data.user);
        toast.success("Update profile successfully!");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword)
      return toast.error("Please enter all required fields");
    if (newPassword.length < 8)
      return toast.error("Password must be at least 8 characters long");
    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    setLoading(true);
    try {
      const data = await api.users.changePassword(oldPassword, newPassword);
      if (data.success) {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success("Change password successfully!");
      }
    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const data = await api.users.deleteAccount();
      if (data.success) {
        setShowDeleteDialog(false);
        toast.success("Delete account successfully!");
        setTimeout(() => {
          logout();
          navigate("/login");
        }, 500);
      }
    } catch (error) {
      toast.error("Failed to delete account");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <HeaderPage
        title="Profile Settings"
        description="Manage and update your personal information"
        showButton={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AvatarCard
          avatar={avatar}
          setAvatar={setAvatar}
          onUpdate={handleUpdateAvatar}
          loading={loading}
        />

        <ProfileInfoCard
          userName={userName}
          setUserName={setUserName}
          email={email}
          onUpdate={handleUpdateProfile}
          loading={loading}
        />

        <PasswordCard
          oldPassword={oldPassword}
          setOldPassword={setOldPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onChangePassword={handleChangePassword}
          loading={loading}
        />

        <DeleteAccountCard onRequestDelete={() => setShowDeleteDialog(true)} />
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        loading={loading}
      />
    </div>
  );
};

export default Profile;
