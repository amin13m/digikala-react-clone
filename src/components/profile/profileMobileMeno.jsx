import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProfileMobileMenu({ active, onChange , menus}) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();


  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-3 bg-blue-600 text-white rounded mb-3"
      >
        منوی مدیریت حساب
      </button>

      {open && (
        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-3 absolute z-50 w-11/12 mx-auto left-0 right-0">
          {menus.map(m => (
            <div
              key={m.key}
              onClick={() => {
                onChange(m.key);
                setOpen(false);
              }}
              className={`
                p-2 rounded cursor-pointer mb-1
                ${active === m.key ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
              `}
            >
              {m.label}
            </div>
          ))}
          
          <button
                onClick={() => logout()}
                className="px-3 py-1 bg-red-600 dark:bg-red-600 text-white rounded hover:bg-red-700  dark:hover:bg-red-700 transition"
              >
                خروج
          </button>
        
        </div>
      )}
    </div>
  );
}