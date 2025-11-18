import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import CategoriesList from "../categories/CategoriesList";
import SearchBox from "../searchBox";

export default function Header() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="hidden md:block md:sticky  bg-white shadow-md  top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* لوگو */}
        <Link to="/" className="text-2xl font-bold text-red-600">
          DigiClone
        </Link>

        {/* جستجو */}
        <SearchBox/>

        {/* منو و آیکون‌ها */}
        <div className="flex items-center space-x-4">

          {/* دسته‌بندی‌ها ساده */}
         
          <CategoriesList/>

          {/* سبد خرید */}
          <button
            onClick={() => navigate("/cart")}
            className="relative px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* کاربر */}
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">{user.name}</span>
              <button
                onClick={() => logout()}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                خروج
              </button>
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