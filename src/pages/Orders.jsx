
import React, { Suspense, useEffect, useState , lazy} from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { OrderAPI } from "../api/api.js";
import { getDiscountedPrice } from "../utils/price.js";
const OrderTables = lazy(() => import("../components/Orders/OrderTables.jsx"));

export default function Orders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            OrderAPI.getByUser(user.id)
                .then(res => setOrders(res.data.reverse()))
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
                {orders && 
                    <Suspense fallback={<div className="p-4 text-center dark:text-white">در حال بارگذاری سوابق خرید...</div>}>
                        <OrderTables orders={orders}/>
                    </Suspense>
                }
            </div>
        </div>
    );
}