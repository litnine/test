<template>
  <el-container direction="vertical">
    <header class="sub-nav">
      <!-- <router-link
        to="/service/enterprise"
      >
        企业资质
      </router-link> -->
      <!-- <router-link
        to="/service/import"
      >
        跨境电商进口
      </router-link> -->
      <router-link
        to="/service/export"
      >
        跨境电商出口
      </router-link>
      <router-link
        to="/application/doing"
        event="none"
        style="cursor: default"
      >
        正在办理
      </router-link>
      <router-link
        to="/application/list"
      >
        申请列表
      </router-link>
      <router-link
        to="/application/detail"
        event="none"
        style="cursor: default"
      >
        申请详情
      </router-link>
    </header>
    <router-view />
  </el-container>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@vue/composition-api';

export default defineComponent({
  components: {
  },
  setup() {
    return {
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sub-nav {
  position: relative;
  z-index: 8;

  text-align: center;

  background: #f8f8f8;
  box-shadow: 0 0 10px #999;

  font-size: 14px;
  line-height: 40px;
  a {
    margin: 0 4em;

    color: inherit;
  }
  .router-link-active {
    color: #409EFF;
  }
}
</style>
