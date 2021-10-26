<template>
  <el-form
    ref="formRef"
    class="form"
    :model="formModel"
    :rules="rules"
    label-width="230px"
    @submit.native.prevent="validate"
  >
    <el-form-item
      label="统一社会信用代码："
      prop="uscCode"
    >
      <el-input v-model="formModel.uscCode" />
      <span class="tip">与营业执照上一致 </span>
    </el-form-item>
    <el-form-item
      label="企业中文名称："
      prop="enterpriseName"
    >
      <el-input v-model="formModel.enterpriseName" />
      <span class="tip">与营业执照上一致</span>
    </el-form-item>
    <el-form-item
      label="法人姓名："
      prop="chargeName"
    >
      <el-input v-model="formModel.chargeName" />
      <span class="tip">与营业执照上一致</span>
    </el-form-item>
    <el-form-item
      label="法人证件类型："
      prop="chargeCertType"
    >
      <el-select
        v-model="formModel.chargeCertType"
        placeholder="请选择"
      >
        <el-option
          v-for="item in CERTIFICATE_TYPE_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="法人证件号码："
      prop="chargeCertNum"
    >
      <el-input v-model="formModel.chargeCertNum" />
    </el-form-item>
    <el-form-item
      label="身份证有效起始日期："
      prop="startDate"
    >
      <el-date-picker v-model="formModel.startDate" />
    </el-form-item>
    <el-form-item
      label="身份证有效结束日期："
      prop="endDate"
    >
      <el-date-picker v-model="formModel.endDate" />
    </el-form-item>
    <el-form-item
      label="业务联系人真实姓名："
      prop="bLinkName"
    >
      <el-input v-model="formModel.bLinkName" />
      <span class="tip">企业开展业务时具体负责人或联系人</span>
    </el-form-item>
    <el-form-item
      label="业务联系人手机："
      prop="bLinkTel"
    >
      <el-input v-model="formModel.bLinkTel" />
    </el-form-item>
    <el-form-item
      label="技术联系人真实姓名："
      prop="tLinkName"
    >
      <el-input v-model="formModel.tLinkName" />
      <span class="tip">企业完成技术对接等相关技术工作的具体负责人或联系人</span>
    </el-form-item>
    <el-form-item
      label="技术联系人手机："
      prop="tLinkTel"
    >
      <el-input v-model="formModel.tLinkTel" />
    </el-form-item>
    <el-form-item
      label="企业类型（多选）："
      prop="enterpriseType"
    >
      <el-checkbox-group v-model="formModel.enterpriseType">
        <el-checkbox
          v-for="item in ENTERPRISE_TYPE_OPTIONS"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item
      label="拟开展跨境电子商务业务类型（多选）："
      prop="businessType"
    >
      <div>
        <el-checkbox-group v-model="formModel.businessType">
          <el-checkbox
            v-for="item in BUSINESS_TYPE_OPTIONS"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </el-form-item>
    <el-form-item
      label="上传营业执照复印件（盖章）："
      prop="licenseUrl"
    >
      <UploadImg v-model="formModel.licenseUrl" />
    </el-form-item>
    <el-form-item
      label="企业 LOGO"
      prop="licenseUrl"
    >
      <UploadImg
        v-model="formModel.logo_url"
        class="logo-uploader"
        :cropper="{
          aspectRatio: 194 / 194,
          getCroppedCanvasOptions: {
            maxWidth: 194 * 3,
            maxHeight: 194 * 3
          }
        }"
        :body-style="{
          width: '194px',
          height: '194px'
        }"
      />
    </el-form-item>
    <el-form-item
      label="邀请码："
      prop="inviteCode"
    >
      <el-input v-model="formModel.inviteCode" />
    </el-form-item>
    <el-form-item
      class="t-c"
      label-width="0"
    >
      <slot />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api';
import { Form } from 'element-ui';
import { MOBILE_PATTERN } from '@/constants/pattern';
import UploadImg from './UploadImg.vue';

const CERTIFICATE_TYPE_OPTIONS = [
  {
    label: '身份证',
    value: 0,
  },
  {
    label: '护照',
    value: 1,
  },
];

