<template>
  <div>
    <a-layout>
      <a-layout-sider
        width="200"
        collapsedWidth="80"
        :trigger="null"
        style="overflow: auto; height: 100vh; position: fixed; left: 0"
      >
        <cc-sider></cc-sider>
      </a-layout-sider>
      <a-layout style="marginleft: 200px; transition: all 0.2s ease 0s">
        <a-layout-header
          style="
            background: #fff;
            padding: 0;
            display: flex;
            position: fixed;
            zindex: 1;
            width: calc(100vw - 200px);
            margin-left: 200px;
          "
        >
          <div class="header-content"></div>
        </a-layout-header>
        <a-layout-header
          style="width: calc(100vw - 200px); margin-left: 200px"
        ></a-layout-header>
        <a-layout
          style="
            min-height: calc(100vh - 48px);
            max-height: calc(100vh - 48px);
            overflow: auto;
          "
        >
          <a-layout-content>
            <router-view v-slot="{ Component, route }">
              <div style="margin: 8px">
                <component
                  v-if="route.meta.isMicro"
                  :is="QiankunWrapper"
                  :name="route.meta.name"
                />
                <component v-else :is="Component" />
              </div>
            </router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import { CcSider } from '@/components/layouts';
import QiankunWrapper from '@/qiankun/QiankunWrapper.vue';
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'BasicLayout',
  components: {
    CcSider,
  },
  setup() {
    const router = useRouter();

    console.log('mainMain');

    let removeRouterAfterEach = ref(null);

    onBeforeMount(async () => {
      // something here
    });

    onMounted(() => {
      // something here
      // add one after guard
      if (!removeRouterAfterEach.value) {
        removeRouterAfterEach.value = router.afterEach((to) => {
          console.log('BasicLayout:afterEach', to.fullPath);
        });
      }
    });

    onUnmounted(() => {
      // 移除后置路由守卫
      if (removeRouterAfterEach.value) {
        removeRouterAfterEach.value();
        removeRouterAfterEach.value = null;
        console.log('BasicLayout: remove after guard');
      }
    });

    return {
      QiankunWrapper,
    };
  },
});
</script>

<style lang="less">
@import '../globalVar.less';
.trigger {
  font-size: 18px;
  line-height: 45px;
  padding: 3px 14px 0;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: @primary-color;
}

.header-left-fold {
  flex: none;
}
.header-content {
  flex: auto;
  width: calc(100% - 46px);
}
</style>
