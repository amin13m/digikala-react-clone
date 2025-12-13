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
import Orders from "./pages/Orders.jsx";
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";
import Product from "./pages/Product.jsx";

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
                  <Route path="orders" element={<Orders />} />
                  <Route path="profile" element={<Profile />} />
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
