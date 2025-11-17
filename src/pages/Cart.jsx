import React from "react";
import { useCartDetails } from "../hooks/useCartDetails";
import CartItemCard from "../components/cart/CartItemCard";

export default function Cart() {
  const { cartDetails, isLoading } = useCartDetails();

  if (isLoading) return <p>در حال بارگذاری...</p>;

  const total = cartDetails.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* لیست محصولات */}
      <div className="md:col-span-2">
        <h2 className="text-xl font-bold mb-3">سبد خرید</h2>

        {cartDetails.length === 0 ? (
          <p className="text-gray-500">سبد خرید شما خالی است.</p>
        ) : (
          cartDetails.map(item => <CartItemCard key={item.id} item={item} />)
        )}
      </div>

      {/* فاکتور خرید */}
      <div className="bg-white rounded-xl shadow-sm border p-4 h-fit">
        <h3 className="font-semibold text-gray-700 text-lg">خلاصه خرید</h3>

        <div className="flex justify-between mt-4 text-sm">
          <span>جمع کل:</span>
          <span>{total.toLocaleString()} تومان</span>
        </div>

        <button className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition">
          ادامه فرآیند خرید
        </button>
      </div>

    </div>
  );
}