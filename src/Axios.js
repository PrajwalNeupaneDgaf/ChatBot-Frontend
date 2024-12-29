import axios from 'axios';

// Create an Axios instance with a custom configuration
const api = axios.create({
  //baseURL: 'http://localhost:8080/api/',
  baseURL: 'https://chatbot-backend-v6m5.onrender.com//api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set the Authorization header dynamically before each request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');  // or retrieve token from wherever it's stored
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api
