"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Loader2, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string[]}>({});
  const router = useRouter();
  const { login } = useAuth();

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
    // Clear email field errors when user types
    if (fieldErrors.email) {
      setFieldErrors(prev => ({ ...prev, email: [] }));
    }
  }, [email, fieldErrors.email]);

  // Password validation
  useEffect(() => {
    setPasswordValid(password.length >= 6);
    // Clear password field errors when user types
    if (fieldErrors.password) {
      setFieldErrors(prev => ({ ...prev, password: [] }));
    }
  }, [password, fieldErrors.password]);

  // Caps lock detection
  const handleKeyPress = (e: React.KeyboardEvent) => {
    setCapsLockOn(e.getModifierState && e.getModifierState('CapsLock'));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    setFieldErrors({});

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`,
        {
          email,
          password,
        }
      );
      
      setSuccess("Login berhasil! Mengalihkan ke dashboard...");
      
      // Store token and user data using AuthContext
      const userData = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        department: response.data.user.department,
        phone: response.data.user.phone,
        status: response.data.user.status,
        roles: response.data.user.roles || [],
        permissions: response.data.user.permissions || [],
        created_at: response.data.user.created_at,
        updated_at: response.data.user.updated_at
      };
      
      login(response.data.token, userData);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Redirect immediately after login
      router.push("/admin/dashboard");
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      let errorMessage = "Login gagal. Silakan coba lagi.";
      
      if (err.response?.status === 422) {
        // Validation errors
        const validationErrors = err.response.data.errors;
        if (validationErrors) {
          setFieldErrors(validationErrors);
          const errorMessages = [];
          for (const field in validationErrors) {
            errorMessages.push(...validationErrors[field]);
          }
          errorMessage = "Terdapat kesalahan pada input form";
        }
      } else if (err.response?.status === 401) {
        // Authentication error
        errorMessage = err.response.data.message || "Email atau password tidak valid";
      } else if (err.response?.data?.message) {
        // Other server errors
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        // Legacy error format
        errorMessage = err.response.data.error;
      }
      
      setError(errorMessage);
      
      // Call error callback if provided
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h2>
        <p className="text-gray-600">Masuk ke panel administrasi</p>
      </div>

      {/* Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 animate-in slide-in-from-top-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 animate-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">{success}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </label>
          <div className="relative">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="masukkan@email.com"
              className={cn(
                "pl-10 pr-10 transition-all duration-200",
                fieldErrors.email?.length > 0 && "border-red-500 focus-visible:border-red-500",
                email && emailValid && !fieldErrors.email?.length && "border-green-500 focus-visible:border-green-500",
                email && !emailValid && !fieldErrors.email?.length && "border-red-500 focus-visible:border-red-500"
              )}
              required
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            {email && emailValid && !fieldErrors.email?.length && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500 animate-in zoom-in-50" />
            )}
            {fieldErrors.email?.length > 0 && (
              <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500" />
            )}
          </div>
          {fieldErrors.email?.length > 0 && (
            <div className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{fieldErrors.email[0]}</span>
            </div>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Masukkan password (min. 6 karakter)"
              className={cn(
                "pl-10 pr-12 transition-all duration-200",
                fieldErrors.password?.length > 0 && "border-red-500 focus-visible:border-red-500",
                password && passwordValid && !fieldErrors.password?.length && "border-green-500 focus-visible:border-green-500",
                password && !passwordValid && !fieldErrors.password?.length && "border-red-500 focus-visible:border-red-500"
              )}
              required
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {password && passwordValid && !fieldErrors.password?.length && (
                <CheckCircle className="w-4 h-4 text-green-500 animate-in zoom-in-50" />
              )}
              {fieldErrors.password?.length > 0 && (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors ml-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          {/* Field Errors */}
          {fieldErrors.password?.length > 0 && (
            <div className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{fieldErrors.password[0]}</span>
            </div>
          )}
          
          {/* Password Requirements */}
          {password && !passwordValid && !fieldErrors.password?.length && (
            <div className="text-sm text-amber-600 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span>Password minimal 6 karakter</span>
            </div>
          )}
          
          {/* Caps Lock Warning */}
          {capsLockOn && password && (
            <div className="flex items-center gap-2 text-amber-600 text-sm animate-in slide-in-from-top-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Caps Lock aktif</span>
            </div>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700 cursor-pointer">
            Ingat saya
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || !emailValid || !passwordValid}
          className={cn(
            "w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform",
            "hover:scale-[1.02] active:scale-[0.98]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Memproses...
            </>
          ) : (
            "Masuk ke Dashboard"
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Dinas Komunikasi Informatika dan Statistik
        </p>
        <p className="text-xs text-gray-500">
          Kota Pekanbaru
        </p>
      </div>
    </div>
  );
}