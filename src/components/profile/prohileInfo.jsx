import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProfileInfo() {
  const { user } = useAuth();


  if (!user) return <div>لطفا وارد حساب کاربری خود شوید.</div>;
  return (
    <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">اطلاعات حساب</h2>

      <p><strong>نام:</strong> {user.name}</p>
      <p><strong>ایمیل:</strong> {user.email}</p>
      <p><strong>کیف پول:</strong> {user.wallet?.toLocaleString()} تومان</p>
    </div>
  );
}