<template>
  <el-form
    ref="formRef"
    :model="formModel"
    :rules="rules"
    label-width="160px"
    label-position="left"
    class="form"
    @submit.native.prevent="next"
  >
    <p class="global-tip">
      <i class="el-icon-question" />
      <span>
        线下办理银行开户，需要留下办理/代办人联系方式
      </span>
    </p>
    <div class="t-c">
      <span><i class="el-icon-house red big--size" /></span>
      <span><i class="el-icon-d-arrow-right yellow big--size" /></span>
      <span><i class="el-icon-bank-card red big--size" /></span>
      <span><i class="el-icon-d-arrow-right yellow big--size" /></span>
      <span><i class="el-icon-bank-card red big--size" /></span>
    </div>

    <el-form-item
      label="办理/代办人姓名"
      prop="agent_name"
      class="left"
    >
      <el-input
        v-model="formModel.agent_name"
        class="input--inline"
      />
      <span class="tip">
        办理人真实姓名
      </span>
    </el-form-item>
    <el-form-item
      label="办理/代办人联系电话"
      prop="agent_tel"
      class="left"
    >
      <el-input
        v-model="formModel.agent_tel"
        class="input--inline"
      />
      <span class="tip">办理人联系电话，非固定电话</span>
    </el-form-item>
    <el-form-item
      label="办理/代办人联系邮箱"
      prop="agent_email"
      class="left"
    >
      <el-input
        v-model="formModel.agent_email"
        class="input--inline"
      />
      <span class="tip">办理人常用邮箱</span>
    </el-form-item>
    <el-form-item
      label-width="0"
      class="t-c"
    >
      <el-button
        type="primary"
        :disabled="submissionFlag"
        @click="submissionFlag=true,text='已提交'"
      >
        {{ text }}
      </el-button>
    </el-form-item>
    <el-divider />
    <p class="global-tip">
      <i class="el-icon-question" />
      <span>
        线下开户完成后，获取回执编码，填入编码即可到下一步
      </span>
    </p>

    <el-form-item
      label="回执编码"
      prop="receipt_no"
      class="left"
    >
      <el-input
        v-model="formModel.receipt_no"
        class="input--inline"
      />
      <span class="tip">开户完成后，平台返回回执编码</span>
    </el-form-item>
    <el-form-item
      label-width="0"
      class="t-c"
    >
      <el-button
        type="primary"
        native-type="submit"
      >
        下一步
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { defineComponent, ref } from '@vue/composition-api';
// import { Message, Form } from 'element-ui';
import { Form } from 'element-ui';
import UploadImg from '@/components/UploadImg.vue';
// import { save1, next1 } from '@/api/exportSupplyExchange';
import router from '@/router';
import { MOBILE_PATTERN } from '@/constants/pattern';

export default defineComponent({
  name: 'DoingExportSupplyExchangesStep1',
  components: {
    UploadImg,
  },
  props: {
    loading: Boolean,
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const formRef = ref(null as Form | null);

    const formModel = ref({
      agent_name: '',
      agent_tel: '',
      agent_email: '',
      receipt_no: '',
    });
    const submissionFlag = false;
    const text = '提交';
    return {
      formRef,
      text,
      formModel,
      submissionFlag,
      rules: {
        agent_name: [{ required: true, message: '必填项！', trigger: 'blur' }],
        agent_tel: [{ required: true, message: '必填项！', trigger: 'blur' },
          { pattern: MOBILE_PATTERN, message: '请输入符合格式的手机', trigger: 'blur' }],
        agent_email: [{ required: true, message: '必填项！', trigger: 'blur' },
          { type: 'email', message: '请输入符合格式的邮箱地址', trigger: 'blur' }],
        receipt_no: [{ required: true, message: '必填项！', trigger: 'blur' }],
      },

      next() {
        // eslint-disable-next-line consistent-return
        formRef.value!.validate(async (valid: boolean) => {
          if (valid) {
            try {
              emit('update:loading', true);

              router.replace({ name: 'DoingExportSupplyExchange', query: { id: '2' } });
            } finally {
              emit('update:loading', false);
            }
          } else {
            return false;
          }
        });
      },
    };
  },
});
</script>

<style scoped lang="scss">
.form {
  width: 900px;
  margin: auto;
}
.left {
  margin-left: 100px;
}
.form__section__title {
  padding: 0 12px;

  background: rgb(236, 239, 244);

  line-height: 40px;
}
.yellow {
  color: #ffc300;
}
.red {
  color: #d43030;
}
.big--size {
  font-weight: bolder;
  font-size: 50px;
  margin: 20px;
}
.global-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  .el-icon-question {
    margin-right: 10px;

    color: #ffc300;

    font-size: 30px;
  }
}
.input--inline {
  width: 300px;
  margin-right: 12px;
}

.tip {
  color: #929292;
}
</style>
