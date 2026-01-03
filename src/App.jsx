import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/Auth/login.jsx";
import Register from "./pages/Auth/Register.jsx";
import Logout from "./pages/Auth/logout.jsx";
import HeaderMobile from "./components/layout/MobileHeader.jsx";
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx";
import Category from "./pages/Category.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { PaymentProvider } from "./context/PaymentContext.jsx";
import Checkout from "./pages/Auth/Checkout.jsx";
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";
import Product from "./pages/Product.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";
import AddProduct from "./components/admin/AddProduct.jsx";
import AdminProducts from "./components/admin/AdminProducts.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminLogs from "./components/admin/AdminLogs.jsx";
import SuperAdminLogs from "./components/admin/SuperAdminLogs.jsx";
import OrdersLogs from "./components/admin/OrdersLogs.jsx";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <PaymentProvider>
              <Header />
              <HeaderMobile />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/logout" element={<Logout />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/category/:id" element={<Category />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="profile" element={<Profile />} />

                  <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route path="products" element={<AdminProducts />} />
                      <Route path="products/new" element={<AddProduct />} />
                      <Route path="logs" element={<AdminLogs />} />
                      <Route path="super-admin-logs" element={<SuperAdminLogs />} />
                      <Route path="orders-logs" element={<OrdersLogs />} />
                    </Route>
                  </Route>
                </Route>
              </Routes>

              <Footer />
            </PaymentProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
