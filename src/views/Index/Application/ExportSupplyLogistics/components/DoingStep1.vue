<template>
  <el-form
    ref="formRef"
    :model="formModel"
    :rules="rules"
    label-width="100px"
    label-position="left"
    class="form"
    @submit.native.prevent="next"
  >
    <h4 class="form__section__title">
      企业信息
      <SelectEnterprise
        class="f-r"
        @select="onSelectEnterprise"
      />
    </h4>

    <el-row :gutter="40">
      <el-col :span="12">
        <el-form-item
          label="企业全称"
          prop="enterprise_name"
        >
          <el-input
            v-model="formModel.enterprise_name"
            placeholder="同营业执照上一致"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="企业注册地"
          prop="register_place"
        >
          <el-input
            v-model="formModel.register_place"
            placeholder="同营业执照上一致"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          label="企业类型"
          prop="enterprise_type"
        >
          <el-select
            v-model="formModel.enterprise_type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in ENTERPRISE_TYPE_OPTIONS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-form-item
          label="统一社会信用代码"
          prop="license_no"
          label-width="150px"
        >
          <el-input
            v-model="formModel.license_no"
            placeholder="同营业执照上一致"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item
      label="营业执照"
      prop="license_url"
    >
      <UploadImg v-model="formModel.license_url" />
    </el-form-item>

    <h4 class="form__section__title">
      商家信息
    </h4>
    <el-form-item
      label="用户名"
      prop="account"
    >
      <el-input
        v-model="formModel.account"
        class="input--inline"
      />
      <span
        class="tip"
      >
        登录转运中心商家会员端账号名，10位以内，英文或数字组成
      </span>
    </el-form-item>
    <el-form-item
      label="密码"
      prop="password"
    >
      <el-input
        v-model="formModel.password"
        class="input--inline"
        type="password"
      />
      <span
        class="tip"
      >登录转运中心商家会员端账号密码，18位以内，英文或数字组成</span>
    </el-form-item>
    <el-form-item
      label="确认密码"
      prop="rePassword"
    >
      <el-input
        v-model="formModel.rePassword"
        class="input--inline"
        type="password"
      />
      <span class="tip">再次确认登录密码</span>
    </el-form-item>
    <h4 class="form__section__title">
      联系方式
    </h4>
    <el-form-item
      label="联系人姓名"
      prop="link_name"
    >
      <el-input
        v-model="formModel.link_name"
        class="input--inline"
      />
      <span class="tip">平台使用相关负责人姓名</span>
    </el-form-item>
    <el-form-item
      label="联系电话"
      prop="link_tel"
    >
      <el-input
        v-model="formModel.link_tel"
        class="input--inline"
      />
      <span class="tip">平台使用相关负责人联系电话</span>
    </el-form-item>
    <el-form-item
      label="联系邮箱"
      prop="link_email"
    >
      <el-input
        v-model="formModel.link_email"
        class="input--inline"
      />
      <span class="tip">平台使用相关负责人联系邮箱</span>
    </el-form-item>
    <el-form-item
      label-width="0"
      class="t-c"
    >
      <el-button
        @click="save"
      >
        保 存
      </el-button>
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
  ref,
} from '@vue/composition-api';
import { Message, Form } from 'element-ui';
import md5 from 'md5';

import UploadImg from '@/components/UploadImg.vue';
import SelectEnterprise from '@/components/SelectEnterprise.vue';

import router from '@/router';
import { MOBILE_PATTERN } from '@/constants/pattern';
import { routes, KEY } from '../config';
import { save1, next1 } from '../api';

const ENTERPRISE_TYPE_OPTIONS = [
  {
    value: 0,
    label: '有限责任公司',
  },
  {
    value: 1,
    label: '个人独资企业',
  },
  {
    value: 2,
    label: '合资企业',
  },
  {
    value: 3,
    label: '其他',
  },
];

export default defineComponent({
  name: `Doing${KEY}Step1`,
  components: {
    UploadImg,
    SelectEnterprise,
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
      enterprise_name: '',
      enterprise_type: 0,
      license_no: '',
      register_place: '',
      license_url: '',
      account: '',
      password: '',
      rePassword: '',
      link_name: '',
      link_tel: '',
      link_email: '',
      ...props.data,
    });

    const validatePassword = (_rule: any, value: string, callback: Function) => {
      if (formModel.value.rePassword !== '') {
        formRef.value!.validateField('rePassword');
      }
      callback();
    };
    const validateRePassword = (_rule: any, value: string, callback: Function) => {
      if (value !== formModel.value.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      ENTERPRISE_TYPE_OPTIONS,

      formRef,

      formModel,
      rules: {
        enterprise_name: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        enterprise_type: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        license_no: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        register_place: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        license_url: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        account: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '必填项！', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' },
        ],
        rePassword: [
          { required: true, message: '必填项！', trigger: 'blur' },
          { validator: validateRePassword, trigger: 'blur' },
        ],
        link_name: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        link_tel: [
          { required: true, message: '必填项！', trigger: 'blur' },
          { pattern: MOBILE_PATTERN, message: '请输入符合格式的手机', trigger: 'blur' },
        ],
        link_email: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
      },
      async save() {
        try {
          emit('update:loading', true);
          const data = await save1(formModel.value);
          emit('patch:data', data);
          router.replace({ name: routes.doing.name, query: { id: `${data.service_id}` } });

          Message.success('保存成功');
        } finally {
          emit('update:loading', false);
        }
      },
      next() {
        // eslint-disable-next-line consistent-return
        formRef.value!.validate(async (valid: boolean) => {
          if (valid) {
            try {
              emit('update:loading', true);
              const data = await next1({
                ...formModel.value,
                password: md5(md5(formModel.value.password)),
                rePassword: md5(md5(formModel.value.rePassword)),
              });
              emit('patch:data', data);
              router.replace({ name: routes.doing.name, query: { id: `${data.service_id}` } });
            } finally {
              emit('update:loading', false);
            }
          } else {
            return false;
          }
        });
      },
      onSelectEnterprise(data: any) {
        Object.assign(formModel.value, data);
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

.form__section__title {
  padding: 0 12px;

  background: rgb(236, 239, 244);

  line-height: 40px;
}

.input--inline {
  width: 300px;
  margin-right: 12px;
}

.tip {
  color: #929292;
}
</style>
