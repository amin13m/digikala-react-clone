import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ProductAPI } from "../api/api";

export default function SimilarProducts({ category, currentProductId }) {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    if (!category) return;

    (async () => {
      try {
        const res = await ProductAPI.getByCategory(category);
        const filtered = res.data.filter(p => p.id !== currentProductId);
        setProducts(filtered);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [category, currentProductId]);

  // Drag Scroll (مانند دیجی‌کالا)
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => (isDown.current = false);
  const handleMouseUp = () => (isDown.current = false);

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  if (!products.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold mb-3">محصولات مشابه</h2>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar cursor-grab py-3 select-none"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {products.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="min-w-[170px] w-full bg-white border rounded-lg p-3 flex flex-col items-center shadow-sm hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-contain"
            />
            <h3 className="text-sm mt-2 line-clamp-2 text-center">{item.name}</h3>
            <p className="text-red-500 mt-2 font-semibold text-sm">
              {item.price.toLocaleString()} تومان
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}