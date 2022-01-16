import { qiankunKey } from '@/qiankun/injectionSymbols';
import { isProduction } from '@/utils/util';

let installed = false;

const qiankunPlugin = {
  install(app, options) {
    if (installed || !options.fromMain) {
      return;
    }
    installed = true;

    // 初始化一个事件监听容器
    const stateChangeListener = new Map();
    // 注册回调
    const registerStateChangeHandler = (name, cb) => {
      stateChangeListener.set(name, cb);
    };
    const unregisterStateChangeHandler = (name) => {
      stateChangeListener.delete(name);
    };
    const emmitGlobalStateChange = (state) => {
      options.setGlobalState(
        Object.assign(state, {
          from: options.name,
          changeFields: Object.keys(state),
          timestamp: new Date().getTime(),
        }),
      );
    };

    if (!isProduction) {
      registerStateChangeHandler('_dev_qiankun_state', (state, prev) => {
        // state: 变更后的状态; prev 变更前的状态
        console.log(`[${options.name}]通过qiankun监听到状态变化`, state, prev);
      });
    }

    // 监听
    options.onGlobalStateChange((state, prev) => {
      try {
        // 全局监听期
        if (state.from === 'main') {
          const changeFields = state.changeFields;
          if (Array.isArray(changeFields)) {
            // something here
          } else if (typeof changeFields === 'string') {
            // update field
          }
        }
      } catch (e) {
        console.error(`[${options.name}]全局监听器发生错误`, e);
      }

      // 自定义监听器
      stateChangeListener.forEach((cb, name) => {
        if (cb && typeof cb === 'function') {
          try {
            cb(state, prev);
          } catch {
            console.error('监听器' + name + '的回调函数发生异常');
          }
        }
      });
    }, true);

    app.config.globalProperties.$qankun = {
      registerStateChangeHandler,
      unregisterStateChangeHandler,
      emmitGlobalStateChange,
      isMicro: true,
    };
    app.provide(qiankunKey, {
      registerStateChangeHandler,
      unregisterStateChangeHandler,
      emmitGlobalStateChange,
      isMicro: true,
    });

    const appUnmount = app.unmount;
    app.unmount = () => {
      stateChangeListener.clear();
      installed = false;
      appUnmount();
    };
  },
};

export default qiankunPlugin;
