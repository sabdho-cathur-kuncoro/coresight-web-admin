/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

interface LoginProps {
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Demo users for different roles
  const demoUsers = [
    {
      email: "manager@fmcg.com",
      password: "manager123",
      role: "Sales Manager",
      name: "John Smith",
    },
    {
      email: "rep@fmcg.com",
      password: "rep123",
      role: "Sales Rep",
      name: "Sarah Johnson",
    },
    {
      email: "admin@fmcg.com",
      password: "admin123",
      role: "Administrator",
      name: "Mike Wilson",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      const user = demoUsers.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        onLogin({
          id: Math.random().toString(36).substr(2, 9),
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: null,
          lastLogin: new Date().toISOString(),
          permissions:
            user.role === "Administrator" ? ["all"] : ["read", "write"],
        });
      } else {
        setError("Invalid email or password. Try the demo credentials below.");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = (user: any) => {
    setFormData({
      email: user.email,
      password: user.password,
      rememberMe: false,
    });
    setTimeout(() => {
      onLogin({
        id: Math.random().toString(36).substr(2, 9),
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: null,
        lastLogin: new Date().toISOString(),
        permissions:
          user.role === "Administrator" ? ["all"] : ["read", "write"],
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B2A49] via-[#2A3B5C] to-[#1B2A49] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #F57C00 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #FFA726 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#F57C00] to-[#FFA726] rounded-2xl mb-4 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div> */}
          <img src="Logo.png" />
          {/* <h1 className="text-3xl font-bold text-white mb-2">FMCG Analytics</h1> */}
          <p className="text-blue-200">Sales Activity Dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#2A2E33] mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-[#2A2E33] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-[#2A2E33] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                  className="w-4 h-4 text-[#F57C00] border-gray-300 rounded focus:ring-[#F57C00]"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-[#F57C00] hover:text-[#E65100] font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#F57C00] to-[#FFA726] text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 text-center">
              Demo Credentials:
            </p>
            <div className="space-y-2">
              {demoUsers.map((user, index) => (
                <button
                  key={index}
                  onClick={() => handleDemoLogin(user)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-[#2A2E33]">
                        {user.role}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <div className="text-xs text-[#F57C00] font-medium">
                      Click to login
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-blue-200 text-sm">
            © 2024 FMCG Analytics. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
