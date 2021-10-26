<template>
  <el-container direction="vertical">
    <TheHeader />
    <router-view />
  </el-container>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import store from '@/store';

export default {
  components: {
    TheHeader,
  },
  setup() {
    store.dispatch('loadUserInfo');
    return {
    };
  },
};
</script>
