import api from '@/utils/api';
import jwt_decode from 'jwt-decode';

export default {
  state: {
    userLoggedIn: false,
  },
  mutations: {
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  actions: {
    initLogin({ commit, dispatch }) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        const expiration = decodedToken.exp;
        const now = Date.now() / 1000;
        if (expiration > now) {
          commit('toggleAuth');
        } else {
          dispatch('logout');
        }
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const response = await api.post('/auth/login', {
          email: email,
          password: password,
        });
        if (response.data.token) {
          const decodedToken = jwt_decode(response.data.token);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refresh', response.data.refresh);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('username', response.data.userName);
          localStorage.setItem('email', decodedToken.email);
          commit('toggleAuth');
          return response;
        }
      } catch (err) {
        return err;
      }
    },
    async logout({ commit }) {
      const token = localStorage.getItem('token');
      try {
        const response = await api.post('/auth/logout', {
          token: token,
        });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('refresh');
        localStorage.removeItem('email');
        commit('toggleAuth');
      } catch (err) {
        console.log(err);
      }
    },
    async refreshToken() {
      try {
        const response = await api.post('/auth/token', {
          refresh: localStorage.getItem('refresh'),
        });
        console.log('refresh', response);
        localStorage.setItem('token', response.data.token);
        return response;
      } catch (err) {
        console.log(err);
      }
    },
    async changePassword(_, { oldPassword, newPassword }) {
      const token = localStorage.getItem('refresh');
      try {
        const response = await api.post('/auth/change-password', {
          token: token,
          oldPassword: oldPassword,
          newPassword: newPassword,
        });
        return response.status;
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {},
};
