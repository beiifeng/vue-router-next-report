<template>
  <a-result status="404" title="404" sub-title="抱歉，你访问的页面不存在">
    <template #extra>
      <a-button type="primary" @click="toHome"> 首页 </a-button>
    </template>
  </a-result>
</template>

<script>
import { DEFAULT_HOME_PAGE } from '@/config/globalConfig';
import { defineComponent } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Exception404',
  setup() {
    const router = useRouter();

    const toHome = () => {
      router.push({ path: DEFAULT_HOME_PAGE });
    };

    return {
      toHome,
    };
  },
});
</script>
