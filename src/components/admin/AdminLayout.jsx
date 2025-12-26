import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div
      dir="ltr"
      className="flex min-h-screen"
    >
      <aside className="w-64 min-w-64 bg-gray-900 text-white p-4 hidden md:block">
        <h2 className="font-bold mb-4">Admin Panel</h2>
        <NavLink to="/admin/products">Products</NavLink><br />
        <NavLink to="/admin/logs">admin logs</NavLink><br />
        <NavLink to="/admin/super-admin-logs">super admin logs</NavLink>
      </aside>

      <main className="flex-1 p-4 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
}