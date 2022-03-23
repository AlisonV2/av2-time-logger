import api from './api';

const interceptors = () => {
  api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        config.headers.Authorization = 'Bearer ' + accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;
      const refreshToken = localStorage.getItem('refresh');

      if (
        refreshToken &&
        error['response'] &&
        error.response.status === 401 &&
        !originalConfig._retry &&
        !error.config.url.includes('/auth/token')
      ) {
        originalConfig._retry = true;

        try {
          const res = await api.post('/auth/token', {
            refresh: refreshToken,
          });

          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            return api(originalConfig);
          }
        } catch (_error) {
          return Promise.reject(_error);
        }
      } else {
        if (error.config && error.config.url.includes('/auth/token')) {
          localStorage.clear();
        }
      }
      return Promise.reject(error);
    }
  );
  
};

export default interceptors;
