import { microApps } from '@/router/qiankunRouter';
import { isProduction } from '@/utils/util';
import type { ObjectType, RegistrableApp, FrameworkLifeCycles } from 'qiankun';
import { initGlobalState, registerMicroApps, start } from 'qiankun';
import type { App } from 'vue';
import { ref } from 'vue';
import { qiankunKey } from './injectionSymbols';
import router, { history } from '@/router';
const pkg = require('../../package.json');

let installed = false;

// 指示qiankun是否启动
let qiankunStarted = false;

// 子应用加载状态
const loadingMicroApp = ref<boolean>(false);
export { loadingMicroApp };

// 构建需要加载的子应用
export const apps: RegistrableApp<ObjectType>[] = microApps.map((app) => ({
  ...app,
  props: {
    fromMain: true,
    history,
    router,
  },
  container: '#pageContainer',
  activeRule: (location) => location.pathname.startsWith(`/${app.name}/`),
  loader: (loading) => {
    loadingMicroApp.value = loading;
  },
}));

/** 注册qiankun子应用 */
export function registerQiankun(
  lifeCycles?: FrameworkLifeCycles<ObjectType>,
): void {
  registerMicroApps(apps, lifeCycles);
}

/** 启动qiankun，只需要启动一次即可 */
export function startQiankun(): void {
  if (!qiankunStarted) {
    qiankunStarted = true;
    start({ prefetch: false });
  }
}

const qiankunPlugin = {
  install(app: App): void {
    if (installed) {
      return;
    }
    installed = true;

    const afterAppMount = [];

    // 注册
    // registerQiankun({
    //   afterMount: afterAppMount,
    // });
    // 初始化 state
    const { setGlobalState, onGlobalStateChange, offGlobalStateChange } =
      initGlobalState({
        version: '1.0.0',
        author: '180084',
        /**
         * 改变的属性，true时标记所有属性都改变了，string或string[]时标记哪些属性改变了
         * @type { true | string | string[]}
         */
        changeFields: true,
        /**
         * 上次改动从哪个应用发出
         * @type { string }
         */
        from: pkg.name,
        /**
         * 上次改动时间
         * @type { number }
         */
        timestamp: new Date().getTime(),
        /**
         * 预留一个消息通道
         * @type { Record<string, any> }
         */
        messageChannel: {},
      });

    // 初始化一个事件监听容器
    const stateChangeListener = new Map();
    // 注册回调
    const registerStateChangeHandler = (
      name: string,
      cb: (state: Record<string, any>, prev: Record<string, any>) => void,
    ) => {
      stateChangeListener.set(name, cb);
    };
    const unregisterStateChangeHandler = (name: string) => {
      stateChangeListener.delete(name);
    };

    const emmitGlobalStateChange = (state: Record<string, any>) => {
      setGlobalState(
        Object.assign(state, {
          from: pkg.name,
          changeFields: Object.keys(state),
          timestamp: new Date().getTime(),
        }),
      );
    };

    // 暴露qiankun API到全局
    app.config.globalProperties.$qiankun = {
      startQiankun,
      registerStateChangeHandler,
      unregisterStateChangeHandler,
      emmitGlobalStateChange,
      afterAppMount,
    };
    // 提供给USE API 使用
    app.provide(qiankunKey, {
      startQiankun,
      registerStateChangeHandler,
      unregisterStateChangeHandler,
      emmitGlobalStateChange,
      afterAppMount,
    });

    if (!isProduction) {
      registerStateChangeHandler('_dev_qiankun_state', (state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        // eslint-disable-next-line no-console
        console.log('[main] listen state change by qiankun:', state, prev);
      });
    }

    // 监听
    onGlobalStateChange((state, prev) => {
      stateChangeListener.forEach((cb, name) => {
        if (cb && typeof cb === 'function') {
          try {
            cb(state, prev);
          } catch {
            // eslint-disable-next-line no-console
            console.error('handler [' + name + '] was error');
          }
        }
      });
    });

    // 卸载时关闭监听
    const unmountApp = app.unmount;
    app.unmount = () => {
      offGlobalStateChange();
      unmountApp();
    };
  },
};

export default qiankunPlugin;
