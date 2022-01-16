<template>
  <div class="page-container">
    <header class="page-header">
      <h1>BEIIFENG</h1>
    </header>
    <section class="page-content">
      <router-view></router-view>
    </section>
    <footer class="page-footer">
      <p>
        Copyright &copy; 2018-{{ new Date().getFullYear() }}
        BEIIFENG 版权所有
      </p>
    </footer>
  </div>
</template>
<script>
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  setup() {
    onMounted(() => {
      // 1.判断是否需要清除登录信息
    });
  },
});
</script>

<style lang="less" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: 100vh;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 64px;
  padding: 0 50px;
  color: rgba(0, 0, 0, 0.85);
  h1 {
    margin: 0.5em;
  }
}
.page-content {
  background-image: url('/background.png');
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: calc(100vh - 64px - 5em);
  min-height: 400px;
}
.page-footer {
  height: 4em;
  padding: 0 1.5em;
  margin: 0.5em 0;
  text-align: center;
}
</style>
