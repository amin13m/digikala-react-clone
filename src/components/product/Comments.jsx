import React, { useEffect, useState } from "react";
import { CommentAPI, OrderAPI } from "../../api/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import CommentList from "./CommentList.jsx";

export default function Comments({ productId }) {
    const { user } = useAuth();

    const [comments, setComments] = useState([]);
    const [canComment, setCanComment] = useState(false);

    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");

    useEffect(() => {
        fetchComments();
        checkUserPurchase();
    }, [productId, user]);

    // دریافت کامنت‌ها
    const fetchComments = async () => {
        const res = await CommentAPI.getByProduct(productId);
        setComments(res.data.reverse());
    };

    // بررسی خرید محصول توسط کاربر
    const checkUserPurchase = async () => {
        if (!user) return;

        const res = await OrderAPI.getAll();
        const orders = res.data.filter(o => o.userId === user.id);

        let hasBought = false;

        orders.forEach(order => {
            order.items.forEach(item => {
                if (String(item.productId) === String(productId)) {
                    hasBought = true;
                }
            });
        });

        setCanComment(hasBought);
    };

    // ارسال کامنت
    const submitComment = async () => {
        if (text.trim() === "") return;

        const newComment = {
            productId,
            userId: user.id,
            username: user.name,
            rating,
            text,
            date: new Date().toLocaleString()
        };

        await CommentAPI.create(newComment);
        setText("");
        fetchComments();
        alert("نظر شما ثبت شد ✔");
    };

 

    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl mt-10">
            <h2 className="text-xl font-bold mb-3 dark:text-white">نظرات کاربران</h2>

            {/* فرم ثبت نظر */}
            {user && canComment ? (
                <div className="border dark:border-gray-600 p-4 rounded-xl mb-5">
                    <h3 className="font-semibold dark:text-white mb-2">ثبت نظر شما</h3>

                    <label className="text-sm dark:text-gray-200">امتیاز:</label>
                    <select
                        className="p-2 border rounded-md dark:bg-gray-700 dark:text-white ml-2"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    >
                        {[5, 4, 3, 2, 1].map(r => (
                            <option key={r} value={r}>{r} ⭐</option>
                        ))}
                    </select>

                    <textarea
                        className="w-full mt-3 p-3 border dark:bg-gray-700 dark:text-white rounded-lg"
                        rows="3"
                        placeholder="نظر خود را بنویسید..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <button
                        onClick={submitComment}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3  active:scale-95"
                        disabled={text.trim() === ""}
                    >
                        ثبت نظر
                    </button>
                </div>
            ) : user ? (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    برای ثبت نظر باید این محصول را خریده باشید.
                </p>
            ) : (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    برای ثبت نظر ابتدا وارد شوید.
                </p>
            )}

            <hr className="my-5 dark:border-gray-700" />

            {/* نمایش کامنت‌ها */}
            {comments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-300">هنوز نظری ثبت نشده.</p>
                ) : (
                comments.map(c => (
                    <CommentList key={c.id} c={c} />
                ))
            )}
        </div>
    );
}