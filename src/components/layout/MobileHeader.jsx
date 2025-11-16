import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function HeaderMobile() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="md:hidden  bg-white shadow-md  top-0 z-50">
      <div className="flex items-center justify-between p-4">

        {/* لوگو */}
        <Link to="/" className="text-xl font-bold text-red-600">
          DigiClone
        </Link>

        {/* دکمه منوی همبرگر */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* سبد خرید */}
        <button
          onClick={() => navigate("/cart")}
          className="relative text-gray-700 ml-3"
        >
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* منوی موبایل */}
      {menuOpen && (
        <div className="bg-white border-t shadow-md md:hidden">
          
          {/* جستجو */}
          <div className="p-4">
            <input
              type="text"
              placeholder="جستجو در دیجی‌کالا"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* لینک‌ها */}
          <nav className="flex flex-col space-y-2 p-4">
            <Link
              to="/"
              className="px-3 py-2 rounded hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(false)}
            >
              خانه
            </Link>

            <Link
              to="/categories"
              className="px-3 py-2 rounded hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(false)}
            >
              دسته‌بندی‌ها
            </Link>

            {user ? (
              <>
                <span className="px-3 py-2 text-gray-700">{user.name}</span>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  خروج
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate("/auth/login");
                  setMenuOpen(false);
                }}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                ورود
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}