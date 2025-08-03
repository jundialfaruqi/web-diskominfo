"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoginForm from "@/components/LoginForm";

export default function DKLogin() {
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLoginSuccess = () => {
    // Redirect to dashboard after successful login
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1500);
  };

  const handleLoginError = (error: string) => {
    // Handle login error if needed
    console.error("Login error:", error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <LoginForm 
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </div>
  );
}