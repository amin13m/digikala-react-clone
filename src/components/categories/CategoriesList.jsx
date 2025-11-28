
import React, { useEffect, useState } from "react";
import { CategoryAPI } from "../../api/api";
import { Link } from "react-router-dom";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await CategoryAPI.getAll();
        setCategories(res.data);
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  if (loading) return <p className="text-center py-10">در حال بارگذاری...</p>;

  return (
    <div className="relative group">
      <h2 className="px-3 pt-1 cursor-pointer rounded hover:bg-gray-100 transition dark:hover:bg-gray-800">دسته‌بندی‌ها:</h2>

      <div className="p-1 md:pl-1 pl-4 md:absolute top-full left-0  block md:hidden md:group-hover:block bg-white dark:bg-gray-900 shadow-lg md:border mt-0 rounded w-48
       
      ">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="text-gray-700 "
          >
            <p className="font-medium hover:shadow-lg shadow-gray-300 hover:text-red-500 dark:border-gray-800 dark:text-gray-200 dark:hover:text-white">{cat.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
