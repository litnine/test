<template>
  <div>
    <div>
      <span class="irrelevant">正在办理</span>
      <span class="container__title">
        {{ title }}
      </span>
    </div>
    <p class="info">
      在这里办理当前正在申请开通的服务项目
    </p>
    <el-divider />
    <p v-if="data.apply_no">
      当前申请单号：{{ data.apply_no }}
    </p>
    <el-steps
      :space="400"
      :active="data.step - 1"
      align-center
      style="margin-bottom: 25px"
    >
      <el-step
        v-for="(step, i) in steps"
        :key="i"
        :title="step"
      />
    </el-steps>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@vue/composition-api';

export default defineComponent({
  name: 'DoingPageHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    steps: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.irrelevant {
  font-size: 18px;
}

.container__title {
  margin-left: 0.5em;

  color: rgb(255, 141, 26);

  font-size: 25px;
}

.info {
  color: rgb(166, 166, 166);

  font-size: 12px;
}
</style>
