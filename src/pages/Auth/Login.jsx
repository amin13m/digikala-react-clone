import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(form.email, form.password);

    if (result.name) {
      navigate("/"); // بعد از لاگین موفق → صفحه اصلی
    } else {
      setError(result.message || "ایمیل یا رمز عبور اشتباه است!");
    }
  };

  
  if(user)navigate("/");

  return (

    

    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">ورود به حساب کاربری</h2>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
          className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
        >
          ورود
        </button>

        <p className="text-center text-sm mt-3">
          حساب ندارید؟{" "}
          <Link to="/auth/register" className="text-blue-600 font-semibold">
            ثبت‌نام
          </Link>
        </p>
      </form>
    </div>
  );
}