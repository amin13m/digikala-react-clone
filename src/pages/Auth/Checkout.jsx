import React from "react";
import { useCart } from "../../context/CartContext";
import { usePayment } from "../../context/PaymentContext";
import { getDiscountedPrice } from "../../utils/price";
import { useAuth } from "../../context/AuthContext";
export default function Checkout() {
  const { items: cart } = useCart();
  const { makePayment } = usePayment();
  const {user}=useAuth();

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

  
  return (
    <div className="p-4 max-w-2xl mx-auto">
      {(!cart || !user) && (<>
        <h1 className="text-2xl font-bold mb-4 r-0">سبد خرید شما خالی است</h1>
        </>
      )}
      {(cart.length === 0 || !user) && (
        <>
          <h1 className="text-2xl font-bold mb-4 r-0">سبد خرید شما خالی است</h1>
        </>
      )}
      {(cart.length > 0 && user )&& (
        <>
          <h2 className="text-xl font-bold mb-4">تایید و پرداخت</h2>
          

          <div className="mb-4 border rounded p-3">

            {(
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
            <strong>جمع کل: {totalPrice().toLocaleString()} تومان</strong><br></br>
            <span className=" text-gray-500"><span>موجودی: </span>{user.wallet.toLocaleString() } تومان</span>
          </div>
          <button
            onClick={handlePay}
            disabled={cart.length === 0}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition  active:scale-95"
          >
            پرداخت نهایی
          </button>
        </>
      )}
    </div>
  );
}
