import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ProductAPI } from "../../api/api";
import ProductCard from "./ProductCard";

export default function SimilarProducts({ category, currentProductId }) {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    if (!category) return;

    (async () => {
      try {
        const res = await ProductAPI.getByCategory(category);
        const filtered = res.data.filter((p) => p.id !== currentProductId);
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
    <div className="mt-0 w-full  h-full p-1.5">
      <h2 className="text-lg font-bold mb-3">محصولات مشابه</h2>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar cursor-grab py-3 select-none min-h-[250px] md:h-[300px]"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
