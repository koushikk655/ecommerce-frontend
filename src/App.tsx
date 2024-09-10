import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/ProductList';
import Cart from './components/Cart';
import { useAuth } from './hooks/useAuth';
import { Product, CartItem } from './types';

function App() {
    const { isAuthenticated } = useAuth();
    const [cart, setCart] = useState<CartItem[]>([]); // Use Product type for cart state

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={isAuthenticated ? <Home cart={cart} setCart={setCart} /> : <Navigate to="/login" />} />
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            </Routes>
        </Router>
    );
}

export default App;
