<template>
  <el-row :gutter="40">
    <el-col
      v-for="item in items"
      :key="item.title"
      :span="8"
    >
      <div class="item">
        <i
          class="item__icon"
          :class="item.icon"
        />
        <span class="item__title">
          {{ item.title }}
        </span>
        <span
          class="item__status"
          :data-status="item.status"
        >{{ item.status }}</span>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@vue/composition-api';

export default defineComponent({
  name: 'ServiceEnterpriseItems',
  setup() {
    return {
      items: [
        {
          title: '对外贸易经营者备案',
          status: '未办理',
          icon: 'el-icon-document',
        },
        {
          title: '海关企业备案',
          status: '未办理',
          icon: 'el-icon-document',
        },
        {
          title: '企业外汇名录备案',
          status: '未办理',
          icon: 'el-icon-document',
        },
        {
          title: 'DXPID申请',
          status: '未办理',
          icon: 'el-icon-document',
        },
        {
          title: '电子口岸入网',
          status: '未办理',
          icon: 'el-icon-document',
        },
        {
          title: '实时数据接口接入',
          status: '未办理',
          icon: 'el-icon-document',
        }, {
          title: '出口海外仓备案',
          status: '未办理',
          icon: 'el-icon-document',
        },
        {
          title: '第三方物流接口接入',
          status: '未办理',
          icon: 'el-icon-document',
        },
        {
          title: '微信支付报关接口接入',
          status: '未办理',
          icon: 'el-icon-document',
        },
        {
          title: '支付宝报关接口接入',
          status: '未办理',
          icon: 'el-icon-document',
        },
        {
          title: '网站域名ICP备案',
          status: '未办理',
          icon: 'el-icon-document',
        },
        {
          title: '增值电信业务许可证',
          status: '未办理',
          icon: 'el-icon-document',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;

  height: 66px;
  margin: 10px 0;
  padding: 0 16px;

  border: 1px solid #409eff;
  border-radius: 6px;

  font-size: 14px;
}

.item__title {
  flex: 1;

  margin: 0 16px;
}

.item__icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  color: #fff;
  border-radius: 12px;
  background: rgba(60, 139, 226, 1);

  font-size: 24px;
}

[data-status="未办理"] {
  color: #a6a6a6;
}
[data-status="已办理"] {
  color:#409eff;
}
[data-status="办理中"] {
  color: #f56c6c;
}
</style>
