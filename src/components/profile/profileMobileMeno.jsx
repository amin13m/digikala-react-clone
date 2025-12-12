import React, { useState } from "react";

export default function ProfileMobileMenu({ active, onChange }) {
  const [open, setOpen] = useState(false);

  const menus = [
    { key: "info", label: "اطلاعات حساب" },
    { key: "name", label: "تغییر نام" },
    { key: "password", label: "تغییر رمز" },
    { key: "wallet", label: "مدیریت کیف پول" }
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-3 bg-blue-600 text-white rounded mb-3"
      >
        منوی مدیریت حساب
      </button>

      {open && (
        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-3">
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
        </div>
      )}
    </div>
  );
}