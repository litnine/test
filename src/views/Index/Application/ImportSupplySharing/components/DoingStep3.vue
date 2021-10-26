<template>
  <div class="t-c">
    <p style="margin-top: 40px">
      <StepSuccess
        title="跨境电商进口货源共享"
        message="申请成功"
      />
    </p>
    <p style="margin-top: 40px">
      您现在可以使用申请时填写的账号密码登录货源平台进口供货端
    </p>
    <p>
      <a
        href="http://www.kjgoods.com/"
        target="_blank"
      >www.kjgoods.com</a>
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
        @click="$router.push({ name: detailRouteName, query: { id: data.service_id } })"
      >
        查看申请
      </el-button>
    </p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@vue/composition-api';
import StepSuccess from '@/components/StepSuccess.vue';
import { routes, KEY } from '../config';

import { complete } from '../api';

export default defineComponent({
  name: `Doing${KEY}Step3`,
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
    return {
      detailRouteName: routes.detail.name,
    };
  },
});
</script>

<style scoped lang="scss">
</style>
