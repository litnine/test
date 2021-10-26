<template>
  <div class="t-c">
    <p style="margin-top: 40px">
      <StepSuccess
        title="跨境电商出口收结汇（B2C）"
        message="申请成功"
      />
    </p>
    <p style="margin-top: 60px">
      <el-button>下载指南</el-button>
      <el-button
        type="primary"
        @click="$router.push('/')"
      >
        返回首页
      </el-button>
      <el-button
        type="primary"
        @click="$router.push({ name: 'DetailExportSupplyExchange', query: { id: data.service_id } })"
      >
        查看申请
      </el-button>
    </p>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import {
  defineComponent,
} from '@vue/composition-api';
import StepSuccess from '@/components/StepSuccess.vue';

import { complete } from '@/api/exportSupplyExchange';

export default defineComponent({
  name: 'DoingExportSupplyExchangeStep4',
  components: {
    StepSuccess,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    (function request() {
      complete({ service_id: props.data.service_id });
    }());
  },
});
</script>

<style scoped lang="scss">
</style>
