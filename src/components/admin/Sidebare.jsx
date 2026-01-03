import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebare({ open, setOpen }) {
  let toggleOpen = () => {
    setOpen((pre) => (pre == true ? false : true));
  };

  return (
    <div className="position-relative">
      <aside className="w-64 min-w-64 bg-gray-900 text-white p-4 hidden md:block h-full">
        <h2 className="font-bold mb-4">Admin Panel</h2>
        <NavLink to="/admin/products">Products</NavLink>
        <br />
        <NavLink to="/admin/logs">admin logs</NavLink>
        <br />
        <NavLink to="/admin/super-admin-logs">super admin logs</NavLink>
        <br />
        <NavLink to="/admin/orders-logs">
            orders logs
        </NavLink>
      </aside>

      <button
        onClick={() => toggleOpen()}
        className="md:hidden position-absolute z-50 m-2 rounded-full border-gray-200 bg-gray-500 w-8 h-8 leading-4 text-center text-gray-200"
      >
        {">"}
      </button>

      <div
        className={`fixed md:hidden top-16 left-0 h-full w-40 bg-gray-900 text-white p-2
            transform transition-transform duration-300 ease-in-out
            z-50
            ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
        <button
          onClick={() => toggleOpen()}
          className="md:hidden top-0 b-0 z-50 p-2 rounded-full border-gray-200 bg-gray-500 w-8 h-8 leading-4 text-center text-gray-200"
        >
          {"<"}
        </button>

        <h2 className="font-bold mb-4">Admin Panel</h2>
        <NavLink to="/admin/products" onClick={() => toggleOpen()}>
          Products
        </NavLink>
        <br />
        <NavLink to="/admin/logs" onClick={() => toggleOpen()}>
          admin logs
        </NavLink>
        <br />
        <NavLink to="/admin/super-admin-logs" onClick={() => toggleOpen()}>
          super admin logs
        </NavLink>
        <br />
        <NavLink to="/admin/orders-logs" onClick={() => toggleOpen()}>
            orders logs
        </NavLink>
      </div>
    </div>
  );
}
