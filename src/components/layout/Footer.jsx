
import React from 'react'
import { Link } from "react-router-dom";
import { FaInstagram, FaTelegramPlane, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Logo + Description */}
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-10">
          <div className="flex flex-col gap-3 max-w-md">
            <h2 className="text-2xl font-bold text-red-600">دیجی کلون</h2>
            <p className="text-sm text-gray-600 leading-6">
              خرید اینترنتی مطمئن، سریع و ارزان.  
              هزاران کالا در دسته‌بندی‌های مختلف با بهترین قیمت.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-gray-700 text-2xl">
            <FaInstagram className="hover:text-red-600 cursor-pointer" />
            <FaTelegramPlane className="hover:text-red-600 cursor-pointer" />
            <FaTwitter className="hover:text-red-600 cursor-pointer" />
            <FaYoutube className="hover:text-red-600 cursor-pointer" />
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm">

          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-2">خدمات مشتریان</h3>
            <Link to="/" className="hover:text-red-600">پرسش‌های متداول</Link>
            <Link to="/" className="hover:text-red-600">رویه‌های بازگرداندن کالا</Link>
            <Link to="/" className="hover:text-red-600">شرایط استفاده</Link>
            <Link to="/" className="hover:text-red-600">حریم خصوصی</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-2">راهنمای خرید</h3>
            <Link to="/" className="hover:text-red-600">نحوه ثبت سفارش</Link>
            <Link to="/" className="hover:text-red-600">روش‌های ارسال</Link>
            <Link to="/" className="hover:text-red-600">شیوه‌های پرداخت</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-2">درباره ما</h3>
            <Link to="/" className="hover:text-red-600">تماس با ما</Link>
            <Link to="/" className="hover:text-red-600">همکاری با ما</Link>
            <Link to="/" className="hover:text-red-600">فرصت‌های شغلی</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold mb-2">اپلیکیشن</h3>
            <button className="bg-black text-white py-2 rounded-lg">دانلود نسخه اندروید</button>
            <button className="bg-black text-white py-2 rounded-lg">دانلود نسخه iOS</button>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t mt-10 pt-5 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} تمام حقوق این سایت محفوظ است.
        </div>
      </div>
    </footer>
  );
}