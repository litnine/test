<template>
  <div class="layout">
    <header class="sub-nav">
      <router-link
        to="/Order/Purchase"
      >
        订购单管理
      </router-link>
      <router-link
        to="/Order/Total"
      >
        总订单管理
      </router-link>
      <router-link
        to="/Order/Logistics"
      >
        物流线路管理
      </router-link>
    </header>
    <router-view />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
} from '@vue/composition-api';
import store from '@/store';

export default defineComponent({
  name: 'OrderManagement',
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
