import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, isTokenExpired } from '../utils/auth';

const ProtectedPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (!token || isTokenExpired(token)) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="container text-center mt-5">
            <h1>Protected Content</h1>
            <p>Welcome to the protected page!</p>
        </div>
    );
};

export default ProtectedPage;
