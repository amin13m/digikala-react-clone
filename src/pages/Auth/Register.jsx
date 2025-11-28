import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await register(form.name, form.email, form.password);

    if (result.success) {
      navigate("/login");
    } else {
      setError(result.message || "ثبت نام با خطا مواجه شد!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-lg dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6 text-center">ثبت نام کاربر</h2>

      {error && <p className="text-red-500 text-sm mb-3 ">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          name="name"
          placeholder="نام"
          value={form.name}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="ایمیل"
          value={form.email}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          value={form.password}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg "
        >
          ثبت نام
        </button>

        <p className="text-center text-sm mt-3">
          حساب دارید؟{" "}
          <Link to="/auth/login" className="text-blue-600 font-semibold">
            ورود
          </Link>
        </p>
      </form>
    </div>
  );
}