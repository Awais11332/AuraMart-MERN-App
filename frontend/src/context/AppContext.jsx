// frontend/src/context/AppContext.jsx

import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// 1. Initial State
const initialState = {
    userInfo: localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) 
        : null,
    cart: localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems')) 
        : [],
    loading: false,
    error: null,
};

// 2. Reducer Function (handles state transitions)
const appReducer = (state, action) => {
    switch (action.type) {
        // --- AUTH ACTIONS ---
        case 'USER_LOGIN_REQUEST':
            return { ...state, loading: true };
        case 'USER_LOGIN_SUCCESS':
            return { ...state, loading: false, userInfo: action.payload, error: null };
        case 'USER_LOGIN_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'USER_LOGOUT':
            return { ...state, userInfo: null, cart: [] };
        
        // --- CART ACTIONS ---
        case 'CART_ADD_ITEM':
            const item = action.payload;
            const existItem = state.cart.find(x => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cart: state.cart.map(x => 
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, item],
                };
            }
        case 'CART_REMOVE_ITEM':
            return {
                ...state,
                cart: state.cart.filter(x => x.product !== action.payload),
            };

        default:
            return state;
    }
};

// 3. Create Context
export const AppContext = createContext();

// 4. Create Provider Component
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Persist cart and user data to local storage on state change
    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    }, [state.userInfo]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cart));
    }, [state.cart]);


    // --- Context Actions/Methods ---

    const login = async (email, password) => {
        try {
            dispatch({ type: 'USER_LOGIN_REQUEST' });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                'http://localhost:5000/api/users/login',
                { email, password },
                config
            );

            dispatch({
                type: 'USER_LOGIN_SUCCESS',
                payload: data,
            });

        } catch (error) {
            dispatch({
                type: 'USER_LOGIN_FAIL',
                payload: 
                    error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message,
            });
        }
    };

    const logout = () => {
        dispatch({ type: 'USER_LOGOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('cartItems');
    };

    const addToCart = (product, qty = 1) => {
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: {
                product: product._id, // Mongoose ID
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
                countInStock: product.countInStock,
                qty,
            }
        });
    };

    const removeFromCart = (id) => {
        dispatch({
            type: 'CART_REMOVE_ITEM',
            payload: id,
        });
    };


    return (
        <AppContext.Provider 
            value={{ 
                state, 
                dispatch, 
                login, 
                logout,
                addToCart,
                removeFromCart,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};