<template>
  <el-form
    ref="formRef"
    :model="formModel"
    :rules="rules"
    label-width="110px"
    label-position="left"
    class="form"
    @submit.native.prevent="next"
  >
    <p class="global-tip">
      <i class="el-icon-question" />
      <span>
        上一步开设的境外收单账户请绑定在境外平台中的店铺
      </span>
    </p>
    <h4 class="section">
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
    </el-row>
    <el-form-item
      label="营业执照"
      prop="license_url"
    >
      <UploadImg v-model="formModel.license_url" />
    </el-form-item>

    <h4 class="section">
      添加店铺
    </h4>
    <p>
      <el-link
        class="control"
        type="primary"
        :underline="false"
        @click="addItem()"
      >
        <i class="el-icon-circle-plus-outline" /> 增加
      </el-link>
    </p>
    <section
      v-for="(item, i) in shops.shop"
      :key="i"
    >
      <h4 class="form__section__title">
        <div>
          店铺{{ i + 1 }}
          <span class="tip">目前仅支持亚马逊店铺</span>
        </div>
        <el-link
          class="control"
          type="danger"
          :underline="false"
          @click="removeItem(i)"
        >
          <i class="el-icon-remove-outline" /> 删除
        </el-link>
      </h4>
      <el-form-item
        label="平台名称"
        :prop="`shop[${i}].platform_name`"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-select
          v-model="item.platform_name"
          placeholder="请选择"
          class="input--inline"
        >
          <el-option
            v-for="option in PLATFORM_TYPE_OPTIONS"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <span class="tip">选择店铺所在境外电商商城</span>
      </el-form-item>
      <el-form-item
        label="店铺名称"
        :prop="`shop[${i}].shop_name`"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="item.shop_name"
          class="input--inline"
        />
        <span class="tip">填写平台上真实店铺名称</span>
      </el-form-item>

      <el-form-item
        label="有效链接"
        :prop="`shop[${i}].effective_link`"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="item.effective_link"
          class="input--inline"
        />
        <span class="tip">复制店铺的有效访问链接</span>
      </el-form-item>
      <el-form-item
        label="绑定银行账户"
        :prop="`shop[${i}].bank_account`"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="item.bank_account"
          class="input--inline"
        />
        <span class="tip">填写在步骤一开通并已绑定于当前对应店铺的银行账户号</span>
      </el-form-item>
      <el-form-item
        label="店铺负责人"
        :prop="`shop[${i}].shop_leader`"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="item.shop_leader"
          class="input--inline"
        />
        <span
          class="tip"
        >
          店铺负责人或主要联系人员姓名
        </span>
      </el-form-item>
      <el-form-item
        label="联系电话"
        :prop="`shop[${i}].link_tel`"
        :rules="[
          { required: true, message: '必填项！', trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="item.link_tel"
          class="input--inline"
        />
        <span
          class="tip"
        >店铺负责人或主要联系人员姓名联系电话</span>
      </el-form-item>
      <el-form-item
        label="联系邮箱"
        :prop="`shop[${i}].link_email`"
        :rules="[
          { required: true, message: '必填项！', trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="item.link_email"
          class="input--inline"
        />
        <span class="tip">店铺负责人或主要联系人员姓名联系电话</span>
      </el-form-item>
    </section>
    <el-form-item
      label-width="0"
      class="t-c"
    >
      <el-button
        type="primary"
        @click="last"
      >
        上一步
      </el-button>
      <el-button
        type="primary"
        @click="save"
      >
        保存信息
      </el-button>
      <el-button
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

import UploadImg from '@/components/UploadImg.vue';
import SelectEnterprise from '@/components/SelectEnterprise.vue';

import { save1, next1, Shop } from '@/api/exportSupplyExchange';
import router from '@/router';
// import { MOBILE_PATTERN } from '@/constants/pattern';

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
const PLATFORM_TYPE_OPTIONS = [
  {
    value: 0,
    label: '北美亚马逊',
  },
  {
    value: 1,
    label: '日本亚马逊',
  },
  {
    value: 2,
    label: '其他',
  },
];

export default defineComponent({
  name: 'DoingExportSupplyExchangeStep2',
  components: {
    UploadImg,
    SelectEnterprise,
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        agent_name: String,
        agent_tel: String,
        agent_email: String,
        receipt_no: String,
      }),
    },
  },
  setup(props, { emit }) {
    const formRef = ref(null as Form | null);
    // const data_id = {};
    const formModel = ref({
      ...props.data.value,
      enterprise_name: '',
      enterprise_type: 0,
      license_no: '',
      register_place: '',
      license_url: '',
    });

    const shops = ref({
      shop: [] as Shop[],
    });

    function addItem() {
      shops.value.shop.push({
        platform_name: '',
        shop_name: '',
        effective_link: '',
        bank_account: '',
        shop_leader: '',
        link_tel: '',
        link_email: '',
      });
    }
    if (shops.value.shop.length === 0) {
      addItem();
    }
    function removeItem(index: number) {
      shops.value.shop.splice(index, 1);
    }

    return {
      ENTERPRISE_TYPE_OPTIONS,
      PLATFORM_TYPE_OPTIONS,
      formRef,
      shops,
      formModel,
      addItem,
      removeItem,
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
      },
      last() {
        try {
          emit('update:loading', true);
          router.replace({ name: 'DoingExportSupplyExchange' });
        } finally {
          emit('update:loading', false);
        }
      },
      async save() {
        try {
          emit('update:loading', true);
          const data = await save1(formModel.value);
          emit('patch:data', data);
          router.replace({ name: 'DoingExportSupplyExchange', query: { id: `${data.service_id}` } });

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
              const data = await next1(formModel.value);
              emit('patch:data', data);
              router.replace({ name: 'DoingExportSupplyLogistics', query: { id: `${data.service_id}` } });
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
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 12px;

  border-bottom: 1px solid #d8d8d8;

  line-height: 40px;
}
.section {
  padding: 0 12px;

  background: rgb(236, 239, 244);

  line-height: 40px;

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
  margin-left: 12px;

  color: #929292;

  font-size: 14px;
  font-weight: normal;
}
.control {
  font-size: 16px;
  line-height: 24px;
  [class^="el-icon"] {
    vertical-align: bottom;

    font-size: 24px;
  }
}
</style>
