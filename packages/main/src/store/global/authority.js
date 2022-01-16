import { buildTreeData } from '@/utils/util';
import throttle from 'lodash.throttle';

export default {
  namespaced: true,
  state: {
    user: {},
    tenant: {},
    permission: [],
  },
  mutations: {
    updateUserInfo(state, { payload }) {
      state.user = payload;
    },
    clearAuthority(state) {
      state.user = {};
      state.tenant = {};
      state.permission = [];
    },
  },
  actions: {
    async fetchAuthority({ commit, dispatch }) {
      const authorityResult = await getAuthority();
      const userInfo = JSON.parse(authorityResult.userInfo);
      const menuInfo = JSON.parse(authorityResult.menuInfo);
      const { treeData, relationMap } = buildTreeData(menuInfo);
      commit({
        type: 'updateUserInfo',
        payload: userInfo,
      });
      dispatch(
        {
          type: 'layout/setMenuData',
          payload: {
            menuData: treeData,
            menuMap: relationMap,
          },
        },
        { root: true },
      );
      return {
        userInfo,
        menuData: treeData,
        menuMap: relationMap,
      };
    },
  },
  getters: {},
};

async function getAuthorityFn() {
  return Promise.resolve({
    userInfo: JSON.stringify({
      name: '管理员',
      photo: '',
      id: 'abcd',
    }),
    menuInfo: JSON.stringify([
      {
        id: 'a1',
        path: '/home',
        name: '首页',
        isShow: '1',
      },
      {
        id: 'a2',
        path: '/main/demo',
        name: 'MainDemo',
        isShow: '1',
      },
      {
        path: '/sys2/example',
        id: 'b1',
        name: 'Sys2Demo1',
        isShow: '1',
      },
      {
        path: '/sys2/example2',
        id: 'b2',
        name: 'Sys2Demo2',
        isShow: '1',
      },
      {
        path: '/ppp/example',
        id: 'c1',
        name: 'PppDemo1',
        isShow: '1',
      },
      {
        path: '/ppp/example2',
        id: 'c2',
        name: 'PppDemo2',
        isShow: '1',
      },
    ]),
  });
}

// 节流
const getAuthority = throttle(getAuthorityFn, 1500, {
  leading: true,
  trailing: false,
});
