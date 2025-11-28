

import React from "react";
import { getDiscountedPrice } from "../../utils/price";
import { useNavigate } from "react-router-dom";


export default function ProductCard({ product }) {
  const navigate = useNavigate();
  
  return (
    <div
      id={product.id}
      className="bg-gray-200 h-full rounded-lg shadow p-3 hover:shadow-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out min-w-[150px]
      
      dark:bg-gray-900 dark:text-white dark:border-gray-800  dark:hover:text-white"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <span className="flex justify-center">
         <img
        src={product.image}
        className="h-32 w-auto object-cover rounded mb-2"
      />
      </span>
     
      <h3 className="text-sm font-semibold">{product.name}</h3>
      {product.discount > 0 ? (
        <div className="mt-2">
          <span className="text-red-600 font-bold ">
            {getDiscountedPrice(
              product.price,
              product.discount
            ).toLocaleString()}{" "}
            تومان
          </span>
          <div className="flex items-center gap-2">
            <span className="line-through text-gray-400 text-xs">
              {product.price.toLocaleString()}
            </span>
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
              %{product.discount}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 font-bold  mt-2 dark:text-white">
          {product.price.toLocaleString()} تومان
        </p>
      )}
    </div>
  );
}
