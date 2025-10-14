// frontend/src/components/Navbar.jsx (CORRECTED & COMPLETE)

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';

const Navbar = () => {
    // Use Context to get user info, cart, and logout function
    const { state: { userInfo, cart }, logout } = useContext(AppContext);
    
    // Calculate total items in cart
    const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

    return (
        <nav style={styles.navbar}>
            <Link to="/" style={styles.brand}>
                AuraMart
            </Link>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>
                    Home
                </Link>
                <Link to="/cart" style={styles.link}>
                    🛒 Cart ({cartCount})
                </Link>
                
                {/* Conditional rendering for Login/Logout */}
                {userInfo ? (
                    <>
                        <span style={{...styles.link, color: '#f0f0f0', cursor: 'default'}}>
                            Hello, {userInfo.name.split(' ')[0]} 
                        </span>
                        {/* Use anchor tag and onClick for logout action */}
                        <a href="#" onClick={logout} style={{...styles.link, color: '#d9534f'}}>
                            Logout
                        </a>
                    </>
                ) : (
                    <Link to="/login" style={styles.link}>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

// --- STYLES OBJECT (THE MISSING PIECE) ---
const styles = {
    navbar: {
        backgroundColor: '#20232a', // Dark, modern background
        padding: '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
    },
    brand: {
        color: '#61dafb', // React blue for branding
        fontSize: '1.8rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        letterSpacing: '1px',
    },
    links: {
        display: 'flex',
        gap: '25px',
    },
    link: {
        color: '#e0e0e0', // Light text color
        textDecoration: 'none',
        fontSize: '1rem',
        padding: '5px 10px',
        transition: 'color 0.3s ease',
    },
};

export default Navbar;