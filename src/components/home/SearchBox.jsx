import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import { FaSearch } from "react-icons/fa";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const { results, loading } = useSearch(query);

  return (
    <div
      className="relative w-full max-w-md mx-auto
    dark:bg-gray-900 dark:text-white dark:border-gray-800 dark:hover:bg-gray-800"
    >
      {/* Input */}
      <div
        className="flex items-center bg-gray-100  px-3 py-2 relative dark:hover:bg-opacity-0 
       dark:bg-gray-900 dark:text-white dark:border-gray-800 
       "
      >
        <FaSearch className="text-gray-400 text-sm absolute left-5" />
        <input
          type="text"
          placeholder="جستجو در کالاها..."
          className="bg-transparent outline-none pl-7 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 
          dark:bg-gray-900 dark:text-white dark:border-gray-800 dark:hover:bg-gray-800
                 dark:focus:bg-gradient-to-r from-blue-900 to-blue-600 dark:focus:ring-blue-300
          "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Results Box */}
      {query && (
        <div
          className="absolute top-12 w-full bg-white shadow-lg rounded-lg z-50 max-h-72 overflow-y-auto
         dark:bg-gray-900 dark:text-white dark:border-gray-800 dark:hover:bg-gray-800"
        >
          {loading && (
            <p className="p-3 text-center text-gray-500">در حال جستجو...</p>
          )}

          {!loading && results.length === 0 && (
            <p className="p-3 text-center text-gray-500">نتیجه‌ای یافت نشد</p>
          )}

          {!loading &&
            results.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="flex items-center p-3 hover:bg-gray-100 border-b
                dark:bg-gray-900 dark:text-white dark:border-gray-800 dark:hover:bg-gray-800"
                onClick={() => setQuery("")}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <span className="mr-3 text-sm">{item.name}</span>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
