<template>
  <el-form
    ref="formRef"
    :model="formModel"
    :rules="rules"
    label-width="150px"
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
          label="办理企业"
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
      <el-col :span="12">
        <el-form-item
          label="企业类型"
          prop="enterprise_type"
        >
          <el-select
            v-model="formModel.enterprise_type"
            placeholder="请选择"
            style="width: 100%;"
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
      <el-col :span="12">
        <el-form-item
          label="统一社会信用代码"
          prop="license_no"
        >
          <el-input
            v-model="formModel.license_no"
            placeholder="同营业执照上一致"
          />
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item
          label="营业执照"
          prop="license_url"
        >
          <UploadImg v-model="formModel.license_url" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="电商企业海关备案号"
          prop="e_custom_num"
        >
          <el-input v-model="formModel.e_custom_num" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="电商平台企业名"
          prop="platform_name"
        >
          <el-input v-model="formModel.platform_name" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="电商平台海关备案号"
          prop="p_custom_num"
        >
          <el-input v-model="formModel.p_custom_num" />
        </el-form-item>
      </el-col>
    </el-row>

    <h4 class="form__section__title">
      资质参数
    </h4>
    <el-form-item
      label="现场海关或口岸名"
      prop="port_name"
    >
      <el-input
        v-model="formModel.port_name"
        class="input--inline"
      />
      <span class="tip">
        将会实行跨境电商业务的现场海关/口岸名
      </span>
    </el-form-item>
    <el-form-item
      label="DXPID"
      prop="dxpid"
    >
      <el-input
        v-model="formModel.dxpid"
        class="input--inline"
      />
      <span class="tip">当地单一窗口或数据分中心申请下发的数据传输密钥</span>
    </el-form-item>
    <el-form-item
      label="操作员卡账号"
      prop="cart_account"
    >
      <el-input
        v-model="formModel.cart_account"
        class="input--inline"
      />
      <span class="tip">加签用操作员key的登录账号/编号</span>
    </el-form-item>
    <el-form-item
      label="操作员卡密码"
      prop="cart_password"
    >
      <el-input
        v-model="formModel.cart_password"
        class="input--inline"
        type="password"
      />
      <span class="tip">加签用操作员key的登录密码</span>
    </el-form-item>
    <h4 class="form__section__title">
      技术参数
    </h4>
    <el-form-item
      label="单一窗口"
      prop="single_window"
    >
      <el-select
        v-model="formModel.single_window"
        class="input--inline"
        placeholder="请选择"
      >
        <el-option
          v-for="item in SINGLE_WINDOW_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span
        class="tip"
      >请先选择当地单一窗口，不同地方的单一窗口所需要的参数不完全一致</span>
    </el-form-item>
    <section v-if="selectedSingleWindowName">
      <p class="subsection__title">
        <i class="subsection__title__icon el-icon-s-flag" /> {{ selectedSingleWindowName }}
      </p>
      <el-row
        :gutter="40"
        style="padding-left: 50px;"
      >
        <el-col :span="12">
          <el-form-item
            label="企业备案编号"
            prop="enterprise_record_number"
          >
            <el-input v-model="formModel.enterprise_record_number" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="加签客户端ftp账号"
            prop="ftp_account"
          >
            <el-input v-model="formModel.ftp_account" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="加签客户端ftp密码"
            prop="p_custom_num"
          >
            <el-input
              v-model="formModel.ftp_password"
              type="password"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </section>
    <el-form-item
      label-width="0"
      class="t-c"
    >
      <el-button @click="save">
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
/* eslint-disable @typescript-eslint/camelcase */
import {
  defineComponent,
  ref,
  computed,
} from '@vue/composition-api';
import { Message, Form } from 'element-ui';
import md5 from 'md5';

import UploadImg from '@/components/UploadImg.vue';
import SelectEnterprise from '@/components/SelectEnterprise.vue';

import { KEY } from '../config';
import { save3, next3, ExportOrderReport } from '../api';

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

const SINGLE_WINDOW_OPTIONS = [
  {
    value: 0,
    label: '广州单一窗口',
  },
  {
    value: 1,
    label: '深圳单一窗口',
  },
  {
    value: 2,
    label: '海南单一窗口',
  },
  {
    value: 3,
    label: '南昌单一窗口',
  },
];

export default defineComponent({
  name: `Doing${KEY}Step3`,
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

    const formModel = ref({ ...props.data } as ExportOrderReport);

    return {
      ENTERPRISE_TYPE_OPTIONS,
      SINGLE_WINDOW_OPTIONS,

      formRef,

      formModel,
      selectedSingleWindowName: computed(() => {
        const item = SINGLE_WINDOW_OPTIONS.find((opt) => opt.value === formModel.value.single_window);
        if (item) {
          return item.label;
        }
        return null;
      }),
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
        e_custom_num: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        platform_name: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        p_custom_num: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        port_name: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        dxpid: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        cart_account: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        cart_password: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        single_window: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        enterprise_record_number: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        ftp_account: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        ftp_password: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
      },
      async save() {
        try {
          emit('update:loading', true);
          const data = await save3(formModel.value);
          emit('patch:data', data);

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
              const data = await next3({
                ...formModel.value,
                cart_password: md5(md5(formModel.value.cart_password)),
                ftp_password: md5(md5(formModel.value.ftp_password)),
              });
              emit('patch:data', data);
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
  width: 280px;
  margin-right: 12px;
}

.tip {
  color: #929292;
}

.subsection__title {
  color: #409eff;
}

.subsection__title__icon {
  font-size: 250%;
  vertical-align: middle;
}
</style>
