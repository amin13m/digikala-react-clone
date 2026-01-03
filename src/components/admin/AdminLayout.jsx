import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Sidebare from "./sidebare";

export default function AdminLayout() {
    const [open ,setOpen] = useState(false)


  return (
    <div
      dir="ltr"
      className="md:flex min-h-screen"
    >
      <Sidebare open={open} setOpen={setOpen}/>
      
      <main className="md:flex-1 p-4 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
}