import React, { useState, memo } from "react";

function ProductRow({ product, onSave }) {
  const [price, setPrice] = useState(product.price);
  const [discount, setDiscount] = useState(product.discount);
  const [stock, setStock] = useState(product.stock);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(product, {
      price: Number(price),
      discount: Number(discount),
      stock: Number(stock),
    });
    setSaving(false);
  };

  return (
    <tr className="border-t dark:border-gray-700">
      <td className="p-2">(#{product.id})-{product.name}</td>

      <td dir="ltr">
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-24 border rounded px-1"
        />
      </td>

      <td dir="ltr">
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="w-16 border rounded px-1"
        />
      </td>

      <td dir="ltr">
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-16 border rounded px-1"
        />
      </td>

      <td dir="ltr">
        <button
          disabled={saving}
          onClick={handleSave}
          className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Save
        </button>
      </td>
    </tr>
  );
}

export default memo(ProductRow);