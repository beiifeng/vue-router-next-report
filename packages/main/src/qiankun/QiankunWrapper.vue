<template>
  <div id="pageContainer" ref="containerRef"></div>
</template>
<script>
import { loadMicroApp } from 'qiankun';
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
} from 'vue';
import { apps, loadingMicroApp } from './index';
import { useQiankun } from './useQiankun';

const QiankunWrapper = defineComponent({
  name: 'QiankunWrapper',
  props: {
    name: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const qiankun = useQiankun();
    const containerRef = ref();
    let microApp = null;
    let propName = ref('');

    const loadQiankunApp = () => {
      const app = apps.filter((item) => item.name === props.name)[0];
      console.log(`[${app.name}] will load`);
      if (app) {
        microApp = loadMicroApp({
          ...app,
          props: {
            ...app.props,
          },
        });
        propName.value = props.name;
      }
      console.log(`[${app.name}] was loaded`);
      // startQiankun();
      qiankun.emmitGlobalStateChange({
        authority: {},
        layout: {},
        menu: {},
      });
    };

    const unloadQiankunApp = async () => {
      if (microApp) {
        console.log(`[${propName.value}] was unloaded`);
        return microApp.mountPromise.then(() => {
          microApp.unmount();
          microApp = null;
        });
      }
      return Promise.resolve('卸载成功');
    };

    onMounted(() => {
      loadQiankunApp();
    });

    onUpdated(async () => {
      console.log(`[${propName.value}] was updated`);
      if (propName.value !== props.name) {
        await unloadQiankunApp();
        loadQiankunApp();
        propName.value = props.name;
      }
    });

    onBeforeUnmount(() => {
      // something here
      unloadQiankunApp();
    });

    const handleGoback = () => {
      window.history.back();
    };

    const handleReload = () => {
      window.location.reload();
    };

    return {
      loadingMicroApp,
      handleGoback,
      handleReload,
      containerRef,
    };
  },
});

export default QiankunWrapper;
</script>
<style lang="less">
.microapp-full-modal {
  .@{ant-prefix}-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
    z-index: 1000;
  }
  .@{ant-prefix}-modal-content {
    height: calc(100vh);
    background-color: rgba(0, 0, 0, 0);
    filter: opacity(0.8);
  }
  .@{ant-prefix}-modal-body {
    text-align: center;
    padding-top: calc(50vh - 100px);
  }
}
</style>
