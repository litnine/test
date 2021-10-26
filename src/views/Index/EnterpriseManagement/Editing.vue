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
          class="el-icon-edit"
          style="font-size: 130%"
        /> 修改企业资料
      </h4>
      <el-divider />
      <el-form-item
        label="企业中文名称："
        prop="company_name"
      >
        <span class="text--primary">
          {{ data.company_name }}
        </span>
        <el-input
          v-model="formModel.company_name"
          class="input--inline"
        />
      </el-form-item>
      <el-form-item
        label="统一社会信用代码："
        prop="usc_code"
      >
        <span class="text--primary">
          {{ data.usc_code }}
        </span>
        <el-input
          v-model="formModel.usc_code"
          class="input--inline"
        />
      </el-form-item>
      <el-form-item
        label="法人（负责人）姓名："
        prop="charge_name"
      >
        <span class="text--primary">{{ data.charge_name }}</span>
        <el-input
          v-model="formModel.charge_name"
          class="input--inline"
        />
      </el-form-item>
      <el-form-item
        label="业务联系人真实姓名："
        prop="b_link_name"
      >
        <span class="text--primary">{{ data.b_link_name }}</span>
        <el-input
          v-model="formModel.b_link_name"
          class="input--inline"
        />
      </el-form-item>
      <el-form-item
        label="业务联系人手机："
        prop="b_link_tel"
        :rules="{ pattern: MOBILE_PATTERN, message: '请输入符合格式的手机', trigger: 'blur' }"
      >
        <span class="text--primary">{{ data.b_link_tel }}</span>
        <el-input
          v-model="formModel.b_link_tel"
          class="input--inline"
        />
      </el-form-item>
      <el-form-item
        label="技术联系人真实姓名："
        prop="t_link_name"
      >
        <span class="text--primary">{{ data.t_link_name }}</span>
        <el-input
          v-model="formModel.t_link_name"
          class="input--inline"
        />
      </el-form-item>
      <el-form-item
        label="技术联系人手机："
        prop="t_link_tel"
        :rules="{ pattern: MOBILE_PATTERN, message: '请输入符合格式的手机', trigger: 'blur' }"
      >
        <span class="text--primary">{{ data.t_link_tel }}</span>
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
          <div class="f-r">
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
        <el-button
          type="primary"
          native-type="submit"
        >
          保存修改
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
  watch,
} from '@vue/composition-api';
import { Message, Form } from 'element-ui';
import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';
import { ApiOutput } from '@/lib/axios-api-generator';

import UploadImg from '@/components/UploadImg.vue';

import { createOrUpdateCompany, getCompany } from '@/api/enterprisemanagement';
import router from '@/router';
import { MOBILE_PATTERN } from '@/constants/pattern';
import { ENTERPRISE_TYPE_OPTIONS, BUSINESS_TYPE_OPTIONS } from './Add.vue';

export default defineComponent({
  name: 'EnterpriseEditing',
  components: {
    UploadImg,
  },
  props: {
    id: Number,
  },

  setup(props) {
    const formRef = ref(null as Form | null);

    const formModel = ref({
      company_name: '',
      usc_code: '',
      charge_name: '',
      b_link_name: '',
      b_link_tel: '',
      t_link_name: '',
      t_link_tel: '',
      company_type: 0,
      business_type: [0, 1],
      license_url: '',
      sign: [],
      company_id: props.id,
    });
    const loading = ref(false);

    const data = ref({} as ApiOutput<typeof getCompany>);

    async function loadData() {
      try {
        loading.value = true;
        data.value = await getCompany({ company_id: props.id! });
        Object.assign(formModel.value, pickBy(pick(data.value, [
          'company_type',
          'business_type',
          'license_url',
          'sign',
        ]), (_) => _ !== null));
      } finally {
        loading.value = false;
      }
    }

    watch(() => props.id, (id) => {
      if (id) {
        loadData();
      }
    }, {
      immediate: true,
    });

    return {
      MOBILE_PATTERN,
      ENTERPRISE_TYPE_OPTIONS,
      BUSINESS_TYPE_OPTIONS,

      formRef,

      loading,
      formModel,

      async onSubmit() {
        formRef.value!.validate(async (valid) => {
          if (!valid) {
            return;
          }
          try {
            loading.value = true;
            await createOrUpdateCompany({ ...data.value, ...pickBy(formModel.value, (value) => value) });
            router.replace({ name: 'EnterpriseList' });
            Message.success('保存成功');
          } finally {
            loading.value = false;
          }
        });
      },
      data,
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
.form__section__title {
  padding: 0 12px;

  background: rgb(236, 239, 244);

  line-height: 40px;
}

.input--inline {
  float: right;

  width: 250px;
}

.input--line {
  display: inline-block;

  width: 100px;
  margin-right: 10px;
}
.img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.icon {
  display: inline-block;

  width: 30px;
  height: 30px;
  margin-right: 6px;
}
</style>
