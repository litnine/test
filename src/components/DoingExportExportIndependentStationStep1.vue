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
    <p class="global-tip">
      <i class="el-icon-question" />
      <span>
        选择不同的独立站类型，技术处理内容也不相同
      </span>
    </p>
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
      <el-col :span="12">
        <el-form-item
          label="营业执照注册编号"
          prop="license_no"
          label-width="150px"
        >
          <el-input
            v-model="formModel.license_no"
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
    </el-row>
    <el-form-item
      label="营业执照"
      prop="license_url"
    >
      <UploadImg v-model="formModel.license_url" />
    </el-form-item>
    <span class="tip-text">
      · 证件包含：身份证、护照、来往内地通行证等有效证件。
      <br>
      <br>
      · 其中护照需要增加翻译件,加盖公司鲜章,外籍商家姓名需为中文(英文),如张三(Zhangsan)
      <br>
      <br>
      · 照片标准：四角完整，清晰可辨。若加水印需保证照片重要信息清晰可辨；
      <br>
      <br>
      · 法人证件非大陆身份证（如护照等）时，需要提供法人证明函。
    </span>
    <el-form-item
      label="法人证件照（正面）"
      prop="passport_photo_front_url"
    >
      <UploadImg v-model="formModel.passport_photo_front_url" />
    </el-form-item><el-form-item
      label="法人证件照（反面）"
      prop="passport_photo_back_url"
    >
      <UploadImg v-model="formModel.passport_photo_back_url" />
    </el-form-item><el-form-item
      label="法人持证照"
      prop="holding_photo_url"
    >
      <UploadImg v-model="formModel.holding_photo_url" />
    </el-form-item>

    <h4 class="form__section__title">
      独立站信息
    </h4>
    <el-form
      label-width="150px"
      :rules="rules"
    >
      <el-form-item
        label="独立站名称"
        prop="site_name"
      >
        <el-input
          v-model="formModel.site_name"
          class="input--inline"
        />
        <span
          class="tip"
        >
          即店铺/商城/平台对外展示名称
        </span>
      </el-form-item>
      <el-form-item
        label="独立站类型"
        prop="site_type"
      >
        <el-select
          v-model="formModel.site_type"
          class="input--inline"
          placeholder="请选择"
        >
          <el-option
            v-for="item in ENTERPRISE_TYPE_OPTIONS"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span
          class="tip"
        >选择需要办理的独立类型</span>
      </el-form-item>
      <el-form-item
        label="独立站负责人"
        prop="site_leader"
      >
        <el-input
          v-model="formModel.site_leader"
          class="input--inline"
        />
        <span class="tip">管理独立站的主要负责人姓名</span>
      </el-form-item>
      <el-form-item
        label="独立站负责人电话"
        prop="leader_phone"
      >
        <el-input
          v-model="formModel.leader_phone"
          class="input--inline"
        />
        <span class="tip">管理独立站的主要负责人电话</span>
      </el-form-item>
      <el-form-item
        label="独立站负责人邮箱"
        prop="leader_email"
      >
        <el-input
          v-model="formModel.leader_email"
          class="input--inline"
        />
        <span class="tip">管理独立站的主要负责人邮箱</span>
      </el-form-item>
    </el-form>
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
/* eslint-disable @typescript-eslint/camelcase */
import {
  defineComponent,
  ref,
} from '@vue/composition-api';
import { Message, Form } from 'element-ui';
// import md5 from 'md5';

import UploadImg from '@/components/UploadImg.vue';
import SelectEnterprise from '@/components/SelectEnterprise.vue';

// import router from '@/router';
import { MOBILE_PATTERN } from '@/constants/pattern';

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

// const SITE_TYPE_OPTIONS = [
//   {
//     value: 0,
//     label: '微信小程序',
//   },
//   {
//     value: 1,
//     label: '微信H5链接',
//   },
//   {
//     value: 2,
//     label: 'PC网站商城',
//   },
// ];

export default defineComponent({
  name: 'DoingExportSupplySharingStep1',
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
      passport_photo_front_url: '',
      passport_photo_back_url: '',
      holding_photo_url: '',
      site_name: '',
      site_type: 0,
      site_leader: '',
      leader_phone: '',
      leader_email: '',
      ...props.data,
    });

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
        passport_photo_front_url: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        passport_photo_back_url: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        holding_photo_url: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        site_name: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        site_type: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        site_leader: [
          { required: true, message: '必填项！', trigger: 'blur' },
        ],
        leader_phone: [
          { required: true, message: '必填项！', trigger: 'blur' },
          { pattern: MOBILE_PATTERN, message: '请输入符合格式的手机', trigger: 'blur' },
        ],
        leader_email: [
          { required: true, message: '必填项！', trigger: 'blur' },
          { type: 'email', message: '请输入符合格式的邮箱地址', trigger: 'blur' },
        ],
      },
      async save() {
        try {
          emit('update:loading', true);
          //   const data = await save(formModel.value);
          //   emit('patch:data', data);
          //   router.replace({ name: 'DoingExportSupplySharing', query: { id: `${data.service_id}` } });

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
            //   const data = await next({formModel.value});
            //   emit('patch:data', data);
            //   router.replace({ name: 'DoingExportSupplySharing', query: { id: `${data.service_id}` } });
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
.tip-text {
  color: #929292;
  display: block;
  position: absolute;
  left: 500px;
}
.tip {
  color: #929292;
  position: relative;
  left: 30px;
}
</style>
