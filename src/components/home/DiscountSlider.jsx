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
    <div className="w-full mt-4 sm:mt-7  h-full p-1.5
       bg-linear-to-r from-pink-700 to-red-700
       dark:bg-linear-to-r dark:to-blue-900 dark:from-green-300
       rounded-2xl
       md:flex md:flex-row md:items-center
       z-30
    ">
      <h2 className="text-white font-bold mb-2 text-xl p-1 sm:p-2  z-30
       md:text-2xl md:mb-0 md:ml-4 md:border-l-4 md:border-white md:pl-4 md:text-center
      ">
         محصولات  <br className="hidden md:block" />
          دارای  <br className="hidden md:block" />
          تخفیف <br className="hidden md:block" /><br className="hidden md:block" />
          <div className="rotate-270 reverse text-4xl hidden md:block scale-y-120">{'%)'}</div>
      </h2>

      <div className="overflow-x-auto overflow-y-visible mx-1 sm:mx-4 z-30 flex gap-1 sm:gap-4 pb-1 sm:pb-3">
        {discounted.map((p) => (
          <div key={p.id} className=" min-w-[150px] sm:min-w-[180px] z-40">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}



export default React.memo(DiscountSlider);