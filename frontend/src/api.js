import axios from 'axios';

const API_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000') + '/api/auth';

export const register = (userData) => axios.post(`${API_URL}/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/login`, userData);
export const forgotPassword = (email) => axios.post(`${API_URL}/forgotpassword`, { email });
export const resetPassword = (token, password) => axios.put(`${API_URL}/resetpassword/${token}`, { password });

export const changePassword = (data, token) => 
  axios.post(`${API_URL}/change-password`, data, {
    headers: { 'x-auth-token': token }
  });