import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/auth';

const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (!token || isTokenExpired(token)) {
            navigate('/login');
        }
    }, [token, navigate]);

    if (!token || isTokenExpired(token)) {
        return null;
    }

    return element;
};

export default ProtectedRoute;
