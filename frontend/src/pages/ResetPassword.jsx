import React, { useEffect, useState } from "react";
import { Lock, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error("Please start from the Forgot Password Page");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    setLoading(true);
    try {
      await api.auth.resetPassword(email, newPassword, otp);
      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-600">
            Enter the OTP you received and your new password
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nhập OTP */}
            <Input
              type="text"
              label="OTP Code"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            {/* Nhập mật khẩu mới */}
            <Input
              type="password"
              label="New Password"
              placeholder="Enter new password"
              icon={<Lock size={20} />}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            {/* Xác nhận mật khẩu */}
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Re-enter new password"
              icon={<Lock size={20} />}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-10 rounded-lg font-medium text-white ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" /> Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-sm flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft size={18} className="mr-1" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
