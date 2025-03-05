import axios from 'axios';

// Crear una instancia de Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // URL base de tu API
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token de autenticación
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas de error globalmente
axiosInstance.interceptors.response.use(
    (response) => response, // Si la respuesta es exitosa, simplemente la retorna
    (error) => {
        // Manejo de errores global
        if (error.response && error.response.status === 401) {
            // Si el token es inválido o expirado, redirige al login
            window.location.href = '/login'; // Redirigir al login (puedes usar `navigate()` si estás usando React Router)
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
