import api from '@/utils/api';

export default {
  state: {
    logs: [],
  },
  mutations: {
    setLogs(state, payload) {
      state.logs = payload;
    },
  },
  actions: {
    async createLog(_, log) {
      try {
        return await api.post('/logs', log);
      } catch (err) {
        console.log(err);
      }
    },
    async updateLog({ commit }, { id, log }) {
      try {
        const response = await api.put(`/logs/${id}`, log);
        commit('setLogs', response.data);
        return response;
      } catch (err) {
        console.log(err);
      }
    },
    async getLogsByAuthor(_, payload) {
      try {
        return await api.get('/logs', {
          params: {...payload},
        });
      } catch (err) {
        console.log(err);
      }
    },
    async getAllLogs(_, payload) {
      try {
        const response = await api.get('/admin/logs', {
          params: {
            ...payload,
          },
        });
        console.log(response);
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteLog(_, id) {
      try {
        const response = await api.delete(`/logs/${id}`);
        return response.status;
      } catch (err) {
        console.log(err);
      }
    },
    async exportLogs(_, payload) {
      try {
        const response = await api.get('/admin/export', {
          params: {
            ...payload,
          },
        });
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async exportAuthorLogs() {
      try {
        const response = await api.get('/logs/export');
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getTimePerAuthor(_, payload) {
      try {
        const response = await api.get('/admin/charts', {
          params: { type: 'detailed', month: payload },
        });
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getTimePerProject(_, payload) {
      try {
        const response = await api.get('/admin/charts', {
          params: { type: 'global', month: payload },
        });
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getUserTime() {
      try {
        const response = await api.get('/logs/charts');
        return response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  getters: {},
};
