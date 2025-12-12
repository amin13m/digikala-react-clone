import React from "react";

export default function ProfileSidebar({ active, onChange }) {
  const menus = [
    { key: "info", label: "اطلاعات حساب" },
    { key: "name", label: "تغییر نام" },
    { key: "password", label: "تغییر رمز" },
    { key: "wallet", label: "مدیریت کیف پول" }
  ];

  return (
    <div className="hidden md:block w-64 bg-white dark:bg-gray-900 shadow rounded-xl p-4">
      <h3 className="text-xl font-bold mb-4">پروفایل</h3>

      <ul className="space-y-3">
        {menus.map(m => (
          <li
            key={m.key}
            onClick={() => onChange(m.key)}
            className={`
              cursor-pointer p-2 rounded
              ${active === m.key ? "bg-blue-600 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}
            `}
          >
            {m.label}
          </li>
        ))}
      </ul>
    </div>
  );
}