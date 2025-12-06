
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { OrderAPI } from "../api/api.js";
import { getDiscountedPrice } from "../utils/price.js";

export default function Orders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            OrderAPI.getByUser(user.id)
                .then(res => setOrders(res.data))
                .finally(() => setLoading(false));
        }
    }, [user]);

    if (!user) {
        return (
            <div className="p-4 text-center dark:text-white">
                لطفا ابتدا وارد حساب خود شوید.
            </div>
        );
    }

    if (loading) {
        return (
            <div className="p-4 text-center dark:text-white">
                در حال بارگذاری سوابق خرید...
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="p-4 text-center dark:text-white">
                هنوز هیچ خریدی ثبت نکرده‌اید.
            </div>
        );
    }

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">سوابق خرید</h2>
            <div className="space-y-4">
                {orders.map(order => (
                    <div
                        key={order.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4 transition-colors"
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                            <span className="font-semibold dark:text-gray-300">
                                سفارش_#({order.id})
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                                تاریخ: {order.date}
                            </span>
                        </div>
                        <div className="text-gray-700 dark:text-gray-200 mb-2">
                            جمع کل: {order.total.toLocaleString()} تومان
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-300  dark:bg-gray-700">
                                        <th className="px-3 py-1 text-sm  dark:text-gray-200">محصول</th>
                                        <th className="px-3 py-1 text-sm dark:text-gray-200">تعداد</th>
                                        <th className="px-3 py-1 text-sm dark:text-gray-200">قیمت</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item, index) => (
                                        <tr key={index} className="border-b border-2 border-gray-200 dark:border-gray-700">
                                            <td className="px-3 py-1 text-sm dark:text-gray-200">
                                                {item.name}
                                            </td>
                                            <td className="px-3 py-1 text-sm dark:text-gray-200">{item.quantity}</td>
                                            <td className="px-3 py-1 text-sm dark:text-gray-200">
                                                {(getDiscountedPrice(item.price, item.discount)).toLocaleString()} تومان

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}