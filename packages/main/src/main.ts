import { ANT_PREFIX } from '@/config/globalConfig';
import QiankunPlugin from '@/qiankun/index';
import AntDV, { ConfigProvider } from 'ant-design-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { createApp } from 'vue';
import App from './App.vue';
import './index.less';
import router from './router';
import store from './store';

dayjs.locale('zh-cn');

ConfigProvider.config({
  prefixCls: ANT_PREFIX,
});
const app = createApp(App);
app.use(store);
app.use(AntDV);
app.use(router);
// 启动qiankun
app.use(QiankunPlugin);
app.mount('#app');
