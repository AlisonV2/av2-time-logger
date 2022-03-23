import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import VueApexCharts from 'vue3-apexcharts';
import './utils/styles';
import interceptors from './utils/interceptors';

interceptors();

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(VueApexCharts)
  .mount('#app');
