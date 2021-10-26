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
        物流节点指的是货物采购运输线路中，起始及目的仓（地）和途径中转仓库
        <br>
        转运中心系统中配备仓库端账号，添加节点类型为仓库时，需要同时注册新账号
      </span>
    </p>
    <p>
      <el-link
        class="control"
        type="primary"
        :underline="false"
        @click="addItem"
      >
        <i class="el-icon-circle-plus-outline" /> 增加
      </el-link>
    </p>
    <section
      v-for="(item, i) in formModel.warehouse"
      :key="i"
    >
      <h4 class="form__section__title">
        <div>
          节点{{ i + 1 }}
          <span class="tip">包括国内仓库，保税仓，海关监管场所等</span>
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
        label="节点名称"
        :prop="`warehouse[${i}].warehouse_name`"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="item.warehouse_name"
          class="input--inline"
        />
        <span class="tip">如广州南沙仓，香港元朗仓等，由中英文组成</span>
      </el-form-item>
      <el-form-item
        label="节点类型"
        :prop="`warehouse[${i}].warehouse_type`"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-select
          v-model="item.warehouse_type"
          placeholder="请选择"
          class="input--inline"
        >
          <el-option
            v-for="option in WAREHOUSE_TYPE_OPTIONS"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
        <span class="tip">选择节点的类型</span>
      </el-form-item>
      <el-form-item
        label="详细地址"
        :prop="`warehouse[${i}].warehouse_address`"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="item.warehouse_address"
          class="input--inline"
        />
        <span class="tip">仓库或者是海关特殊监管场所的详细地址</span>
      </el-form-item>
      <el-form-item
        label="现场海关"
        :prop="`warehouse[${i}].customs_name`"
        :rules="{ required: item.warehouse_type == 1 || item.warehouse_type == 3, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="item.customs_name"
          class="input--inline"
        />
        <span class="tip">保税仓或海关特殊监管场所 <span style="color: #F56C6C">必 填</span></span>
      </el-form-item>
      <el-form-item
        label="用户名"
        :prop="`warehouse[${i}].account`"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="item.account"
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
        :prop="`warehouse[${i}].password`"
        :rules="[
          { required: true, message: '必填项！', trigger: 'blur' },
          { validator: genPasswordValidator(`warehouse[${i}]`), trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="item.password"
          class="input--inline"
          type="password"
        />
        <span
          class="tip"
        >登录转运中心商家会员端账号密码，18位以内，英文或数字组成</span>
      </el-form-item>
      <el-form-item
        label="确认密码"
        :prop="`warehouse[${i}].rePassword`"
        :rules="[
          { required: true, message: '必填项！', trigger: 'blur' },
          { validator: genRePasswordValidator(`warehouse[${i}]`), trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="item.rePassword"
          class="input--inline"
          type="password"
        />
        <span class="tip">再次确认登录密码</span>
      </el-form-item>
    </section>
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
import get from 'lodash/get';

import { KEY } from '../config';
import {
  save2, next2, SupplyLogistics, BaseWarehouse,
} from '../api';

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
  name: `Doing${KEY}Step2`,
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

.control {
  font-size: 16px;
  line-height: 24px;
  [class^="el-icon"] {
    vertical-align: bottom;

    font-size: 24px;
  }
}
</style>
