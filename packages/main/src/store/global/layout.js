import { buildMapKeyByPath } from '@/utils/util';

/**
 * @typedef {{ key: string, title: string, closable?: boolean }} Tab
 */
export default {
  namespaced: true,
  state: {
    /** 菜单树形数据 */
    menuData: [],
    /** 菜单键值对 */
    menuMap: new Map(),
    /** 菜单更新时间 */
    menuUpdateTime: 0,
    /**
     * sub-menu 展开的id
     * @type { string[] }
     */
    openKeys: [],
    /**
     * menu-item 被选中的id
     * @type { string[] }
     */
    selectedKeys: [],
    /**
     * heade-tab 当前被选中的path
     * @type { string }
     */
    activeKey: '',
    /**
     * heade-tab 已打开的数据
     * @type { Tab[] }
     */
    tabs: [],
    // 布局
    hasSider: true,
    hasHeader: true,
    hasFooter: false,
    collapsed: false,
  },
  mutations: {
    updateMenu(state, { payload }) {
      state.menuData = payload.menuData;
      state.menuMap = payload.menuMap;
      state.menuUpdateTime = payload.menuUpdateTime;
    },
    updateOpenAndSelectedKeys(state, { payload }) {
      if (payload.openKeys) {
        state.openKeys = payload.openKeys;
      }
      if (payload.selectedKeys) {
        state.selectedKeys = payload.selectedKeys;
      }
    },
    updateActiveKey(state, { payload }) {
      state.activeKey = payload;
    },
    updateTabs(state, { payload }) {
      state.tabs = payload;
    },
    updateTabsAndActiveKey(state, { payload }) {
      state.tabs = payload.tabs;
      state.activeKey = payload.activeKey;
    },
    updateLayout(state, { payload }) {
      // 只有在类型为boolean时才进行更新
      if (typeof payload.hasSider === 'boolean') {
        state.hasSider = payload.hasSider;
      }
      if (typeof payload.hasHeader === 'boolean') {
        state.hasHeader = payload.hasHeader;
      }
      if (typeof payload.hasFooter === 'boolean') {
        state.hasFooter = payload.hasFooter;
      }
      if (typeof payload.collapsed === 'boolean') {
        state.collapsed = payload.collapsed;
      }
    },
  },
  actions: {
    async addTab({ state, commit }, { payload }) {
      if (!state.tabs.find((item) => item.key === payload.key)) {
        const tabs = state.tabs.concat(payload);
        commit({
          type: 'updateTabs',
          payload: tabs,
        });
      }
    },
    async removeTab({ state, commit }, { payload }) {
      let lastIndex = 0;
      state.tabs.forEach((tab, i) => {
        if (tab.key === payload.key) {
          lastIndex = i - 1;
        }
      });
      const willTabs = state.tabs.filter((tab) => tab.key !== payload.key);
      let willActiveKey = state.activeKey;
      if (state.tabs.length && state.activeKey === payload.key) {
        if (lastIndex >= 0) {
          willActiveKey = state.tabs[lastIndex].key;
        } else {
          willActiveKey = state.tabs[0].key;
        }
      }
      commit({
        type: 'updateTabsAndActiveKey',
        payload: {
          tabs: willTabs,
          activeKey: willActiveKey,
        },
      });
      return willActiveKey;
    },
    async setOpenKeysAndSelectedKeys({ state, commit }, { payload }) {
      // 1.首次加载时，不用forceUpdate，则会判断当前是否已经初始化，如果已经初始化，则不需要设置openKeys及selectedKeys
      // 2.如果设置forceUpdate，则不管是否已经初始化，强制更新
      let menuItem = undefined;
      if ((payload.nextPath ?? '') !== '' && payload.forceUpdate) {
        menuItem = state.menuMap.get(buildMapKeyByPath(payload.nextPath));
      } else if (state.openKeys && state.openKeys < 1) {
        menuItem = state.menuMap.get(buildMapKeyByPath(payload.nextPath));
      }

      let willOpenKeys = undefined;
      let willSelectedKeys = undefined;
      if (menuItem) {
        if (!state.collapsed) {
          // 如果侧边是折叠的，就不用打开了
          willOpenKeys = menuItem?.parentIds || [];
        }
        willSelectedKeys = menuItem?.id ? [menuItem.id] : [];
      }

      commit({
        type: 'updateOpenAndSelectedKeys',
        payload: {
          openKeys: willOpenKeys,
          selectedKeys: willSelectedKeys,
        },
      });
    },
    async setMenuData({ commit }, { payload }) {
      commit({
        type: 'updateMenu',
        payload: {
          ...payload,
          menuUpdateTime: new Date().getTime(),
        },
      });
    },
  },
  getters: {},
};
