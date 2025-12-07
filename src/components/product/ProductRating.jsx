import React, { useEffect, useState } from "react";
import { CommentAPI } from "../../api/api.js";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ProductRating({ productId }) {
    const [average, setAverage] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        loadRating();
    }, [productId]);

    const loadRating = async () => {
        const res = await CommentAPI.getByProduct(productId);
        const comments = res.data;

        if (comments.length === 0) {
            setAverage(0);
            setCount(0);
            return;
        }

        // ---- فقط آخرین کامنت هر کاربر ----
        const latestComments = {};

        comments.forEach((comment) => {
            const userId = comment.userId;

            // اگر قبلاً کامنتی از این کاربر ثبت شده ولی این یکی جدیدتر است → جایگزین شود
            if (!latestComments[userId] || new Date(comment.date) > new Date(latestComments[userId].date)) {
                latestComments[userId] = comment;
            }
        });

        const filtered = Object.values(latestComments);

        // محاسبه میانگین امتیاز
        const total = filtered.reduce((sum, c) => sum + Number(c.rating), 0);
        const avg = total / filtered.length;

        setAverage(avg);
        setCount(filtered.length);
    };

    const renderStars = () => {
        const stars = [];
        let temp = average;

        for (let i = 0; i < 5; i++) {
            if (temp >= 1) {
                stars.push(<FaStar key={i} className="text-yellow-400 text-lg" />);
            } else if (temp >= 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-lg" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400 text-lg" />);
            }
            temp -= 1;
        }

        return stars;
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex">{renderStars()}</div>

            <span className="text-sm text-gray-700 dark:text-gray-300">
                {average.toFixed(1)} از ۵
            </span>

            <span className="text-xs text-gray-500 dark:text-gray-400">
                ({count} نفر)
            </span>
        </div>
    );
}