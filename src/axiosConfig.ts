import axios from 'axios';

// Create an instance of Axios
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api"
});

// Request interceptor to add token to headers if the URL is not for login or register
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    
    // Do not attach token for login and register endpoints
    if (token && !config.url?.includes('/login') && !config.url?.includes('/register')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;
