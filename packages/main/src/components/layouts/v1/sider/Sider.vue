<template>
  <div>
    <div key="logo" class="menu-logo">
      <router-link :to="DEFAULT_HOME_PAGE">
        <img src="https://vuejs.org/images/logo.svg" alt="logo" />
        <h1 style="font-size: 'large'">{{ SIDER_TITLE }}</h1>
      </router-link>
    </div>
    <a-menu
      class="menu-content"
      mode="inline"
      theme="dark"
      v-model:selectedKeys="selectedKeysRef"
      @click="handleMenuClick"
      :open-keys="openKeysRef"
      @openChange="onOpenChange"
    >
      <template v-for="item in menuDataRef" :key="item.id">
        <template v-if="!item.children && item.isShow === '1'">
          <a-menu-item
            :key="item.id"
            :id="item.id"
            :path="item.path"
            :name="item.name"
            :target="item.target"
          >
            <template v-if="hasIcon(item.icon)" #icon>
              <component :is="Icon(item.icon)"></component>
            </template>
            {{ item.name }}
          </a-menu-item>
        </template>
        <template v-else-if="item.isShow === '1'">
          <sub-menu :key="item.id" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script>
import { DEFAULT_HOME_PAGE, SIDER_TITLE } from '@/config/globalConfig';
import { computed, defineComponent, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { hasIcon, Icon } from '../../utils/menuIcon';
import SubMenu from './SubMenu.vue';

export default defineComponent({
  components: {
    'sub-menu': SubMenu,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const menuDataRef = computed(() => store.state.layout.menuData);
    const menuMapRef = computed(() => store.state.layout.menuMap);
    const menuUpdateTimeRef = computed(() => store.state.layout.menuUpdateTime);
    const openKeysRef = computed(() => store.state.layout.openKeys);
    const selectedKeysRef = computed({
      get: () => store.state.layout.selectedKeys,
      set: (val) =>
        store.commit({
          type: 'layout/updateOpenAndSelectedKeys',
          payload: {
            selectedKeys: val,
          },
        }),
    });

    const handleMenuClick = ({ item }) => {
      router.push(item.path);
    };

    const onOpenChange = (keys) => {
      const lastOpenKey = keys[keys.length - 1];
      let willOpenKeys = [];
      if (lastOpenKey) {
        willOpenKeys = (
          menuMapRef.value.get(lastOpenKey)?.parentIds || []
        ).concat(lastOpenKey);
      }
      store.commit({
        type: 'layout/updateOpenAndSelectedKeys',
        payload: {
          openKeys: willOpenKeys,
        },
      });
    };

    onMounted(() => {
      // something here
    });

    watch(menuUpdateTimeRef, () => {
      store.dispatch({
        type: 'layout/setOpenKeysAndSelectedKeys',
        payload: {
          nextPath: route.path,
        },
      });
    });

    return {
      menuDataRef,
      openKeysRef,
      selectedKeysRef,
      hasIcon,
      Icon,
      handleMenuClick,
      onOpenChange,
      SIDER_TITLE,
      DEFAULT_HOME_PAGE,
    };
  },
});
</script>
<style lang="less">
@import '../../../../globalVar.less';

.menu-logo {
  height: @layout-header-height;
  line-height: @layout-header-height;
  position: relative;
  padding-left: (@menu-collapsed-width - 32px) / 2;
  transition: all 0.3s;
  background: transparent;
  overflow: hidden;
  img {
    display: inline-block;
    vertical-align: middle;
    height: 26px;
    margin-top: -2px;
  }
  h1 {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    font-size: 15px;
    margin: 0 0 3px 12px;
    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
}
.menu-content {
  height: calc(~'100vh - @{layout-header-height}');
}
.menu-content,
ul.@{ant-prefix}-menu {
  /* IE10,IE11,IE12  隐藏滚动条 */
  -ms-scroll-chaining: chained;
  -ms-overflow-style: none;
  -ms-content-zooming: zoom;
  -ms-scroll-rails: none;
  -ms-content-zoom-limit-min: 100%;
  -ms-content-zoom-limit-max: 500%;
  -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
  overflow: auto;
  /* 谷歌下隐藏滚动条 */
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
