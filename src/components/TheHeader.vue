<template>
  <el-header class="header">
    <a class="logo-container">
      <img
        class="logo"
        :src="$store.state.headerLogo"
      >
    </a>
    <el-menu
      :default-active="activeMenuItem"
      class="menu"
      mode="horizontal"
    >
      <el-menu-item
        index="Home"
        @click="$router.push('/')"
      >
        首页
      </el-menu-item>
      <!-- <el-menu-item
        index="Application"
        @click="$router.push('/application/list')"
      >
        办理窗口
      </el-menu-item> -->
      <el-menu-item
        index="ServiceCenter"
        @click="$router.push('/service/export')"
      >
        服务中心
      </el-menu-item>
      <el-menu-item
        index="CommodityManagement"
        @click="$router.push('/Commodity')"
      >
        商品管理
      </el-menu-item>
      <el-menu-item
        index="OrderManagement"
        @click="$router.push('/Order')"
      >
        订单管理
      </el-menu-item>

      <el-menu-item
        index="EnterpriseManagement"
        @click="$router.push('/enterprise/list')"
      >
        企业管理
      </el-menu-item>
    </el-menu>
    <div>
      <el-link
        type="primary"
        :underline="false"
      >
        <i class="el-icon-user-solid" /> {{ userInfo && userInfo.account }}
      </el-link>
      <el-link
        class="logout"
        :underline="false"
        @click.prevent="logout"
      >
        退出
      </el-link>
    </div>
  </el-header>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
} from '@vue/composition-api';
import store from '@/store';
import router from '@/router';
import { logout, AdminLogout } from '@/api/permission';

export default defineComponent({
  name: 'TheHeader',
  setup() {
    return {
      // @ts-ignore
      activeMenuItem: computed(() => router.currentRoute.matched?.[1]?.name),
      userInfo: computed(() => store.state.userInfo),
      async logout() {
        await logout();
        store.dispatch('logout');
      },
      // Auth1() {
      //   const info = store.state.userInfo;
      //   const infoauth = info?.auth ? info?.auth : [];
      //   if (infoauth.length) {
      //     for (let i = 0; i < infoauth.length; i + 1) {
      //       if (infoauth[i] === 'CommodityManagement1') {
      //         return false;
      //       }
      //     }
      //   }
      //   return true;
      // },
      // Auth2: computed(() => {
      //   const info = store.state.userInfo;
      //   if (info && 'auth' in info) {
      //     for (let i = 0; i < info.auth.length; i + 1) {
      //       if (info.auth[i] === 'CommodityManagement') {
      //         info.auth.splice(i, 1);
      //         if (info.auth.length > 0) {
      //           return false;
      //         }
      //       }
      //     }
      //   }
      //   return true;
      // }),
      ExportLogistics: computed(() => {
        const info = store.state.userInfo;
        if (info && 'auth' in info) {
          return info;
        }
        return null;
      }),
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-around;

  z-index: 9;

  text-align: center;

  color: #333;
  background-color: #ffffff;

  line-height: 60px;

  box-shadow: 0 0 10px #999;
}
.logo-container {
  display: flex;
  align-items: center;
}
.logo {
  margin-right: 0.5em;
  height: 60px;
}
.menu {
  border-bottom: 0;
  .el-menu-item {
    padding: 0 40px;
  }
}
.logout {
  margin-left: 3em;
}
</style>
