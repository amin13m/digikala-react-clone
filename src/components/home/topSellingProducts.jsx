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
        <div className="w-full mt-4 sm:mt-7 h-full p-1.5
                        bg-linear-to-r from-yellow-600 to-orange-600
                        dark:bg-linear-to-r dark:to-gray-900 dark:from-blue-700
                        rounded-2xl
                        md:flex md:flex-row md:items-center
                        z-30
                        ">
            <h2 className="text-white font-bold mb-2 text-xl sm:text-2xl p-1 sm:p-2 z-30 
              md:text-center md:text-2xl md:mb-0 md:ml-4 md:border-l-4 md:border-white md:pl-4
            ">
                
                 پرفروش‌ <br className="hidden md:block" />
                 ترین <br className="hidden md:block" />
                 محصولات <br className="hidden md:block" /> <br className="hidden md:block" />
                 <div className=" text-4xl hidden md:block scale-y-120">🏆</div>
            </h2>
            <div className="overflow-x-auto overflow-y-visible mx-1 sm:mx-4 z-30 flex gap-1 sm:gap-4 pb-1 sm:pb-3">
                {topProducts.map((p) => (
                    <div key={p.id} className="min-w-[150px] sm:min-w-[180px] z-40">
                        <ProductCard product={p} className="z-40" />
                    </div>
                ))}
            </div>
        </div>
    );
}


export default React.memo(TopSellingSlider);