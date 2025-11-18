import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductAPI, CategoryAPI } from "../api/api";

export default function Category() {
  const { id } = useParams(); // categoryId
  const [category, setCategory] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const navigate = useNavigate()
  const [sortType, setSortType] = useState("none");
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(true);

  // ------------------ Load Category Info ------------------
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await CategoryAPI.getById(id);
        setCategory(res.data);
      } catch (err) {
        console.log("Category fetch error:", err);
      }
    };
    fetchCategory();
  }, [id]);

  // ------------------ Load Products ------------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductAPI.getAll();
        const filtered = res.data.filter((p) => p.categoryId == id);

        setAllProducts(filtered);
        setVisibleProducts(filtered.slice(0, limit));
        setLoading(false);
      } catch (err) {
        console.log("Products fetch error:", err);
      }
    };

    fetchProducts();
  }, [id, limit]);

  // ------------------ Sort Handler ------------------
  const handleSort = (value) => {
    setSortType(value);

    let sorted = [...allProducts];

    if (value === "cheapest") {
      sorted.sort((a, b) => a.price - b.price);
    }
    if (value === "expensive") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setVisibleProducts(sorted.slice(0, limit));
  };

  // ------------------ Load More ------------------
  const loadMore = () => {
    setLimit((prev) => prev + 8);
  };

  // ----------------------------------------------------
  if (loading) return <p className="text-center mt-10">در حال بارگذاری...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">

      {/* Header */}
      <h1 className="text-xl font-bold mb-4">
        محصولات دسته: {category?.name}
      </h1>

      {/* Sort Options */}
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2 rounded bg-white"
          value={sortType}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="none">بدون مرتب‌سازی</option>
          <option value="cheapest">ارزان‌ترین</option>
          <option value="expensive">گران‌ترین</option>
        </select>
      </div>

      {/* Products Grid */}
      {visibleProducts.length === 0 ? (
        <p>هیچ محصولی در این دسته وجود ندارد.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {visibleProducts.map((p) => (
            <div onClick={()=>{navigate(`/product/${p.id}`)}}
              key={p.id}
              className="border rounded-lg p-3 shadow-sm hover:shadow-lg cursor-pointer bg-white"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover rounded"
              />

              <h3 className="mt-3 font-semibold text-sm">{p.name}</h3>

              <p className="text-red-600 font-bold mt-2 text-sm">
                {p.price.toLocaleString()} تومان
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {visibleProducts.length < allProducts.length && (
        <div className="text-center my-6">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={loadMore}
          >
            نمایش بیشتر
          </button>
        </div>
      )}
    </div>
  );
}