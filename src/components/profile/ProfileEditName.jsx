import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProfileEditName() {
  const { user, updateName } = useAuth();

  const [value, setValue] = useState(user.name);

  const submit = async () => {
    await updateName(value);
    alert("نام با موفقیت تغییر کرد");
  };

  return (
    <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">تغییر نام</h2>

      <input
        className="p-2 bg-gray-200 dark:bg-gray-700 w-full rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        className="mt-3 bg-blue-600 text-white rounded p-2 w-full"
        onClick={submit}
      >
        ذخیره
      </button>
    </div>
  );
}