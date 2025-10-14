// frontend/src/components/ProductCard.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    // State to track hover for the animation
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            style={{
                ...styles.card,
                // Apply the transformation style based on hover state (the animation)
                transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: isHovered ? '0 12px 20px rgba(97, 218, 251, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.5)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={product.imageUrl} alt={product.name} style={styles.image} />
            <h3 style={styles.title}>{product.name}</h3>
            <p style={styles.price}>${product.price.toFixed(2)}</p>
            <p style={styles.stock}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
            
            {/* Link to the product details page using the product's unique ID */}
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}> 
                <button style={styles.button}>View Details</button>
            </Link>
        </div>
    );
};

// --- STYLES OBJECT (THE MISSING PIECE) ---
const styles = {
    card: {
        border: '1px solid #333',
        borderRadius: '12px',
        padding: '20px',
        margin: '15px',
        width: '300px',
        textAlign: 'center',
        backgroundColor: '#282c34', // Slightly lighter dark background
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Animation transitions
    },
    image: {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '15px',
        border: '1px solid #61dafb', // React blue border
    },
    title: {
        fontSize: '1.4rem',
        marginBottom: '8px',
        color: '#f0f0f0',
    },
    price: {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: '#4caf50', // Brighter green for price
    },
    stock: {
        fontSize: '1rem',
        color: '#ccc',
        marginBottom: '15px',
    },
    button: {
        backgroundColor: '#61dafb', // Branded blue button
        color: '#282c34',
        fontWeight: 'bold',
        border: 'none',
        padding: '12px 25px',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    }
};

export default ProductCard;