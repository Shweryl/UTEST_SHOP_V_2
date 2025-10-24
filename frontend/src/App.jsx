import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Products from "./pages/products";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { AuthProvider } from "./contexts/AuthContext";
import MyOrders from "./pages/orders";
import "./App.css";

import ProductDetail from "./pages/productDetail";
import CartPage from "./pages/cart";
const MainLayout = ({ children }) => (
  <>
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  </>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout><Products /></MainLayout>} />
            <Route path="/products/:id" element={<MainLayout><ProductDetail /></MainLayout>} />
            <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
            <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
            <Route path="/register" element={<MainLayout><RegisterPage /></MainLayout>} />
            <Route path="/my-orders" element={<MainLayout><MyOrders /></MainLayout>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>

  );
}

export default App;
