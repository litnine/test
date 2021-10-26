<template>
  <el-form
    ref="formRef"
    v-loading="loading"
    :model="formModel"
    label-width="100px"
    label-position="left"
    @submit.native.prevent="onSubmit"
  >
    <el-form-item
      label="店铺名称"
      prop="shop_name"
      :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
    >
      <el-input
        v-model="formModel.shop_name"
      />
    </el-form-item>
    <el-form-item
      label="平台名称"
      prop="platform_id"
      :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
    >
      <el-select
        v-model="formModel.platform_id"
        placeholder="请选择"
        style="display: block;"
      >
        <el-option
          v-for="option in platforms"
          :key="option.platform_id"
          :label="option.platform_name"
          :value="option.platform_id"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="负责人"
      prop="charge_name"
      :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
    >
      <el-input
        v-model="formModel.charge_name"
      />
    </el-form-item>
    <el-form-item
      label="联系电话"
      prop="link_tel"
      :rules="[
        { required: true, message: '必填项！', trigger: 'blur' },
        { pattern: MOBILE_PATTERN, message: '请输入符合格式的手机', trigger: 'blur' },
      ]"
    >
      <el-input
        v-model="formModel.link_tel"
      />
    </el-form-item>
    <el-form-item
      label="主营类目"
      prop="main_category"
      :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
    >
      <el-input
        v-model="formModel.main_category"
      />
    </el-form-item>
    <el-form-item
      class="t-c"
      label-width="0"
    >
      <el-button
        type="primary"
        native-type="submit"
      >
        确定
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {
  defineComponent, ref, watch,
} from '@vue/composition-api';
import { Message, Form } from 'element-ui';
import { ApiOutput } from '@/lib/axios-api-generator';

import { createShop, listPlatforms } from '@/api/enterprisemanagement';
import { MOBILE_PATTERN } from '@/constants/pattern';

export default defineComponent({
  name: 'AddShopForm',
  components: {},
  props: {
    companyId: Number,
  },
  setup(props, { emit }) {
    const formRef = ref(null as Form | null);

    const loading = ref(false);
    const formModel = ref({} as any);

    const platforms = ref([] as ApiOutput<typeof listPlatforms>);
    async function loadPlatforms() {
      try {
        loading.value = true;
        platforms.value = await listPlatforms();
      } finally {
        loading.value = false;
      }
    }

    loadPlatforms();

    watch(() => props.companyId, () => formRef.value!.resetFields());

    async function onSubmit() {
      formRef.value!.validate(async (valid) => {
        if (!valid) {
          return;
        }
        try {
          loading.value = true;
          await createShop({
            ...formModel.value,
            company_id: props.companyId,
          });
          Message.success('新增成功！');
          formRef.value!.resetFields();
          emit('success');
        } finally {
          loading.value = false;
        }
      });
    }

    return {
      MOBILE_PATTERN,

      formRef,

      platforms,
      loading,
      formModel,

      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
