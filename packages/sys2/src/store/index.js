import { createStore } from 'vuex';

const allComponents = require.context('.', true, /\.*[^(index)]\.(js|ts)$/);
const realComponents = {};
allComponents.keys().forEach((fileName) => {
  const fileNameArr = fileName.split(/\.|\//);
  const moduleName = fileNameArr[fileNameArr.length - 2];
  // const moduleName = fileName.split(/\.|\//).at(-2);
  if (moduleName !== 'index') {
    const comp = allComponents(fileName);
    // 如果没有导出default，则直接忽略
    if (comp.default) {
      if (realComponents[moduleName]) {
        const see = `/src/store/${fileName}`;
        throw new Error(
          `already exist same namespace:${moduleName} in store. See:${see.replace(
            '/./',
            '/',
          )}`,
        );
      }
      realComponents[moduleName] = comp.default;
    }
  }
});

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: realComponents,
});
