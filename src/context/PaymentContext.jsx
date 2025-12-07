import React from "react";
import { createContext, useContext } from "react";
import { UserAPI, OrderAPI, ProductAPI } from "../api/api.js";
import { useAuth } from "./AuthContext.jsx";
import { useCart } from "./CartContext.jsx";
import { getDiscountedPrice } from "../utils/price.js";

const PaymentContext = createContext();

export const PaymentProvider = ({children}) => {
    const { user, setUser } = useAuth();
    const { items:cartItems , clearCart } = useCart();

    
    //  تابع اصلی پرداخت
    
    const makePayment = async () => {
        if (!user) {
            return { success: false, msg: "ابتدا وارد حساب خود شوید." };
        }

        // 1) محاسبه مبلغ کل
        const totalPrice = cartItems.reduce((sum, item) => {  
            return sum + getDiscountedPrice(item.price, item.discount) * item.quantity;

        }, 0);

        // 2) چک موجودی کیف پول کاربر
        if (user.wallet < totalPrice) {
            return { success: false, msg: "موجودی کیف پول کافی نیست." };
        }

        // 3) ساخت سفارش جدید
        const newOrder = {
            userId: user.id,
            items: cartItems.map((i) => ({
                productId: i.productId,
                quantity: i.quantity,
                name: i.name,
                price: i.price,
                discount: i.discount ?? 0
            })),
            total: totalPrice,
            date: new Date().toLocaleString()
        };

        await OrderAPI.create(newOrder);

        //4) بروزرسانی تعداد کالا 
        
        for (const item of cartItems) {
            const product = (await ProductAPI.getById(item.productId)).data;
console.log(item.quantity , product.stock);
            if(product.stock < item.quantity) return {success: false, msg: "موجودی کالا کافی نیست."}

            const updatedItems={
                ...product,
                stock :product.stock - item.quantity
            }
            await ProductAPI.update(product.id,updatedItems);
        }

        // 5) کم کردن مبلغ از کیف پول
        
        const updatedUser = {
            ...user,
            wallet: user.wallet - totalPrice,
        };

    
        setUser(updatedUser);

        // 6) خالی کردن سبد خرید
        clearCart();

        return { success: true, msg: "پرداخت با موفقیت انجام شد ✔️" };
    };

    return (
        <PaymentContext.Provider value={{ makePayment }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => useContext(PaymentContext);