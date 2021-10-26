<template>
  <div class="t-c">
    <p style="margin-top: 40px;">
      <span class="ball">
        <span class="ball__top">2-3天</span>
        <span class="ball__bottom">审核时间</span>
      </span>
    </p>
    <p>
      等待平台审核信息 &gt;
    </p>
    <p style="margin-top: 60px;">
      <span
        class="urgent"
        @click="expedite"
      >
        <span class="urgent__tag">加急</span>
        <span class="urgent__label">11月25日前未审核完成，可办理加急</span>
      </span>
    </p>
    <p style="margin-top: 60px;">
      <el-button
        type="primary"
        @click="$router.push({ name: detailRouteName, query: { id: data.service_id } })"
      >
        查看合同
      </el-button>
      <el-button @click="cancel">
        撤销申请
      </el-button>
    </p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@vue/composition-api';
import { Message } from 'element-ui';

import { routes, KEY } from '../config';
import {
  cancel, expedite,
} from '../api';

export default defineComponent({
  name: `Doing${KEY}Step4`,
  components: {
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      detailRouteName: routes.detail.name,
      async expedite() {
        await expedite({ service_id: props.data.service_id });
        Message.success('操作成功！');
      },
      async cancel() {
        await cancel({ service_id: props.data.service_id });
        Message.success('撤销成功！');
      },
    };
  },
});
</script>

<style scoped lang="scss">
.ball {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;

  width: 100px;
  height: 100px;

  border: 1px solid #ddd;
  border-radius: 50%;
  .ball__top {
    font-size: 20px;
  }
  .ball__bottom {
    color: #929292;

    font-size: 14px;
  }
}

.urgent {
  display: inline-block;

  cursor: pointer;

  border: 1px solid #ccc;

  font-size: 14px;
  line-height: 2;
  .urgent__tag {
    display: inline-block;

    padding: 0 1em;

    color: #fff;
    background: #ff5733;
  }
  .urgent__label {
    display: inline-block;

    padding: 0 .5em;
  }
}
</style>
