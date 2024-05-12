import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Adjust the base URL to match your backend
  withCredentials: true // Send cookies with cross-origin requests
});

export default api;
