<template>
  <div>
    <div>
      <span class="irrelevant">申请详情</span>
      <span class="container__title">
        {{ title }}
      </span>
    </div>
    <p class="info">
      在这里查看已成功开通的服务申请详情
    </p>
    <el-divider />
    <el-row class="t-c">
      <el-col :span="8">
        申请单号： {{ data.apply_no }}
      </el-col>
      <el-col :span="8">
        申请开始日期： {{ data.apply_time }}
      </el-col>
      <el-col :span="8">
        申请完成日期： {{ data.success_time || data.apply_status }}
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@vue/composition-api';

export default defineComponent({
  name: 'DetailPageHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
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
