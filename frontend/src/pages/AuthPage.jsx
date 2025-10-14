// frontend/src/pages/AuthPage.jsx

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register view
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const { state, login, dispatch } = useContext(AppContext);
    const { userInfo, loading, error } = state;

    // Redirect if already logged in
    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    // Show error message from context
    useEffect(() => {
        if (error) {
            setMessage(error);
            // Clear context error after display
            setTimeout(() => {
                dispatch({ type: 'USER_LOGIN_FAIL', payload: null });
            }, 5000); 
        }
    }, [error, dispatch]);


    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear old messages

        if (isLogin) {
            // LOGIN LOGIC
            login(email, password);

        } else {
            // REGISTER LOGIC
            if (password !== confirmPassword) {
                setMessage('Passwords do not match');
                return;
            }

            try {
                // Register request (uses the same axios structure as login context)
                const config = { headers: { 'Content-Type': 'application/json' } };
                const { data } = await axios.post(
                    'http://localhost:5000/api/users',
                    { name, email, password },
                    config
                );

                // If registration is successful, automatically log the user in
                dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
                localStorage.setItem('userInfo', JSON.stringify(data));
                navigate('/');
                
            } catch (registrationError) {
                setMessage(
                    registrationError.response && registrationError.response.data.message 
                    ? registrationError.response.data.message 
                    : 'Registration Failed.'
                );
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>{isLogin ? 'Sign In' : 'Register Account'}</h1>
                
                {loading && <p style={styles.loading}>Processing...</p>}
                {(message || error) && <p style={styles.errorMessage}>{message || error}</p>}

                <form onSubmit={submitHandler}>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={styles.input}
                            required={!isLogin}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                    {!isLogin && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={styles.input}
                            required={!isLogin}
                        />
                    )}
                    <button type="submit" style={styles.submitButton} disabled={loading}>
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <p style={styles.switchLink}>
                    {isLogin ? "New Customer? " : "Already have an account? "}
                    <span onClick={() => setIsLogin(!isLogin)} style={styles.switchButton}>
                        {isLogin ? 'Register Here' : 'Login Here'}
                    </span>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '50px 20px',
        backgroundColor: '#1a1a1a', 
        minHeight: 'calc(100vh - 70px)', // Adjust based on navbar height
    },
    card: {
        backgroundColor: '#282c34',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    title: {
        color: '#61dafb',
        marginBottom: '30px',
        fontSize: '2rem',
    },
    input: {
        width: 'calc(100% - 20px)',
        padding: '12px 10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #444',
        backgroundColor: '#333',
        color: '#f0f0f0',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    submitButton: {
        width: '100%',
        padding: '15px',
        marginTop: '20px',
        backgroundColor: '#4caf50', // Success green
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    switchLink: {
        color: '#ccc',
        marginTop: '20px',
    },
    switchButton: {
        color: '#61dafb',
        cursor: 'pointer',
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
    errorMessage: {
        color: '#d9534f',
        backgroundColor: '#333',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
        border: '1px solid #d9534f',
    },
    loading: {
        color: '#61dafb',
        marginBottom: '15px',
    }
};

export default AuthPage;