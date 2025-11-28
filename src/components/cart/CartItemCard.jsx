import React from "react";
import { useCart } from "../../context/CartContext";
import { getDiscountedPrice } from "../../utils/price";

export default function CartItemCard({ item }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border mb-3 dark:bg-gray-900 dark:text-white dark:border-gray-800">
      {/* تصویر */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 rounded-lg object-cover pr-2"
      />

      {/* اطلاعات */}
      <div className="flex-1 pr-4">
        <h3 className="font-semibold text-gray-800 text-sm dark:text-gray-300">{item.name}</h3>
        {item.discount > 0 ? (
          <div className="mt-2">
            <span className="text-red-600 font-bold text-sm">
              {getDiscountedPrice(
                item.price,
                item.discount
              ).toLocaleString()}{" "}
              تومان
            </span>
            <div className="flex items-center gap-2">
              <span className="line-through text-gray-400 text-xs">
                {item.price.toLocaleString()}
              </span>
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                %{item.discount}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 font-bold  mt-2 text-sm dark:text-white">
            {item.price.toLocaleString()} تومان
          </p>
        )}

        {/* مقدار */}
        <div className="flex items-center mt-3">
          <button
            onClick={() =>
              item.quantity !== 1
                ? updateQty(item.id, item.quantity - 1)
                : () => {}
            }
            className="px-2 py-0  border rounded-md active:bg-red-500 active:text-white active:scale-95"
          >
            -
          </button>

          <span className="px-4 text-sm">{item.quantity}</span>

          <button
            onClick={() =>
              item.quantity !== item.stock
                ? updateQty(item.id, item.quantity + 1)
                : () => {}
            }
            className="px-2 py-0 border rounded-md active:bg-green-500 active:text-white active:scale-95"
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
