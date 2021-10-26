<template>
  <el-form
    ref="formRef"
    :model="formModel"
    label-width="100px"
    label-position="left"
    class="form"
    @submit.native.prevent="next"
  >
    <p class="global-tip">
      <i class="el-icon-question" />
      <span>
        您选择的独立站类型为：<span class="red">微信小程序</span>
      </span>
    </p>
    <el-alert
      title="【重要通知】 根据“微信小程序平台运营规范”，微信小程序内购买的商品建议使用微信支付。"
      type="warning"
      :closable="false"
      center
      show-icon
    />
    <br>
    <span class="title-inner">授权与发布小程序</span>
    <span>
      <a
        target="_blank"
        href="https://www.baidu.com/"
      >下载教程  </a>
    </span>
    <br>
    <br>
    <div style="height: 500px;">
      <el-steps
        direction="vertical"
        :active="2"
      >
        <el-step
          title="注册小程序"
          description="从公众号后台免微信认证创建小程序或直接前往“微信公众平台”注册企业主体的小程序账号。"
        />
        <el-step
          title="授权小程序"
          description="使用微信小程序管理员账号扫码进行授权，授权过程中请勾选所有权限以确保小程序功能完整性"
        />
        <el-step
          title="绑定微信支付"
          description="商家将已开通的微信支付绑定于当前小程序"
        />
        <el-step
          title="小程序提交审核"
          description="提交微信审核（最长14个工作日），审核通过后即可立即发布版本。"
        />
      </el-steps>
    </div>
    <br>
    <el-form-item
      label-width="0"
      class="t-c"
    >
      <el-button
        @click="save"
      >
        上一步
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
import md5 from 'md5';
import get from 'lodash/get';
import {
  save2, next2, SupplyLogistics, BaseWarehouse,
} from '@/api/exportSupplyLogistics';

const WAREHOUSE_TYPE_OPTIONS = [
  {
    value: 1,
    label: '保税仓',
  },
  {
    value: 2,
    label: '海外仓',
  },
  {
    value: 3,
    label: '特殊监管保税外延仓',
  },
  {
    value: 4,
    label: '国内仓库',
  },
  {
    value: 5,
    label: '其他',
  },
];

export default defineComponent<{
  data: SupplyLogistics;
}>({
  name: 'DoingExportExportIndependentStationStep2',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const formRef = ref(null as Form | null);

    const formModel = ref({
      service_id: props.data.service_id,
      warehouse: [...props.data.warehouse] as BaseWarehouse[],
    });

    function addItem() {
      formModel.value.warehouse.push({
        warehouse_name: '',
        warehouse_type: '',
        warehouse_address: '',
        customs_name: '',
        account: '',
        password: '',
        rePassword: '',
      });
    }

    if (formModel.value.warehouse.length === 0) {
      addItem();
    }

    function removeItem(index: number) {
      formModel.value.warehouse.splice(index, 1);
    }

    function genPasswordValidator(path: string) {
      return (_rule: any, value: string, callback: Function) => {
        const rePasswordPath = `${path}.rePassword`;
        if (get(formModel.value, rePasswordPath) !== '') {
        formRef.value!.validateField(rePasswordPath);
        }
        callback();
      };
    }

    function genRePasswordValidator(path: string) {
      return (_rule: any, value: string, callback: Function) => {
        if (value !== get(formModel.value, `${path}.password`)) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    }

    return {
      WAREHOUSE_TYPE_OPTIONS,

      formRef,

      formModel,
      addItem,
      removeItem,
      genPasswordValidator,
      genRePasswordValidator,
      async save() {
        try {
          emit('update:loading', true);
          const data = await save2(formModel.value);
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
              const data = await next2({
                service_id: props.data.service_id,
                warehouse: formModel.value.warehouse.map((item) => ({
                  ...item,
                  password: md5(md5(item.password)),
                  rePassword: md5(md5(item.rePassword!)),
                })),
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

.title-inner {
    font-weight: 700;
    font-size: 30px;
    margin-right: 20px;
}
.input--inline {
  width: 300px;
}

.tip {
  margin-left: 12px;

  color: #929292;

  font-size: 14px;
  font-weight: normal;
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

.red {
  color: #f00;
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
