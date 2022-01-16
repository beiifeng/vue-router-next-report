<template>
  <a-config-provider
    :locale="locale"
    :autoInsertSpaceInButton="false"
    :prefixCls="ANT_PREFIX"
    componentSize="small"
  >
    <div v-if="!isMicro" style="display: flex; flex: auto; flex-direction: row">
      <aside
        style="
          overflow: auto;
          height: 100vh;
          line-height: 100vh;
          left: 0;
          flex: 0 0 212px;
          width: 212px;
          background-image: linear-gradient(#f47443, #f47443, #bb1b21);
        "
      >
        sider may be with 212px
      </aside>
      <section
        style="height: 100vh; display: flex; flex: auto; flex-direction: column"
      >
        <div
          style="
            height: 48px;
            line-height: 48px;
            background-image: linear-gradient(
                270deg,
                #bb1b21 3%,
                #fb733f 20%,
                #bb1b21 83%
              ),
              linear-gradient(#fff, #fff);
            text-align: center;
            width: calc(100vw - 212px);
          "
        >
          Header's height is 48px
        </div>
        <div
          style="
            padding: 10px 20px 0;
            background-color: rgb(240, 242, 245);
            width: calc(100vw - 252px);
          "
        >
          <router-view />
        </div>
      </section>
    </div>
    <div v-else>
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { defineComponent } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { ANT_PREFIX } from '@/config/globalConfig';
import { useQiankun } from '@/qiankun/useQiankun';

export default defineComponent({
  setup() {
    const qiankun = useQiankun();
    return {
      isMicro: qiankun.isMicro,
      locale: zhCN,
      ANT_PREFIX,
    };
  },
});
</script>

<style>
body {
  margin: 0;
  background-color: #fff;
}
</style>