const ENTERPRISE_TYPE_OPTIONS = [
  {
    label: '平台企业',
    value: 0,
  },
  {
    label: '跨境电商企业',
    value: 1,
  },
  {
    label: '境内代理人',
    value: 2,
  },
  {
    label: '持货商家',
    value: 3,
  },
  {
    label: '普通商家',
    value: 4,
  },
  {
    label: '境内服务商',
    value: 5,
  },
];

const BUSINESS_TYPE_OPTIONS = [
  {
    label: '9610（零售出口）',
    value: 0,
  },
  {
    label: '9710（B2B出口）',
    value: 1,
  },
  {
    label: '9810（海外仓-出口）',
    value: 2,
  },
  {
    label: '1210（保税进口）',
    value: 3,
  },
  {
    label: '9610（直购进口）',
    value: 4,
  },
  {
    label: '1210（保税出口）',
    value: 5,
  },
];

export default defineComponent({
  name: 'FormEnterpriseInfoMaster',
  components: {
    UploadImg,
  },
  setup(_, { emit }) {
    const formRef = ref(null as Form | null);
    const formModel = reactive({
      uscCode: '',
      // 统一社会信用代码：
      enterpriseName: '',
      // 企业中文名称：
      chargeName: '',
      // 法人姓名：
      chargeCertType: '',
      // 法人证件类型：
      chargeCertNum: '',
      // 法人证件号码：
      startDate: '',
      // 身份证有效起始日期：
      endDate: '',
      // 身份证有效结束日期：
      bLinkName: '',
      // 业务联系人真实姓名：
      bLinkTel: '',
      // 业务联系人手机：
      tLinkName: '',
      // 技术联系人真实姓名：
      tLinkTel: '',
      // 技术联系人手机：
      enterpriseType: [],
      businessType: [],
      licenseUrl: '',
      // eslint-disable-next-line @typescript-eslint/camelcase
      logo_url: '',
      inviteCode: '',
    });
    function validate() {
      formRef.value!.validate((valid: boolean) => {
        if (valid) {
          return emit('validated', formModel);
        }
        return false;
      });
    }
    return {
      CERTIFICATE_TYPE_OPTIONS,
      ENTERPRISE_TYPE_OPTIONS,
      BUSINESS_TYPE_OPTIONS,
      formRef,
      formModel,
      validate,
      rules: {
        uscCode: [{ required: true, message: '必填项！', trigger: 'blur' }],
        enterpriseName: [{ required: true, message: '必填项！', trigger: 'blur' }],
        chargeName: [{ required: true, message: '必填项！', trigger: 'blur' }],
        chargeCertType: [{ required: true, message: '必填项！', trigger: 'blur' }],
        chargeCertNum: [{ required: true, message: '必填项！', trigger: 'blur' }],
        startDate: [{ required: true, message: '必填项！', trigger: 'blur' }],
        endDate: [{ required: true, message: '必填项！', trigger: 'blur' }],
        bLinkName: [{ required: true, message: '必填项！', trigger: 'blur' }],
        bLinkTel: [
          { required: true, message: '必填项！', trigger: 'blur' },
          { pattern: MOBILE_PATTERN, message: '请输入符合格式的手机', trigger: 'blur' },
        ],
        tLinkName: [{ required: true, message: '必填项！', trigger: 'blur' }],
        tLinkTel: [
          { required: true, message: '必填项！', trigger: 'blur' },
          { pattern: MOBILE_PATTERN, message: '请输入符合格式的手机', trigger: 'blur' },
        ],
        enterpriseType: [{ required: true, message: '必填项！', trigger: 'blur' }],
        businessType: [{ required: true, message: '必填项！', trigger: 'blur' }],
        licenseUrl: [{ required: true, message: '必填项！', trigger: 'blur' }],
        inviteCode: [{ required: true, message: '必填项！', trigger: 'blur' }],
      },
    };
  },
});
</script>

<style scoped lang="scss">
.form {
  max-width: 850px;
  margin: auto;
}

.el-input,
.el-select {
  width: 250px;
  margin-right: 12px;
}
.tip {
  color: #929292;
}
</style>
