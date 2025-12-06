import React from "react";
import { useCart } from "../../context/CartContext";
import { usePayment } from "../../context/PaymentContext";
import { getDiscountedPrice } from "../../utils/price";
export default function Checkout() {
  const { items: cart } = useCart();
  const { makePayment } = usePayment();

  const handlePay = async () => {
    const result = await makePayment(cart);
    alert(result.msg);
  };

  const totalPrice = () => {
    return cart.reduce((sum, item) => {
      const priceAfterDiscount = getDiscountedPrice(item.price, item.discount);
      return sum + priceAfterDiscount * item.quantity;
    }, 0);
  };

  {
    console.log(totalPrice());
  }
  return (
    <div className="p-4 max-w-2xl mx-auto">
      {!cart && (
        <h1 className="text-2xl font-bold mb-4">سبد خرید شما خالی است</h1>
      )}
      {cart && (
        <>
          <h2 className="text-xl font-bold mb-4">تایید و پرداخت</h2>

          <div className="mb-4 border rounded p-3">
            {cart.length === 0 ? (
              <p>سبد خرید شما خالی است</p>
            ) : (
              cart.map((item) => (
                <div key={item.productId} className="flex justify-between py-1">
                  <span>{item.name} </span>
                  <span>({item.quantity}عدد)</span>
                  <span>
                    {item.count} ×{" "}
                    {getDiscountedPrice(
                      item.price,
                      item.discount
                    ).toLocaleString()}{" "}
                    تومان
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="text-right mb-4">
            <strong>جمع کل: {totalPrice().toLocaleString()} تومان</strong>
          </div>
          <button
            onClick={handlePay}
            disabled={cart.length === 0}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            پرداخت نهایی
          </button>
        </>
      )}
    </div>
  );
}
