<template>
  <el-card
    v-loading="loading"
    class="box-card"
  >
    <el-form
      ref="formRef"
      class="form"
      :model="formModel"
      label-width="170px"
      label-position="left"
      @submit.native.prevent="onSubmit"
    >
      <h4 class="text--primary">
        <i
          class="el-icon-folder-add"
          style="font-size: 130%"
        /> 新增企业
      </h4>
      <el-divider />
      <el-form-item
        label="企业中文名称："
        prop="company_name"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="formModel.company_name"
          class="input--inline"
        />
        <span class="text--info">
          与营业执照上一致
        </span>
      </el-form-item>
      <el-form-item
        label="统一社会信用代码："
        prop="usc_code"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="formModel.usc_code"
          class="input--inline"
        />
        <span class="text--info">与营业执照上一致</span>
      </el-form-item>
      <el-form-item
        label="法人（负责人）姓名："
        prop="charge_name"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="formModel.charge_name"
          class="input--inline"
        />
        <span class="text--info">与营业执照上一致</span>
      </el-form-item>
      <el-form-item
        label="业务联系人真实姓名："
        prop="b_link_name"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="formModel.b_link_name"
          class="input--inline"
        />
        <span class="text--info">企业常用联系人</span>
      </el-form-item>
      <el-form-item
        label="业务联系人手机："
        prop="b_link_tel"
        :rules="[
          { required: true, message: '必填项！', trigger: 'blur' },
          { pattern: MOBILE_PATTERN, message: '请输入符合格式的手机', trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="formModel.b_link_tel"
          class="input--inline"
        />
      </el-form-item>
      <el-form-item
        label="技术联系人真实姓名："
        prop="t_link_name"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="formModel.t_link_name"
          class="input--inline"
        />
        <span class="text--info">企业常用联系人</span>
      </el-form-item>
      <el-form-item
        label="技术联系人手机："
        prop="t_link_tel"
        :rules="[
          { required: true, message: '必填项！', trigger: 'blur' },
          { pattern: MOBILE_PATTERN, message: '请输入符合格式的手机', trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="formModel.t_link_tel"
          class="input--inline"
        />
      </el-form-item>
      <el-form-item
        label="企业分类："
        prop="company_type"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-radio-group v-model="formModel.company_type">
          <el-radio
            v-for="item in ENTERPRISE_TYPE_OPTIONS"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="拟开展业务类型："
        prop="business_type"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <div>
          <el-checkbox-group v-model="formModel.business_type">
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
        prop="license_url"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <UploadImg v-model="formModel.license_url" />
        <span class="text--info">文件大小不超过2M，jpg、png格式</span>
      </el-form-item>
      <el-form-item
        label="企业标签："
        prop="sign"
      >
        <el-input
          v-model="formModel.sign[0]"
          class="input--line"
        />
        <el-input
          v-for="index in 3"
          :key="index"
          v-model="formModel.sign[index]"
          class="input--line"
        />
        <div>
          <span class="text--info">最多为企业添加4个自定义标签，不填写默认删除</span>
          <div class="right">
            <span class="text--info">标签示例：</span>
            <el-tag
              color="#00baad"
              size="mini"
              effect="dark"
            >
              家具商
            </el-tag>&nbsp;
            <el-tag
              color="#00baad"
              size="mini"
              effect="dark"
            >
              南康区
            </el-tag>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        label-width="0"
        class="t-c"
      >
        <el-button @click="onSaveTemp">
          暂存信息
        </el-button>
        <el-button
          type="primary"
          native-type="submit"
        >
          确 定
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import {
  defineComponent,
  ref,
} from '@vue/composition-api';
import { Message, Form } from 'element-ui';
import pickBy from 'lodash/pickBy';

import UploadImg from '@/components/UploadImg.vue';

import {
  saveTempCompany, createOrUpdateCompany, getTempCompany, BaseCompany,
} from '@/api/enterprisemanagement';
import router from '@/router';
import { MOBILE_PATTERN } from '@/constants/pattern';

export const ENTERPRISE_TYPE_OPTIONS = [
  {
    label: '生产商',
    value: 0,
  },
  {
    label: '分销商',
    value: 1,
  },
  {
    label: '贸易商',
    value: 2,
  },
  {
    label: '运营商',
    value: 3,
  },
];

export const BUSINESS_TYPE_OPTIONS = [
  {
    label: '9610（零售出口）',
    value: '0',
  },
  {
    label: '9710（B2B出口）',
    value: '1',
  },
  {
    label: '9810（海外仓-出口）',
    value: '2',
  },
  {
    label: '1210（保税进口）',
    value: '3',
  },
  {
    label: '9610（直购进口）',
    value: '4',
  },
  {
    label: '1210（保税出口）',
    value: '5',
  },
];

export default defineComponent({
  name: 'EnterpriseAdd',
  components: {
    UploadImg,
  },
  setup() {
    const formRef = ref(null as Form | null);

    const loading = ref(false);

    const formModel = ref({
      company_name: '',
      usc_code: '',
      charge_name: '',
      b_link_name: '',
      b_link_tel: '',
      t_link_name: '',
      t_link_tel: '',
      company_type: -1,
      business_type: [],
      license_url: '',
      sign: [],
    } as BaseCompany);

    async function loadData() {
      const data = await getTempCompany();
      if (data) {
        formModel.value = { ...formModel.value, ...pickBy(data, (_) => _ !== null) };
      }
    }

    loadData();

    return {
      MOBILE_PATTERN,
      ENTERPRISE_TYPE_OPTIONS,
      BUSINESS_TYPE_OPTIONS,

      formRef,

      loading,
      formModel,

      async onSaveTemp() {
        try {
          loading.value = true;
          await saveTempCompany(formModel.value);
          Message.success('暂存成功');
        } finally {
          loading.value = false;
        }
      },
      async onSubmit() {
        formRef.value!.validate(async (valid) => {
          if (!valid) {
            return;
          }
          try {
            loading.value = true;
            await createOrUpdateCompany(formModel.value);
            Message.success('新增成功');
            router.push({ name: 'EnterpriseList' });
          } finally {
            loading.value = false;
          }
        });
      },
    };
  },
});
</script>

<style scoped lang="scss">
.el-card {
  width: 800px;
  margin: 20px auto;
}
.form {
  width: 680px;
  margin: auto;
}
.text--primary {
  color: #48b0fc;

  font-weight: 700;
}
.icon {
  display: inline-block;

  width: 30px;
  height: 30px;
  margin-right: 6px;
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
.right {
  float: right;
}
.input--line {
  display: inline-block;

  width: 100px;
  margin-right: 10px;
}
.text--info {
  color: #929292;
}
</style>
