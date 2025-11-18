
import React from "react";
import { useCart } from "../../context/CartContext";

export default function CartItemCard({ item }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border mb-3">
      
      {/* تصویر */}
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-20 h-20 rounded-lg object-cover pr-2"
      />

      {/* اطلاعات */}
      <div className="flex-1 pr-4">
        <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
        <p className="text-gray-500 text-xs mt-1">{item.price.toLocaleString()} تومان</p>

        {/* مقدار */}
        <div className="flex items-center mt-3">
          <button
            onClick={() =>item.quantity!==1? updateQty(item.id, item.quantity - 1):()=>{}}
            className="px-2 py-1 border rounded-md"
          >
            -
          </button>

          <span className="px-4 text-sm">{item.quantity}</span>

          <button
            onClick={() => updateQty(item.id, item.quantity + 1)}
            className="px-2 py-1 border rounded-md"
          >
            +
          </button>
        </div>
      </div>

      {/* دکمه حذف */}
      <button 
        onClick={() => removeItem(item.id)}
        className="text-red-500 text-sm ml-4"
      >
        حذف
      </button>
    </div>
  );
}