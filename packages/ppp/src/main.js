/* eslint-disable no-unused-vars */
import { ANT_PREFIX } from '@/config/globalConfig';
import qiankunPlugin from '@/qiankun';
import AntDV, { ConfigProvider } from 'ant-design-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
// import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { name } from '../package.json';
import App from './App.vue';
import './index.less';
// import './index.scss';
import './public-path';
import routes from './router';
import { changeRoutesBase } from './router/utils';
import store from './store';

let router = null;
let instance = null;
let history = null;
let routesChanged = false;

dayjs.locale('zh-cn');

function render(props = {}) {
  const { container, history: mainHistory, router: mainRouter } = props;
  const fromQiankun = !!window.__POWERED_BY_QIANKUN__;
  const base = fromQiankun ? `/${name}` : '';
  if (mainHistory) {
    // 避免重复监听
    // mainHistory.destroy();
    history = mainHistory;
  } else {
    history = createWebHistory(base);
  }
  // history = createWebHistory(base);
  if (fromQiankun && !routesChanged) {
    routesChanged = true;
    changeRoutesBase(routes, base);
  }
  router = createRouter({
    history,
    routes,
  });

  // router = mainRouter;

  instance = createApp(App);
  // instance.use(ElementPlus, { size: 'small' });
  instance.use(store);
  instance.use(router);
  instance.use(AntDV);
  ConfigProvider.config({
    prefixCls: ANT_PREFIX,
  });
  // 安装qiankun插件, 需要在store之后安装
  instance.use(qiankunPlugin, props);
  // 全局导入表单自定义规则
  // 全局控制自定义指令
  instance.mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap(props) {
  console.log(`${name} bootstrap`, props);
}

export async function mount(props) {
  console.log(`${name} mount`, props);
  render(props);
}

export async function update(props) {
  console.log(`${name} update`, props);
}

export async function unmount(props) {
  console.log(`${name} unmount`, props);
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  router = null;
  if (!props?.history) {
    history.destroy();
  }
}
