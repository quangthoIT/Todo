import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Camera,
  Lock,
  Loader2,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Camera className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Avatar</h2>
            </div>

            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            </div>

            <form>
              <input
                type="text"
                placeholder="Nhập URL ảnh đại diện"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button type="submit" className="w-full rounded-lg" size="lg">
                Update Avatar
              </Button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
            </div>

            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>

              <Button type="submit" className="w-full rounded-lg" size="lg">
                Update Profile
              </Button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Change Password
              </h2>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Old Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter old password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="md:col-span-3">
                <Button type="submit" className="w-full rounded-lg" size="lg">
                  Change Password
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow p-6 md:col-span-2 border-2 border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-5 h-5 text-red-600" />
              <h2 className="text-xl font-semibold text-red-800">
                Delete Account
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Delete your account and all associated data. This action is
              irreversible.
            </p>
            <Button
              type="submit"
              className="rounded-lg bg-red-500 hover:bg-red-600"
              size="lg"
            >
              Update Avatar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
