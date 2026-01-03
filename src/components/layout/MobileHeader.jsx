import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import CategoriesList from "../categories/CategoriesList";
import SearchBox from "../home/SearchBox";
import { useTheme } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function HeaderMobile() {
  const { user } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // ✅ حتماً باید اینجا باشد
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="md:hidden bg-white shadow-md dark:bg-gray-900 z-50">
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-red-600">
          DigiShop
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        <div className="flex items-center">
          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="relative ml-3"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 text-xs flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="px-3 text-xl"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`
          fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* Slide Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full
          bg-white dark:bg-gray-900
          z-50 transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
          <span className="font-bold">منو</span>
          <button onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        {/* Search */}
        <div className="p-4">
          <SearchBox setMenuOpen={setMenuOpen} />
        </div>

        {/* Links */ }
        <nav className="flex flex-col space-y-2 p-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>خانه</Link>

          <CategoriesList setMenuOpen={setMenuOpen}/>

          {user && user.role === "admin" || user?.role === "superAdmin" ? (
            <Link
              to="/admin/products"
              onClick={() => setMenuOpen(false)}
              className="border rounded p-2 text-center"
            >
              ADMIN
            </Link>
          ) : null}

          {user ? (
            <button
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="border rounded p-2 text-center"
            >
              {user.name}
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/auth/login");
                setMenuOpen(false);
              }}
              className="bg-blue-600 text-white rounded p-2"
            >
              ورود
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}