import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import {AuthProvider} from "./context/AuthContext";
import {ToastProvider} from "./context/ToastContext";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <AppProvider>
                    <ToastProvider>
                        <App />
                    </ToastProvider>
                </AppProvider>
            </BrowserRouter>
        </AuthProvider>
	</React.StrictMode>
);
