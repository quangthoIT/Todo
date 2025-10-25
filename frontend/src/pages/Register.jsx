import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, Mail, User, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth(); // Gọi API đăng ký
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra mật khẩu
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }
    // Kiểm tra độ dài mật khẩu
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password, displayName);

      if (error) {
        toast.error(error.message || "Sign up failed");
      } else {
        toast.success("Account created successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header Đăng ký */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join Todo to manage your tasks</p>
        </div>

        {/* Form Đăng ký */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              icon={<User size={20} />}
              required
            />

            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={20} />}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={20} />}
              required
            />

            <Input
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock size={20} />}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`h-10 w-full font-semibold rounded-lg mt-2 flex items-center justify-center transition ${
                loading
                  ? "bg-blue-400 text-white cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              }`}
            >
              {loading ? (
                // Hiển thị icon loading khi đang gửi request
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Nếu đã có tài khoản thì chuyển sang login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
