<template>
  <el-main class="subpage">
    <el-card class="main-box">
      <h2>完善企业信息</h2>
      <p class="warning">
        **&nbsp;&nbsp;平台将会审核企业提交的资料，审核完成后便可正常办理业务
      </p>
      <el-divider />
      <el-steps
        :space="400"
        :active="currentStep"
        align-center
        style="margin-bottom: 25px"
      >
        <el-step title="填写信息" />
        <el-step title="平台审核" />
        <el-step title="审核完成" />
      </el-steps>
      <FormEnterpriseInfo
        v-if="currentStep === 0"
        @validated="submit"
      >
        <el-button
          type="primary"
          native-type="submit"
        >
          确认无误，提交信息
        </el-button>
      </FormEnterpriseInfo>
      <div
        v-if="currentStep === 1"
        class="t-c"
      >
        <section
          class="section"
          style="color: #ff8d1a"
        >
          <i class="icon el-icon-warning" />
          <div>审核中</div>
        </section>
        <section
          class="section"
          style="color: #48b0fc"
        >
          信息已提交，请耐心等待平台审核<br>
          需要约1-3个工作日
        </section>
      </div>
      <div
        v-if="currentStep === 2"
        class="t-c"
      >
        <section class="section">
          <i
            class="icon el-icon-success"
            style="color: #48b0fc"
          />
          <div style="color: #a5d63f">
            企业信息认证成功
          </div>
        </section>
        <section
          class="section"
          style="color: #48b0fc;"
        >
          您可以办理平台上的外贸综合服务
          <p>
            <el-button>返回首页</el-button>
            <el-button type="primary">
              服务中心
            </el-button>
          </p>
        </section>
      </div>
    </el-card>
  </el-main>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from '@vue/composition-api';
import dayjs from 'dayjs';
import RegisterFormAccountInfo from '@/components/RegisterFormAccountInfo.vue';
import FormEnterpriseInfo from '@/components/FormEnterpriseInfo.vue';
import RegisterFinish from '@/components/RegisterFinish.vue';
import { updateEnterpriseInfo } from '@/api/home';
import store from '@/store';

export default defineComponent<{
  step: number;
}>({
  name: 'DoingImproveEnterpriseInfo',
  components: {
    RegisterFormAccountInfo,
    FormEnterpriseInfo,
    RegisterFinish,
  },
  props: {
    step: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const currentStep = ref(props.step);
    async function submit(data: any) {
      await updateEnterpriseInfo({
        ...data,
        startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
      });
      currentStep.value += 1;
      store.dispatch('loadUserInfo');
    }

    return {
      currentStep,
      submit,
    };
  },
});
</script>

<style scoped lang="scss">
.warning {
  color: #e33c64;

  font-size: 12px;
}
.section {
  margin: 80px auto;
  .icon {
    margin-bottom: 15px;

    font-size: 80px;
  }
}
</style>
