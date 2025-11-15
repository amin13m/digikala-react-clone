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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>

          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
