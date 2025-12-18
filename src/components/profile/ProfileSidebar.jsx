import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProfileSidebar({ active, onChange ,menus }) {
  
  const { user, logout } = useAuth();

  return (
    <div className="hidden md:block w-64 bg-white dark:bg-gray-900 shadow rounded-xl p-4">
      <h3 className="text-xl font-bold mb-4">پروفایل</h3>

      <ul className="space-y-3">
        {menus.map(m => (
          <li
            key={m.key}
            onClick={() => onChange(m.key)}
            className={`
              cursor-pointer p-1 rounded
              ${active === m.key ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
            `}
          >
            {m.label}
          </li>
        ))}
        <li>
          <button
                onClick={() => logout()}
                className="px-3 py-1 bg-red-600 dark:bg-red-600 text-white rounded hover:bg-red-700  dark:hover:bg-red-700 transition"
              >
                خروج
              </button>
        </li>
      </ul>
    </div>
  );
}