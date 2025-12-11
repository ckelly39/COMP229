# API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default API_URL;

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Example usage:
// import { apiCall } from './config/api';
// const data = await apiCall('/api/contacts', { method: 'GET' });
