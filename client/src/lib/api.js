/**
 * API CONFIGURATION - HTTP Client Setup
 * 
 * This file configures axios for making HTTP requests to the backend API.
 * It handles authentication tokens and sets up the base URL dynamically.
 * 
 * Features:
 * - Dynamic base URL from environment variables
 * - Automatic JWT token injection
 * - Redux store integration
 * - Request/Response interceptors
 * 
 * @author SHAFIMED Development Team
 * @version 2.0.0 - Beginner Friendly Edition
 */

import axios from "axios";
import store from "../store";

/**
 * API CLIENT CONFIGURATION
 * 
 * Creates an axios instance with the base URL from environment variables.
 * This allows switching between development and production APIs seamlessly.
 * 
 * Environment Variables:
 * - VITE_API_URL: The base URL for API requests (set in .env file)
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * REQUEST INTERCEPTOR
 * 
 * Automatically adds authentication token to all API requests.
 * Gets the token from Redux store instead of localStorage for better security.
 * 
 * @param {Object} config - Axios request configuration
 * @returns {Object} - Modified request configuration with auth header
 */
api.interceptors.request.use(
  (config) => {
    // Get current authentication state from Redux store
    const state = store.getState();
    const token = state.auth.token;
    
    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log API calls in development mode
    if (import.meta.env.DEV) {
      console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 * 
 * Handles common response scenarios and error handling.
 * Provides consistent error handling across the application.
 * 
 * @param {Object} response - Axios response object
 * @returns {Object} - Response data or handled error
 */
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - token expired or invalid
          console.error('🔐 Authentication Error: Please log in again');
          // You might want to dispatch a logout action here
          break;
        case 403:
          // Forbidden - insufficient permissions
          console.error('🚫 Access Denied: Insufficient permissions');
          break;
        case 404:
          // Not found
          console.error('🔍 Resource Not Found');
          break;
        case 500:
          // Server error
          console.error('🔧 Server Error: Please try again later');
          break;
        default:
          console.error(`❌ API Error ${status}:`, data?.message || error.message);
      }
    } else if (error.request) {
      // Network error - no response received
      console.error('🌐 Network Error: Unable to connect to server');
      console.error('Current API URL:', api.defaults.baseURL);
    } else {
      // Request setup error
      console.error('⚙️ Request Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;

