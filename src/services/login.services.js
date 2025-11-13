// src/services/login.service.js
import { config } from '../config/http';

export const loginService = {
  async login(email, password) {
    try {
      const response = await fetch(`${config.url.API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || 'Email ou senha incorretos.');
      }

      // Armazenar token e usuário
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      return data;
    } catch (error) {
      console.error('Erro no login:', error);
      throw new Error(error.message || 'Erro ao conectar ao servidor.');
    }
  },

  saveRememberedEmail(email, remember) {
    if (remember) {
      localStorage.setItem('rememberEmail', email);
    } else {
      localStorage.removeItem('rememberEmail');
    }
  },

  getRememberedEmail() {
    return localStorage.getItem('rememberEmail') || '';
  },

  isLoggedIn() {
    return !!localStorage.getItem('token');
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },
};
