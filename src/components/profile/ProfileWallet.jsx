import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function ProfileWallet() {
  const { user, chargeWallet } = useAuth();

  const [amount, setAmount] = useState("");

  const submit = async () => {
    const t = Number(amount);
    if (t <= 0) return alert("مبلغ نامعتبر");

    await chargeWallet(t);
    alert("کیف پول شارژ شد");
    setAmount("");
  };

  return (
    <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">مدیریت کیف پول</h2>

      <p className="mb-2">
        موجودی فعلی: {user.wallet?.toLocaleString()} تومان
      </p>

      <input
        type="number"
        placeholder="مبلغ"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 bg-gray-200 dark:bg-gray-700 w-full rounded"
        step={1000}
        min={1000}
      />

      <button
        className="mt-3 bg-green-600 text-white rounded p-2 w-full"
        onClick={submit}
      >
        شارژ کیف پول
      </button>
    </div>
  );
}