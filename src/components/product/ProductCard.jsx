
import React from "react";
import { getDiscountedPrice } from "../../utils/price";
import { useNavigate } from "react-router-dom";


export default  React.memo( function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      id={product.id}
      className="bg-gray-200 rounded-lg shadow p-3  hover:shadow-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out 
      h-60 sm:h-full min-w-[150px] max-w-[190px] sm:min-w-[180px] sm:max-w-[270px]
      z-40
      dark:bg-gray-900 dark:text-white dark:border-gray-800  dark:hover:text-white"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <span className="flex justify-center">
         <img
        src={product.image}
        className="h-24 sm:h-32 md:h-38 w-auto object-cover rounded mb-2"
      />
      </span>
     
      <h3 className="text-sm font-semibold max-h-15 sm:max-h-full overflow-hidden">{product.name}</h3>
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
,areEqual)


function areEqual(prevProps, nextProps) {
  return prevProps.product.id === nextProps.product.id &&
         prevProps.product.price === nextProps.product.price &&
         prevProps.product.discount === nextProps.product.discount;
}
