<template>
  <a-result status="500" title="500" sub-title="页面开发中，请重试">
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
  name: 'Exception500',
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
