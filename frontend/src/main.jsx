// frontend/src/main.jsx (UPDATED)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AppProvider } from './context/AppContext.jsx'; // 1. Import Provider

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* 2. Wrap App with the Provider */}
        <AppProvider> 
            <App />
        </AppProvider>
    </React.StrictMode>
);