// frontend/src/pages/HomePage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';

// VERCEL DEPLOYMENT FIX: 
// Checks for the VITE_API_URL set in frontend/.env.development (for local testing).
// Otherwise, it defaults to the Vercel-managed relative path ('/api') for production.
const API_BASE = import.meta.env.VITE_API_URL || '/api'; 

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products using the determined base URL (e.g., http://localhost:5000/api/products or /api/products)
                const response = await axios.get(`${API_BASE}/products`); 
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                console.error("API Fetch Error:", err);
                setError('Failed to fetch products. Is the backend running on port 5000?');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); 

    if (loading) return <h2>Loading products...</h2>;
    if (error) return <h2 style={{ color: 'red', textAlign: 'center' }}>Error: {error}</h2>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>AuraMart Product Catalog</h1>
            <div style={styles.productsGrid}>
                {products.length === 0 ? (
                    <p style={{ fontSize: '1.2rem' }}>No products found. Please add products to your MongoDB.</p>
                ) : (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    productsGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px', 
        justifyContent: 'center',
        paddingTop: '20px',
    }
};

export default HomePage;
