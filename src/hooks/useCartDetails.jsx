import React from "react";
import { useEffect, useState } from "react";
import { ProductAPI } from "../api/api";
import { useCart } from "../context/CartContext";

export const useCartDetails = () => {
  const { items, loading } = useCart();
  const [cartDetails, setCartDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      if (loading) return;

      if (items.length === 0) {
        setCartDetails([]);
        setIsLoading(false);
        return;
      }

      try {
        const res = await ProductAPI.getAll();
        const products = res.data;

        const detailed = items.map(cartItem => {
          const product = products.find(p => p.id === cartItem.productId);

          return {
            ...product,
            quantity: cartItem.quantity,
            subtotal: product.price * cartItem.quantity,
          };
        });

        setCartDetails(detailed);
      } catch (err) {
        console.error("Error loading product details:", err);
      }

      setIsLoading(false);
    };

    loadDetails();
  }, [items, loading]);

  return { cartDetails, isLoading };
};