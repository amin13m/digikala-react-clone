import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import CategoriesList from "../categories/CategoriesList";
import SearchBox from "../home/SearchBox";
import { useTheme } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className="hidden md:block md:sticky  bg-white shadow-md  top-0 z-50
      dark:bg-gray-900 dark:text-white dark:border-gray-800 
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* لوگو */}
        <Link
          to="/"
          className="text-2xl font-bold text-red-600 dark:text-red-500 dark:hover:text-red-700 min-w-[120px] "
        >
          دیجی کلون
        </Link>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        {/* جستجو */}
        <SearchBox />

        {/* منو و آیکون‌ها */}
        <div className="flex items-center space-x-2  w-fit">
          {/* دسته‌بندی‌ها ساده */}

          <CategoriesList />

          {/* سبد خرید */}
          <button
            onClick={() => navigate("/cart")}
            className="relative py-2 px-2 rounded hover:bg-gray-100 transition dark:hover:bg-gray-800 "
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs dark:bg-blue-400">
                {cartCount}
              </span>
            )}
          </button>

          {/* کاربر */}
          {user ? (
            <div className="space-x-2 w-fit mx-0 text-center">
              <div className="text-gray-900 dark:text-gray-100 cursor-pointer min-w-20  mx-0
               border-2 border-gray-300 rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white transition dark:border-gray-600 dark:hover:border-gray-500 dark:bg-gray-800 
               block text-center
               "
                onClick={()=>navigate("/profile")}
              >
                {user.name}
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              ورود
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
