import React, { useEffect, useState, useCallback } from "react";
import { ProductAPI, AdminLogAPI } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import ProductRow from "./ProductRow";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const res = await ProductAPI.getAll();
    setProducts(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const updateProduct = async (product, updates) => {
    const before = {
      price: product.price,
      discount: product.discount,
      stock: product.stock,
    };

    const updatedProduct = { ...product, ...updates , updatedAt: new Date().toLocaleString() };

    await ProductAPI.update(product.id, updatedProduct);

    await AdminLogAPI.create({
      adminId: user.id,
      action: "UPDATE_PRODUCT",
      productId: product.id,
      before,
      after: updates,
      date: new Date().toLocaleString(),
    });

    loadProducts();
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Product Management</h1>
        <Link
          to="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-2">Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <ProductRow
                key={p.id}
                product={p}
                onSave={updateProduct}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}