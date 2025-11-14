import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";


function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
    
      </Routes>
      <Footer/>
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;