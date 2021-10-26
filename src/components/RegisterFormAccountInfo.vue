<template>
  <el-form
    ref="formRef"
    class="form"
    :model="formModel"
    :rules="rules"
    label-width="100px"
    @submit.native.prevent="validate"
  >
    <el-form-item
      label="账号类型："
      prop="userType"
    >
      <el-select
        v-model="formModel.userType"
        placeholder="请选择"
      >
        <el-option
          label="管理员"
          value="0"
        />
        <el-option
          label="企业商户"
          value="1"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="用户名："
      prop="userName"
    >
      <el-input
        v-model="formModel.userName"
        autocomplete="off"
      />
      <span class="tip">
        可由4-18个字母（不分大小写）、数字、汉字或下划线等字符组成
      </span>
    </el-form-item>
    <el-form-item
      label="密码："
      prop="password"
    >
      <el-input
        v-model="formModel.password"
        type="password"
        @input="monitorPassword"
      />
      <!-- <span class="tip">密码强度：{{ passwordComplexity }}</span> -->
    </el-form-item>
    <el-form-item
      label="确认密码："
      prop="rePassword"
    >
      <el-input
        v-model="formModel.rePassword"
        type="password"
      />
    </el-form-item>
    <el-form-item
      label="联系邮箱："
      prop="email"
    >
      <el-input v-model="formModel.email" />
      <span class="tip">用于接收相关通知、找回密码，请认真填写</span>
    </el-form-item>
    <!-- <el-form-item label="验证码：" prop="captcha">
      <el-input v-model="formModel.captcha" />
      <el-button type="info">
        发送邮箱验证码
      </el-button>
      <span
        class="tip"
        style="margin-left: 12px;"
      >验证码已发送，10分钟内有效，请尽快验证！</span>
    </el-form-item> -->
    <el-form-item
      class="t-c"
      label-width="0"
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
import {
  defineComponent,
  reactive,
  ref,
} from '@vue/composition-api';
import { Form } from 'element-ui';

export default defineComponent({
  name: 'RegisterFormAccountInfo',
  setup(_props, { emit }) {
    const formRef = ref(null as Form | null);
    const formModel = reactive({
      userType: '',
      userName: '',
      password: '',
      rePassword: '',
      email: '',
      captcha: '',
    });
    function validate() {
      formRef.value!.validate((valid: boolean) => {
        if (valid) {
          return emit('validated', formModel);
        }
        return false;
      });
    }
    const validatePassword = (_rule: any, value: string, callback: Function) => {
      if (formModel.rePassword !== '') {
        formRef.value!.validateField('rePassword');
      }
      callback();
    };
    const validateRePassword = (_rule: any, value: string, callback: Function) => {
      if (value !== formModel.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    const passwordComplexity = ref(0);
    const getPasswordComplexity = (val: string) => {
      let i = 0;
      if (val.length < 6) {
        return i;
      }
      const regExps = [/\d/, /[a-z]/, /[A-Z]/, /_/];
      regExps.forEach((regExp) => {
        if (regExp.test(val)) {
          i += 1;
        }
      });
      return i;
    };
    const monitorPassword = (val: string) => {
      passwordComplexity.value = getPasswordComplexity(val);
    };
    return {
      formRef,
      formModel,
      validate,
      rules: {
        userType: [
          { required: true, message: '请选择账户类型', trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { pattern: /^\w{4,18}$/, message: '请输入符合格式的用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' },
        ],
        rePassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateRePassword, trigger: 'blur' },
        ],
        email: [
          { required: true, message: '联系邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入符合格式的邮箱地址', trigger: 'blur' },
        ],
      },
      passwordComplexity,
      monitorPassword,
    };
  },
});
</script>

<style scoped>
.form {
  margin: auto;
  max-width: 800px;
}
.el-input {
  margin-right: 12px;
  width: 200px;
}
.tip {
  color: #929292;
}
</style>
