<template>
  <div id="pageContainer"></div>
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
import { apps } from './index';
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
    let microApp = null;
    let propName = ref('');

    const loadQiankunApp = () => {
      // find app to load
      const app = apps.filter((item) => item.name === props.name)[0];
      if (app) {
        console.log(`[${app.name}] will load`);
        microApp = loadMicroApp({
          ...app,
          props: {
            ...app.props,
          },
        });
        propName.value = props.name;
        console.log(`[${app.name}] was loaded`);
      }
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
      return Promise.resolve('no app can be unload.');
    };

    onMounted(() => {
      loadQiankunApp();
    });

    onUpdated(async () => {
      if (propName.value !== props.name) {
        console.log(`[${propName.value}] was updated`);
        await unloadQiankunApp();
        loadQiankunApp();
        propName.value = props.name;
      }
    });

    onBeforeUnmount(() => {
      // something here
      unloadQiankunApp();
    });

    return {};
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
