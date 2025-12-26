import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import CategoriesList from "../categories/CategoriesList";
import SearchBox from "../home/SearchBox";
import { useTheme } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function HeaderMobile() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className="md:hidden  bg-white shadow-md  top-0 z-50
      dark:bg-gray-900 dark:text-white dark:border-gray-800 dark:hover:bg-gray-800"
    >
      <div className="flex items-center justify-between p-4">
        {/* لوگو */}
        <Link to="/" className="text-xl font-bold text-red-600 min-w-[100px] ">
          {/* دیجی شاپ */} DigiShop 
        </Link>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 "
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        <div>
          {/* سبد خرید */}
          <button
            onClick={() => navigate("/cart")}
            className=" relative text-gray-700 ml-3"
          >
            🛒
            {cartCount > 0 && (
              <span className=" absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* دکمه منوی همبرگر */}
          <button
            className="px-3 md:hidden text-gray-700  dark:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      {menuOpen && (
        <div className="bg-white border-t shadow-md md:hidden    dark:bg-gray-900 dark:text-white dark:border-gray-800 absolute w-full left-0 z-51">
          {/* جستجو */}
          <SearchBox />

          {/* لینک‌ها */}
          <nav
            className="flex flex-col space-y-2 p-4"
            onClick={() => setMenuOpen(false)}
          >
            <Link
              to="/"
              className="px-3 py-0 rounded hover:bg-gray-100 transition    dark:bg-gray-900 dark:text-white dark:border-gray-800 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              خانه
            </Link>

            <CategoriesList />

           
            {user ? (
              <>
                <span className="px-3 py-2 text-gray-700 min-w-content rounded w-fil text-center border 
                dark:bg-gray-900 dark:text-white dark:border-gray-800 "
                onClick={()=>navigate("/profile")}
                >
                  {user.name}
                </span>


                
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
