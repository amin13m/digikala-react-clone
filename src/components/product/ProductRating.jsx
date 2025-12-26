import React, { useEffect, useMemo, useState } from "react";
import { CommentAPI } from "../../api/api.js";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ProductRating({ productId }) {
    const [comments, setComments] = useState([]);

    // ۱) فقط بارگیری
    useEffect(() => {
        (async () => {
            const res = await CommentAPI.getByProduct(productId);
            setComments(res.data);
        })();
    }, [productId]);

    // ۲) گرفتن آخرین کامنت هر کاربر
    const latestComments = useMemo(() => {
        const map = {};
        comments.forEach((c) => {
            if (!map[c.userId] || new Date(c.date) > new Date(map[c.userId].date)) {
                map[c.userId] = c;
            }
        });
        return Object.values(map);
    }, [comments]);

    // ۳) محاسبه میانگین
    const average = useMemo(() => {
        if (latestComments.length === 0) return 0;
        const total = latestComments.reduce((sum, c) => sum + Number(c.rating), 0);
        return total / latestComments.length;
    }, [latestComments]);

    // ۴) رندر ستاره‌ها
    const renderStars = () => {
        const stars = [];
        let temp = average;

        for (let i = 0; i < 5; i++) {
            if (temp >= 1) stars.push(<FaStar key={i} className="text-yellow-400 text-lg" />);
            else if (temp >= 0.5) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-lg scale-x-[-1]" />);
            else stars.push(<FaRegStar key={i} className="text-yellow-400 text-lg" />);
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
                ({latestComments.length} نفر)
            </span>
        </div>
    );
}