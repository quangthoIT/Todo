import React, { useState } from "react";
import { Mail, Loader2, ArrowLeft, Mails } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.auth.forgotPassword(email);
      toast.success("Password reset email sent!");
      setEmail("");
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
            <Mails className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600">
            Enter your email to reset your password
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={20} />}
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
                  <Loader2 className="w-5 h-5 animate-spin mr-2" /> Sending...
                </span>
              ) : (
                "Send Reset Link"
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

export default ForgotPassword;
