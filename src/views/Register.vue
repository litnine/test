<template>
  <div class="page">
    <el-card class="main-box">
      <h2>账户注册</h2>
      <p class="warning">
        **&nbsp;&nbsp;新建账号后即可登录平台，待完善企业资料认证通过后开始办理平台服务
      </p>
      <el-divider />
      <el-steps
        :space="400"
        :active="currentStep"
        align-center
        style="margin-bottom: 25px"
      >
        <el-step title="新建账号" />
        <el-step title="企业资料" />
        <el-step title="完成" />
      </el-steps>
      <div class="container__content">
        <RegisterFormAccountInfo
          v-show="currentStep === 0"
          @validated="collectAccountInfoAndNext"
        />
        <div v-show="currentStep === 1">
          <p class="t-c">
            <span class="warning">注意：完善企业资料才能获得系统服务权限</span>
            <el-link
              class="skip"
              type="primary"
              :underline="false"
              @click="submitWithoutEnterpriseInfo"
            >
              点击跳过，稍后完善
            </el-link>
          </p>
          <FormEnterpriseInfo
            :etype.sync="managaertype"
            @validated="submitWithEnterpriseInfo"
          >
            <el-button
              @click="currentStep--"
            >
              上一步
            </el-button>
            <el-button
              type="primary"
              native-type="submit"
            >
              下一步
            </el-button>
            <el-button
              type="primary"
              plain
              @click="submitWithoutEnterpriseInfo"
            >
              跳过，稍后完善
            </el-button>
          </FormEnterpriseInfo>
        </div>
        <RegisterFinish v-if="currentStep === 2" />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
} from '@vue/composition-api';
import md5 from 'md5';
import dayjs from 'dayjs';
import RegisterFormAccountInfo from '@/components/RegisterFormAccountInfo.vue';
import FormEnterpriseInfo from '@/components/FormEnterpriseInfo.vue';
import RegisterFinish from '@/components/RegisterFinish.vue';
import { register, AdminRegister } from '@/api/permission';

export default defineComponent({
  name: 'Register',
  components: {
    RegisterFormAccountInfo,
    FormEnterpriseInfo,
    RegisterFinish,
  },
  setup() {
    const currentStep = ref(0);
    const accountInfo = ref(null as any);
    const managaertype = ref('3');
    const enterpriseInfo = ref(null as any);
    function collectAccountInfoAndNext(data: any) {
      if (data.userType === '1') {
        accountInfo.value = {
          ...data,
          password: md5(md5(data.password)),
          rePassword: md5(md5(data.rePassword)),
        };
      } else {
        accountInfo.value = {
          ...data,
          adminName: data.userName,
          password: md5(md5(data.password)),
          rePassword: md5(md5(data.rePassword)),
        };
      }
      managaertype.value = String(accountInfo.value.userType);
      currentStep.value += 1;
    }
    async function submit(data: any) {
      if (data.userType === '1') {
        await register(data);
      } else {
        await AdminRegister(data);
      }
      currentStep.value += 1;
    }
    function submitWithEnterpriseInfo(data: any) {
      enterpriseInfo.value = {
        ...data,
        startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(data.endDate).format('YYYY-MM-DD'),
      };
      submit({
        ...accountInfo.value,
        enterprise: {
          ...enterpriseInfo.value,
        },
      });
    }
    function submitWithoutEnterpriseInfo() {
      submit({
        ...accountInfo.value,
      });
    }

    return {
      currentStep,
      accountInfo,
      managaertype,
      collectAccountInfoAndNext,
      submitWithEnterpriseInfo,
      submitWithoutEnterpriseInfo,
    };
  },
});
</script>

<style scoped>
.page {
  padding: 20px;
}
.warning {
  font-size: 14px;
  color: #e33c64;
}
.skip {
  margin-left: 30px;
  vertical-align: baseline;
}
</style>
