<template>
  <div class="layout">
    <header class="sub-nav">
      <router-link
        to="/enterprise/management"
        event="none"
        style="cursor: default"
      >
        企业设置
      </router-link>
      <router-link
        to="/enterprise/list"
      >
        企业列表
      </router-link>
      <router-link
        to="/enterprise/data"
        event="none"
        style="cursor: default"
      >
        企业数据
      </router-link>
    </header>
    <router-view />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@vue/composition-api';

export default defineComponent({
  name: 'EnterpriseManagement',
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
.layout {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.sub-nav {
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
