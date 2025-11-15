import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="نام و نام خانوادگی"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 w-full my-2"
        required
      />
      <input
        type="email"
        placeholder="ایمیل"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 w-full my-2"
        required
      />
      <input
        type="password"
        placeholder="رمز عبور"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 w-full my-2"
        required
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">ثبت نام</button>
    </form>
  );
}