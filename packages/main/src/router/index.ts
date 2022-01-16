import { DEFAULT_HOME_PAGE } from '@/config/globalConfig';
import upperFirst from 'lodash.upperfirst';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { microApps } from './qiankunRouter';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/member',
    name: 'LoginLayout',
    component: () => import('@/layouts/LoginLayout.vue'),
    children: [
      {
        path: 'login-v1',
        name: 'LoginV1',
        component: () => import('@/views/login/login-v1.vue'),
      },
      // 直接跳转到/，然后由/做判断应该继续怎么跳转
      {
        path: '',
        redirect: '/',
      },
    ],
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import('@/layouts/BasicLayout.vue'),
    children: [
      // ==== 路由 Start ====
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/main/demo',
        name: 'MainDemo',
        component: () => import('@/views/main/index.vue'),
      },
      // ==== 路由 End ====
      // 跳转到首页
      {
        path: '/',
        redirect: DEFAULT_HOME_PAGE,
      },
      {
        // 匹配所有路由
        path: ':pathMatch(.*)*',
        name: 'Page404',
        component: () => import('@/views/exception/404.vue'),
      },
    ],
  },
  // qiankun 微应用路由
  ...microApps.map((item) => {
    return {
      path: `/${item.name}/:subPath*`,
      name: `SubApp${upperFirst(item.name)}`,
      meta: {
        name: item.name,
        isMicro: true,
      },
      component: () => import('@/layouts/BasicLayout.vue'),
    };
  }),
];

const history = createWebHistory(process.env.BASE_URL);

const router = createRouter({
  history,
  routes,
});

export default router;

export { history };
