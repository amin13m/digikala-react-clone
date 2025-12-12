import React, { useEffect, useMemo, useState } from "react";
import { ProductAPI } from "../../api/api";
import { getDiscountedPrice } from "../../utils/price";
import ProductCard from "../product/ProductCard";

function DiscountSlider() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    ProductAPI.getAll()
      .then((res) =>setProducts(res.data));
  }, []);

  const discounted = useMemo(() =>{ 
    return products.filter((p) => p.discount > 0)
  }, [products]);


  return (
    <div className="w-full mt-10  h-full p-1.5
       bg-linear-to-r from-pink-700 to-red-700
       dark:bg-linear-to-r dark:from-blue-900 dark:to-green-300
       rounded-2xl
    ">
      <h2 className="text-white font-bold mb-2 text-2xl p-2  z-30">🔥 محصولات دارای تخفیف</h2>

      <div className="overflow-x-auto overflow-y-visible mx-4 z-30  flex gap-4 pb-3">
        {discounted.map((p) => (
          <div key={p.id} className="min-w-[180px] z-40">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}



export default React.memo(DiscountSlider);