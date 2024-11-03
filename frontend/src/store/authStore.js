import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // Signup action
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {email, password, name});
      set({user: response.data.user, isAuthenticated: true, isLoading: false});
    } catch (error) {
      set({error: error.response.data.message || "Error signing up", isLoading: false});
      throw error;
    }
  },

  // Login action
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      set({isAuthenticated: true, user: response.data.user, isLoading: false, error: null});
    } catch (error) {
      set({error: "User Not Found", isLoading: false});
      throw error;
    }
  },

  // Logout action
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({user: null, isAuthenticated: false, error: null, isLoading: false});
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  // Email verification
  verifyEmail: async (verificationCode) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {code: verificationCode});
      set({user: response.data.user, isAuthenticated: true, isLoading: false});
      return response.data;
    } catch (error) {
      set({error: error.response.data.message || "Error verifying email", isLoading: false});
      throw error;
    }
  },
  
  // Check authentication status
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false});
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false, user: null});
      // throw error;
      console.log(error)
    }
  },

  // Forgot password action
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {email});
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({isLoading: false, error:error.response.data.message || "Error sending reset password email"});
      throw error;
    }
  },

  // Reset password action
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },

}));