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
      @click="handleMenuClick"
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
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import SubMenu from './SubMenu.vue';

export default defineComponent({
  components: {
    'sub-menu': SubMenu,
  },
  setup() {
    const router = useRouter();
    const menuDataRef = ref([
      {
        id: 'a1',
        path: '/home',
        name: 'Home',
        isShow: '1',
      },
      {
        id: 'a2',
        path: '/main/demo',
        name: 'MainDemo',
        isShow: '1',
      },
      {
        id: 'a3',
        path: '/main/demo3',
        name: 'MainDemo3',
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
    ]);

    const handleMenuClick = ({ item }) => {
      router.push(item.path);
    };

    onMounted(() => {
      // something here
    });

    return {
      menuDataRef,
      handleMenuClick,
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
