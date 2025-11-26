import React, { useEffect, useState } from "react";
import { ProductAPI } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDiscountedPrice } from "../utils/price";
import DiscountSlider from "../components/home/DiscountSlider";
import ProductCard from "../components/product/ProductCard";

export default function Home() {
  const navigate = useNavigate();

  const LIMIT = 4;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // -------- Load products --------
  const loadProducts = async () => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const res = await ProductAPI.getAll();
      const all = res.data;

      const start = (page - 1) * LIMIT;
      const end = start + LIMIT;

      const newItems = all.slice(start, end);

      if (newItems.length < LIMIT) {
        setHasMore(false);
      }

      setProducts((prev) => [...prev, ...newItems]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  // ----- Infinite Scroll -----
  useEffect(() => {
    if (loading) return; // جلوگیری از اسکرول تریگر اولیه

    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200;

      if (bottom && !loadingMore && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, loadingMore, hasMore]);

  if (loading && page === 1)
    return <p className="text-center mt-10">در حال بارگذاری...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      {/* Banner */}

      <div className="relative w-full h-60 md:h-96 rounded-xl overflow-hidden mb-8">
        <img
          src="https://via.placeholder.com/1200x400?text=Digikala+Banner"
          alt="بنر فروشگاه"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-4xl font-bold">
            خوش آمدید به DigiClone
          </h1>
        </div>
      </div>

      {/* Products */}

      <DiscountSlider/>

      <h2 className="text-xl font-bold mb-4">محصولات</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map( (product , i) => (

            <ProductCard key={i} product={product} />
        
        ))}
      </div>

      {loadingMore && (
        <p className="text-center my-6">در حال بارگذاری بیشتر...</p>
      )}

      {!hasMore && (
        <p className="text-center my-6 text-gray-500">همه محصولات لود شدند.</p>
      )}
    </div>
  );
}
