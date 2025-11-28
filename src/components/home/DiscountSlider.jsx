import React, { useEffect, useState } from "react";
import { ProductAPI } from "../../api/api";
import { getDiscountedPrice } from "../../utils/price";
import ProductCard from "../product/ProductCard";

export default function DiscountSlider() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductAPI.getAll().then((res) => {
      const discounted = res.data.filter((p) => p.discount > 0);
      setProducts(discounted);
    });
  }, []);

  return (
    <div className="w-full mt-10  h-full p-1.5
       bg-gradient-to-r from-pink-700 to-red-700
       dark:bg-gradient-to-r dark:from-blue-900 dark:to-green-300
       rounded-2xl
    ">
      <h2 className="text-white font-bold mb-2 text-2xl p-2  z-30">🔥 محصولات دارای تخفیف</h2>

      <div className="overflow-x-auto overflow-y-visible mx-4 z-30  flex gap-4 pb-3">
        {products.map((p) => (
          <div key={p.id} className="min-w-[180px] z-40">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}