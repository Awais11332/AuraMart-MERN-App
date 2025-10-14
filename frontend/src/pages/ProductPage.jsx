// frontend/src/pages/ProductPage.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext.jsx';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Get addToCart function from context
    const { addToCart } = useContext(AppContext); 

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1); // State for quantity

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Single Product Fetch Error:", err);
                setError('Product not found or server error.');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Handler to add item to cart and redirect
    const addToCartHandler = () => {
        if (product) {
            // Passes the full product object and the selected quantity to context
            addToCart(product, Number(qty)); 
            navigate('/cart'); // Redirect to cart page
        }
    };


    if (loading) return <h2 style={styles.loading}>Loading Product Details...</h2>;
    if (error) return <h2 style={styles.error}>{error}</h2>;
    if (!product) return <h2 style={styles.error}>No product data available.</h2>;
    
    // Calculate the available options for the quantity selector
    const qtyOptions = [...Array(product.countInStock).keys()].map(x => x + 1);

    return (
        <div style={styles.container}>
            <div style={styles.grid}>
                <img src={product.imageUrl} alt={product.name} style={styles.image} />
                <div style={styles.details}>
                    <h1 style={styles.name}>{product.name}</h1>
                    <p style={styles.price}>Price: ${product.price.toFixed(2)}</p>
                    <p style={styles.description}>{product.description}</p>
                    
                    {/* Quantity Selector */}
                    {product.countInStock > 0 && (
                        <div style={styles.qtyBox}>
                            <label style={styles.status}>Quantity:</label>
                            <select
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                style={styles.select}
                            >
                                {qtyOptions.map((x) => (
                                    <option key={x} value={x}>
                                        {x}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <p style={styles.status}>
                        Status: <span style={{ color: product.countInStock > 0 ? '#4caf50' : '#d9534f', fontWeight: 'bold' }}>
                            {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
                        </span>
                    </p>
                    
                    <button 
                        onClick={addToCartHandler} 
                        style={styles.addToCartButton} 
                        disabled={product.countInStock === 0}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};


const styles = {
    // BASE STYLES
    container: {
        maxWidth: '1000px',
        margin: '50px auto',
        padding: '20px',
        backgroundColor: '#282c34',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
    },
    grid: {
        display: 'flex',
        gap: '40px',
    },
    image: {
        width: '400px',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '8px',
        border: '1px solid #61dafb',
    },
    details: {
        flex: 1,
        paddingTop: '20px',
    },
    name: {
        fontSize: '2.5rem',
        marginBottom: '15px',
        color: '#f0f0f0',
        textAlign: 'left',
    },
    price: {
        fontSize: '1.8rem',
        color: '#4caf50',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    description: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#ccc',
        marginBottom: '30px',
    },
    status: {
        fontSize: '1.1rem',
        marginBottom: '20px',
        color: '#f0f0f0',
    },
    loading: {
        textAlign: 'center',
        paddingTop: '50px',
        color: '#61dafb',
    },
    error: {
        textAlign: 'center',
        paddingTop: '50px',
        color: '#d9534f',
    },
    
    // QUANTITY/CART STYLES
    qtyBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px',
    },
    select: {
        padding: '8px 10px',
        borderRadius: '5px',
        backgroundColor: '#333',
        color: '#f0f0f0',
        border: '1px solid #61dafb',
        fontSize: '1rem',
    },
    addToCartButton: {
        backgroundColor: '#61dafb',
        color: '#282c34',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        border: 'none',
        padding: '15px 30px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '20px',
    }
};

export default ProductPage;
