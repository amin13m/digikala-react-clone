import React, { useEffect, useMemo, useState } from "react";
import { OrderAPI, ProductAPI } from "../../api/api.js";
import ProductCard from "../product/ProductCard.jsx";

function TopSellingSlider() {
    const [products, setProducts] = useState([]);
    const[orders,setOrders]= useState([]);

    useEffect(() => {
        const fetchTopSelling = async () => {
            try {
                //  دریافت همه سفارشات
                const ordersRes = await OrderAPI.getAll()
                  .then((res) =>setOrders(res.data));

               
                //  دریافت همه محصولات
                const productsRes = await ProductAPI.getAll();
                const allProducts = productsRes.data;

                setProducts(allProducts);
                //  ترکیب تعداد فروش با اطلاعات کامل محصول
                

                
            } catch (err) {
                console.error(err);
            }
        };

        fetchTopSelling();
    }, []);


    const productSales =useMemo(()=>{
       //  محاسبه تعداد فروش هر محصول
                const productSales = {}; // { productId: soldCount }

                orders
                  .forEach(order => {
                    order.items.forEach(item => {
                        if (productSales[item.productId]) {
                            productSales[item.productId] += item.quantity;
                        } else {
                            productSales[item.productId] = item.quantity;
                        }
                    });
                });
                return productSales;

    },[orders]);

    const topProducts =useMemo(()=>{
      
      return   products
                    .map(p => ({
                        ...p,
                        soldCount: productSales[p.id] || 0
                    }))
                    .filter(p => p.soldCount > 0) // فقط محصولاتی که فروش دارند
                    .sort((a, b) => b.soldCount - a.soldCount) // مرتب بر اساس فروش
                    .slice(0, 10); // ۱۰ محصول برتر
    },[products]);



    if (topProducts.length === 0) return null;

    return (
        <div className="w-full mt-10 h-full p-1.5
                        bg-gradient-to-r from-yellow-600 to-orange-600
                        dark:bg-gradient-to-r dark:from-gray-900 dark:to-blue-700
                        rounded-2xl">
            <h2 className="text-white font-bold mb-2 text-2xl p-2 z-30">🔥 محصولات پرفروش</h2>
            <div className="overflow-x-auto overflow-y-visible mx-4 z-30 flex gap-4 pb-3">
                {topProducts.map((p) => (
                    <div key={p.id} className="min-w-[180px] z-40">
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        </div>
    );
}


export default React.memo(TopSellingSlider);