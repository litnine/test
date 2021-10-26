<template>
  <el-main>
    <el-card
      class="main-box"
      header="资质代办服务专区"
    >
      <el-tabs>
        <el-tab-pane label="全部">
          <ServiceEnterpriseItems />
        </el-tab-pane>
        <el-tab-pane label="未办理">
          <ServiceEnterpriseItems />
        </el-tab-pane>
        <el-tab-pane label="办理中">
          <div class="empty">
            暂无数据
          </div>
        </el-tab-pane>
        <el-tab-pane label="已办理">
          <div class="empty">
            暂无数据
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-main>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@vue/composition-api';
import ServiceEnterpriseItems from '@/components/ServiceEnterpriseItems.vue';

export default defineComponent({
  name: 'ServiceEnterprise',
  components: {
    ServiceEnterpriseItems,
  },
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
.empty {
  text-align: center;
}
</style>
