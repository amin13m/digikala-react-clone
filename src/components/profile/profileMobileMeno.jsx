import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProfileMobileMenu({ active, onChange, menus }) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  // قفل اسکرول
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <div className="md:hidden relative">
      
      {/* دکمه باز کردن */}
      <button
        onClick={() => setOpen(true)}
        className="w-full p-3 bg-blue-600 text-white rounded mb-3"
      >
        منوی مدیریت حساب
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* منوی کشویی */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72
          bg-white dark:bg-gray-900
          shadow-xl p-4
          transform transition-transform duration-300 ease-in-out
          z-50
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button
          onClick={() => setOpen(false)}
          className="mb-4 text-sm text-gray-500"
        >
          ✕ بستن
        </button>

        {menus.map((m) => (
          <div
            key={m.key}
            onClick={() => {
              onChange(m.key);
              setOpen(false);
            }}
            className={`
              p-2 rounded cursor-pointer mb-1
              ${active === m.key
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"}
            `}
          >
            {m.label}
          </div>
        ))}

        <button
          onClick={logout}
          className="mt-4 w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          خروج
        </button>
      </div>
    </div>
  );
}