// frontend/src/pages/CartPage.jsx

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const CartPage = () => {
    const { state: { cart }, addToCart, removeFromCart } = useContext(AppContext);
    const navigate = useNavigate();

    // Calculate totals
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

    const updateQuantity = (item, newQty) => {
        // Use addToCart with the existing item structure and new quantity
        addToCart({...item, product: item.product}, newQty);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Shopping Cart</h1>

            {cart.length === 0 ? (
                <div style={styles.emptyCart}>
                    <p style={{ color: '#ccc', fontSize: '1.2rem' }}>
                        Your cart is empty. <Link to="/" style={styles.link}>Go shopping</Link>!
                    </p>
                </div>
            ) : (
                <div style={styles.grid}>
                    {/* Cart Items List */}
                    <div style={styles.itemList}>
                        {cart.map((item) => (
                            <div key={item.product} style={styles.cartItem}>
                                <Link to={`/product/${item.product}`}>
                                    <img src={item.imageUrl} alt={item.name} style={styles.itemImage} />
                                </Link>
                                <Link to={`/product/${item.product}`} style={styles.itemName}>
                                    {item.name}
                                </Link>

                                <div style={styles.itemPrice}>${item.price.toFixed(2)}</div>

                                {/* Quantity Selector */}
                                <select
                                    value={item.qty}
                                    onChange={(e) => updateQuantity(item, Number(e.target.value))}
                                    style={styles.select}
                                >
                                    {[...Array(item.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                                
                                <button 
                                    onClick={() => removeFromCart(item.product)} 
                                    style={styles.removeButton}
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div style={styles.summaryCard}>
                        <h2 style={styles.summaryTitle}>Order Summary</h2>
                        <div style={styles.summaryRow}>
                            <span>Total Items:</span>
                            <span>{totalItems}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <strong>Subtotal:</strong>
                            <strong style={styles.totalPrice}>${totalPrice.toFixed(2)}</strong>
                        </div>
                        <button 
                            onClick={() => alert("Checkout not yet implemented!")} 
                            style={styles.checkoutButton}
                            disabled={cart.length === 0}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
    },
    title: {
        color: '#f0f0f0',
        paddingBottom: '20px',
        borderBottom: '1px solid #333',
    },
    emptyCart: {
        textAlign: 'center',
        padding: '50px',
        border: '1px dashed #444',
        borderRadius: '8px',
        marginTop: '30px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '40px',
        marginTop: '30px',
    },
    itemList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    cartItem: {
        backgroundColor: '#282c34',
        padding: '15px',
        borderRadius: '8px',
        display: 'grid',
        gridTemplateColumns: '80px 1fr 100px 100px 50px',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    itemImage: {
        width: '70px',
        height: '70px',
        objectFit: 'cover',
        borderRadius: '5px',
        border: '1px solid #61dafb',
    },
    itemName: {
        fontSize: '1.1rem',
        color: '#f0f0f0',
        fontWeight: 'bold',
        textDecoration: 'none',
        paddingLeft: '15px',
    },
    itemPrice: {
        color: '#4caf50',
        fontWeight: 'bold',
    },
    select: {
        padding: '5px',
        borderRadius: '3px',
        backgroundColor: '#333',
        color: '#f0f0f0',
        border: '1px solid #61dafb',
    },
    removeButton: {
        backgroundColor: '#d9534f',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginLeft: 'auto',
    },
    summaryCard: {
        backgroundColor: '#20232a',
        padding: '25px',
        borderRadius: '8px',
        height: 'fit-content',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    },
    summaryTitle: {
        color: '#61dafb',
        borderBottom: '1px solid #444',
        paddingBottom: '10px',
        marginBottom: '20px',
    },
    summaryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        color: '#ccc',
        fontSize: '1.1rem',
    },
    totalPrice: {
        color: '#4caf50',
        fontSize: '1.3rem',
    },
    checkoutButton: {
        width: '100%',
        padding: '15px',
        marginTop: '25px',
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    link: {
        color: '#61dafb',
        textDecoration: 'none',
    }
};

export default CartPage;