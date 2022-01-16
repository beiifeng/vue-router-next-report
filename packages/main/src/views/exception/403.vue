<template>
  <a-result
    status="403"
    title="403"
    sub-title="抱歉，你当前角色组未添加访问该页面许可"
  >
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
  name: 'Exception403',
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
