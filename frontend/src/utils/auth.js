import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
    return localStorage.getItem('authToken');
};

export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
};
