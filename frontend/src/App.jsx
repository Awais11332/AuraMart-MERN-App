// frontend/src/App.jsx (FINAL UPDATE)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx'; 
import AuthPage from './pages/AuthPage.jsx'; 
import CartPage from './pages/CartPage.jsx'; // 1. Import CartPage
import Navbar from './components/Navbar.jsx';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/product/:id" element={<ProductPage />} /> 
                        <Route path="/login" element={<AuthPage />} /> 
                        
                        {/* 2. Update Cart Route */}
                        <Route path="/cart" element={<CartPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;