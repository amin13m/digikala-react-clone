import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductAPI, CategoryAPI } from "../api/api";
import { useCart } from "../context/CartContext";
import SimilarProducts from "../components/SimilarProducts";
import { getDiscountedPrice } from "../utils/price";

export default function Product() {
  const { id } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ---- Load Product ----
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await ProductAPI.getById(id);
        setProduct(res.data);

        const cat = await CategoryAPI.getById(res.data.categoryId);
        setCategory(cat.data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ----- Loading UI -----
  if (loading) {
    return <p className="text-center mt-10">در حال بارگذاری...</p>;
  }

  // ----- Not Found -----
  if (error || !product) {
    return <p className="text-center mt-10 text-red-500">محصول یافت نشد.</p>;
  }

  // ----- Page UI -----
  return (
    <div >
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className=" rounded-lg shadow max-h-70"
          />
        </div>

        {/* Product Content */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <p className="text-gray-500 text-sm">
            دسته‌بندی:
            <span className="font-semibold"> {category?.name}</span>
          </p>

          <p className="text-lg leading-7 text-gray-700">
            {product.description}
          </p>

          <div>


            {product.discount > 0 ? (
              <div className="mt-2">
                <span className="text-red-600 font-bold text-2xl">
                  {getDiscountedPrice(product.price, product.discount).toLocaleString()} تومان
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
  
              <p className="text-gray-700 font-bold text-2xl mt-2">
                {product.price.toLocaleString()} تومان
              </p>
            )}


            <p className="text-green-600 text-sm mt-1">
              موجودی: {product.stock} عدد
            </p>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() =>
              addItem({
                id: product.id,
                price: product.price,
                name: product.name,
                quantity: 1,
                image: product.image,
              })
            }
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-lg mt-4 active:scale-95 active:bg-red-600"
          >
            افزودن به سبد خرید
          </button>
        </div>
      </div>
      <SimilarProducts
        category={product.categoryId}
        currentProductId={product.id}
      />
    </div>
  );
}
