// frontend/src/pages/HomePage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// FIX: Using explicit .jsx extension for clarity/consistency (optional, but good practice)
import ProductCard from '../components/ProductCard.jsx'; 

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Connects to the Express backend API running on port 5000
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                // Display a specific error message if the fetch fails (e.g., if backend is down)
                console.error("API Fetch Error:", err);
                setError('Failed to fetch products from the server. Check if the backend (Port 5000) is running.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Conditional Rendering based on state
    if (loading) return <h2>Loading products...</h2>;
    if (error) return <h2 style={{ color: 'red', textAlign: 'center' }}>Error: {error}</h2>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>AuraMart Product Catalog</h1>
            <div style={styles.productsGrid}>
                {/* Conditional rendering for empty array */}
                {products.length === 0 ? (
                    <p style={{ fontSize: '1.2rem' }}>No products found. Please add products to your MongoDB.</p>
                ) : (
                    // Map through the fetched products
                    products.map((product) => (
                        // Use product._id as the key for efficient list rendering
                        <ProductCard key={product._id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
};

// Simple inline styles for the grid layout
const styles = {
    productsGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px', // Added gap for better spacing
        justifyContent: 'center',
        paddingTop: '20px',
    }
};

export default HomePage;