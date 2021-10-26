<template>
  <div>
    <div
      v-for="item in PRE_CHECK_LAYOUT"
      :key="item.key"
      class="list-item"
    >
      <i
        class="list-item__icon el-icon-success"
        :class="{ 'list-item__icon--checked': formModel[item.key] === 1 }"
        @click="toggle(item.key)"
      />
      <div class="list-item__content">
        <div class="list-item__title">
          {{ item.title }}
        </div>
        <div class="list-item__description">
          {{ item.description }}
        </div>
      </div>
      <a
        class="list-item__control"
        href=""
        target="_blank"
      >跳转资质代办 &gt;</a>
    </div>
    <p class="t-c">
      <el-button
        @click="save"
      >
        保 存
      </el-button>
      <el-button
        type="primary"
        @click="next"
      >
        下一步
      </el-button>
    </p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from '@vue/composition-api';
import { Message } from 'element-ui';

import router from '@/router';
import { routes, KEY } from '../config';
import { save1, next1 } from '../api';

const PRE_CHECK_LAYOUT = [
  {
    title: '中国国际贸易单一窗口注册',
    description: '需要登录中国单一窗口，企业需要记住账号密码',
    key: 'single_window_registration',
  },
  {
    title: '对外贸易经营者备案',
    description: '在中国单一窗口登记备案，获得对外贸易经营者备案登记证，在商务部可查询备案情况',
    key: 'operator_filing',
  },
  {
    title: '海关企业备案',
    description: '在中国单一窗口登记备案登记，中国关企进出口信用信息公示平台可查询备案情况，最终获取到企业10位海关注册编码。',
    key: 'enterprise_filing',
  },
  {
    title: '电子口岸入网并制卡',
    description: '在当地电子口岸网上办理入网并制作至少一个企业法人卡和两个操作员卡',
    key: 'port_access',
  },
  {
    title: 'DXPID申请',
    description: '登录当地单一窗口办理DXPID，并完成数据传输通道部署',
    key: 'dxpid_apply',
  },
];

export default defineComponent({
  name: `Doing${KEY}Step1`,
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const formModel = ref({
      single_window_registration: 0,
      operator_filing: 0,
      enterprise_filing: 0,
      port_access: 0,
      dxpid_apply: 0,
      ...props.data,
    });

    return {
      PRE_CHECK_LAYOUT,

      formModel,
      toggle(key: keyof typeof formModel.value) {
        formModel.value[key] = 1 - formModel.value[key];
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
      async next() {
        try {
          emit('update:loading', true);
          const data = await next1(formModel.value);
          emit('patch:data', data);
          router.replace({ name: routes.doing.name, query: { id: `${data.service_id}` } });
        } finally {
          emit('update:loading', false);
        }
      },
    };
  },
});
</script>

<style scoped lang="scss">
.list-item {
  display: flex;
  align-items: flex-start;

  padding: 16px;
  .el-button {
    align-self: center;
  }

  + .list-item {
    border-top: solid 1px #e6e6e6;
  }

  @at-root {
    .list-item__icon {
      font-size: 32px;
      color: #ddd;
      cursor: pointer;
      &.list-item__icon--checked {
        color: #48b0fc;
      }
    }

    .list-item__content {
      flex: 1;

      margin: 0 16px;
    }

    .list-item__title {
      margin: 0 0 8px 0;
    }

    .list-item__description {
      margin: 0;

      color: rgba(166, 166, 166, 1);

      font-size: 14px;
    }

    .list-item__control {
      align-self: center;
    }
  }
}
</style>
