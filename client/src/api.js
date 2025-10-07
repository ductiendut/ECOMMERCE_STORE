// Central axios instance configuration
import axios from 'axios';

// Prefer environment variable, fallback to localhost dev server
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL + '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

// Helper to build image URLs served statically from Express (express.static("public"))
export const buildImageUrl = (category, filename) => {
  if(!filename) return '';
  return `${API_BASE_URL}/${category}/${filename}`;
};