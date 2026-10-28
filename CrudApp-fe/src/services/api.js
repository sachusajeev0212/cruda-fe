import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/books';

export const bookApi = {
  // Read all books
  getAll: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },

  // Read single book by id
  getById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // Create new book
  create: async (bookData) => {
    const response = await axios.post(API_BASE_URL, bookData);
    return response.data;
  },

  // Update existing book
  update: async (id, bookData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, bookData);
    return response.data;
  },

  // Delete book
  delete: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  }
};
