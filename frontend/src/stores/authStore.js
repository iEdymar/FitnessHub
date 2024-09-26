import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    role: localStorage.getItem('role') || '',
    id: localStorage.getItem('id') || ''
  }),

  actions: {
    setAuthData({ token }) {
      this.token = token;

      const decoded = jwtDecode(token);
      this.role = decoded.role;
      this.id = decoded.id;

      localStorage.setItem('token', token);
      localStorage.setItem('role', this.role);
      localStorage.setItem('id', this.id);
    },

    clearAuthData() {
      this.token = '';
      this.role = '';
      this.id = '';

      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
    },

    isAuthenticated() {
      return !!this.token;
    }
  }
});
