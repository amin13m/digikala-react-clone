import React, { useState } from "react";
import { AdminLogAPI, ProductAPI } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: 0,
    stock: "",
    categoryId: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const product = await ProductAPI.create({
      ...form,
      price: Number(form.price),
      discount: Number(form.discount),
      stock: Number(form.stock),
      createdBy: user.id,
      description: form.description || "",
      updatedAt: new Date().toLocaleString(),
    });

    await AdminLogAPI.create({
          adminId: user.id,
          action: "ADD_PRODUCT",
          productId: product.data.id,
          before: {},
          after: product.data ,
          date: new Date().toLocaleString(),
        });

    navigate("/admin/products");
  };

  return (
    <form
      onSubmit={submit}
      className="max-w-xl bg-white dark:bg-gray-900 p-4 rounded shadow"
    >
      <h2 className="text-lg font-bold mb-4">Add New Product</h2>

      {["name", "price", "discount", "stock", "categoryId", "image", "description"].map(
        (field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        )
      )}

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Product
      </button>
    </form>
  );
}