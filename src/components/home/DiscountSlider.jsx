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
    <div className="w-full mt-10  h-full
       bg-gradient-to-r from-pink-500 to-red-500
       rounded-lg
    ">
      <h2 className="text-white font-bold mb-4 text-2xl p-2">🔥 محصولات دارای تخفیف</h2>

      <div className="overflow-x-auto mx-4  flex gap-8 pb-3">
        {products.map((p) => (
          <div key={p.id} className="min-w-[180px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}