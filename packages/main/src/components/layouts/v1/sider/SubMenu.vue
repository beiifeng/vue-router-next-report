<template>
  <a-sub-menu :key="menuInfo.id">
    <template #title>
      {{ menuInfo.name }}
    </template>
    <template v-for="item in menuInfo.children" :key="'template||' + item.id">
      <template v-if="!item.children">
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
      <template v-else>
        <sub-menu :menu-info="item" :key="item.id" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubMenu',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    return {};
  },
});
</script>
