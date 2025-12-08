import React from 'react'
import { getDiscountedPrice } from '../../utils/price'

export default function OrderTables({orders}) {
    return (
        <div>
            {orders.map(order => (
                                <div
                                    key={order.id}
                                    className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow p-4 transition-colors"
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
                                        <table className="min-w-full text-left border-collapse border-b border-2 border-gray-300  dark:border-gray-700">
                                            <thead>
                                                <tr className="bg-gray-300  dark:bg-gray-700">
                                                    <th className="px-3 py-1 text-sm  dark:text-gray-200">محصول</th>
                                                    <th className="px-3 py-1 text-sm dark:text-gray-200">تعداد</th>
                                                    <th className="px-3 py-1 text-sm dark:text-gray-200">قیمت</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items.map((item, index) => (
                                                    <tr key={index} className="border-b border-2 border-gray-300  dark:border-gray-700">
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
    )
}
