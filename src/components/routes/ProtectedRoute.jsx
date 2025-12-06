import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * کامپوننت برای محدود کردن دسترسی صفحات فقط برای کاربران لاگین شده
 * مثال: /cart, /profile
 */
export default function ProtectedRoute() {
  const { user ,loading } = useAuth();

  // اگر کاربر لاگین نکرده → هدایت به صفحه لاگین
  if (!user && !loading) {
    return <Navigate to="/auth/login" replace />;
  }

  // اگر لاگین کرده → اجازه دسترسی به صفحات فرزند
  return <Outlet />;
}