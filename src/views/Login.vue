<template>
  <div class="page">
    <img
      :src="$store.state.appLogo"
      :class="$store.state.logoStyle"
      alt="logo"
    >
    <el-card class="login-box">
      <div class="header-top">
        <div
          :class="{'actived':change1 }"
          @click="change1=true;change2=false;"
        >
          企业后台登录
        </div>
        <div
          :class="{'actived':change2 }"
          @click="change1=false;change2=true;"
        >
          管理员登录
        </div>
      </div>
      <el-form
        v-if="change1"
        label-position="left"
        label-width="60px"
        :class="true ? 'hidden':' '"
        @submit.native.prevent="login"
      >
        <el-form-item label="账号">
          <el-input
            v-model="userName"
            placeholder="请输入注册账号"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="验证码">
          <div class="captcha-container">
            <div class="captcha-wrap">
              <img
                class="captcha"
                :src="verifyCodeSrc"
                @click="refreshVerifyCode"
              >
            </div>
            <el-button
              icon="el-icon-refresh-right"
              size="mini"
              circle
              tabindex="-1"
              @click="refreshVerifyCode"
            />
          </div>
          <el-input
            v-model="verifyCode"
            placeholder="请输入验证码"
          />
        </el-form-item>
        <el-form-item label-width="0">
          <el-button
            type="primary"
            size="medium"
            native-type="submit"
          >
            登 录
          </el-button>
          <el-button @click="$router.push({ name: 'Register' })">
            注 册
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
        v-else
        label-position="left"
        label-width="60px"
        :class="true ? 'hidden':' '"
        @submit.native.prevent="AdminLogin"
      >
        <el-form-item label="账号">
          <el-input
            v-model="userName"
            placeholder="请输入注册账号"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item label="验证码">
          <div class="captcha-container">
            <div class="captcha-wrap">
              <img
                class="captcha"
                :src="verifyCodeSrc"
                @click="refreshVerifyCode"
              >
            </div>
            <el-button
              icon="el-icon-refresh-right"
              size="mini"
              circle
              tabindex="-1"
              @click="refreshVerifyCode"
            />
          </div>
          <el-input
            v-model="verifyCode"
            placeholder="请输入验证码"
          />
        </el-form-item>
        <el-form-item label-width="0">
          <el-button
            type="primary"
            size="medium"
            native-type="submit"
          >
            登 录
          </el-button>
          <el-button @click="$router.push({ name: 'Register' })">
            注 册
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api';
import md5 from 'md5';
import store from '@/store';
import { login, AdminLogin } from '@/api/permission';

export default defineComponent({
  name: 'ImproveEnterpriseInfo',
  setup() {
    const userName = ref('');
    const password = ref('');
    const verifyCode = ref('');
    let change1 = true;
    let change2 = false;
    const now = ref(new Date().getTime());
    const verifyCodeSrc = computed(
      () => `${process.env.VUE_APP_API_BASE_URL}/common/index/verifyCode?${now.value}`,
    );
    function refreshVerifyCode() {
      now.value = new Date().getTime();
    }
    function admin() {
      change1 = true;
      change2 = false;
    }
    function master() {
      change1 = false;
      change2 = true;
    }
    return {
      master,
      admin,
      verifyCodeSrc,
      userName,
      change1,
      change2,
      password,
      verifyCode,
      refreshVerifyCode,
      async login() {
        try {
          await login({
            userName: userName.value,
            password: md5(md5(password.value)),
            verifyCode: verifyCode.value,
          });
          store.dispatch('login');
        } catch {
          refreshVerifyCode();
        }
      },
      async AdminLogin() {
        try {
          await AdminLogin({
            adminName: userName.value,
            password: md5(md5(password.value)),
            verifyCode: verifyCode.value,
          });
          store.dispatch('login');
        } catch {
          refreshVerifyCode();
        }
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: -20px;
  min-height: 100%;
}
.page-img {
  width: 350px;
  padding-bottom: 35px;
}

.page-img-nk {
  width: 500px;
  padding-bottom: 35px;
}
.login-box {
  width: 330px;

  text-align: center;

  border-radius: 5px;
  background: #f8f8f8;
}
.header-top {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  div {
    margin: 15px;
    padding-bottom: 5px;
    font-size: 20px;
    font-weight: bolder;
    color: #5e5c5c;
  }
}
.actived {
  border-bottom: 2px solid #000000;
}
.captcha-container {
  display: flex;
  align-items: center;

  margin: 6px 0;
}
.captcha-wrap {
  flex: 1;

  height: 40px;
  margin-right: 10px;
}
.captcha {
  display: block;

  max-width: 100%;
  max-height: 100%;

  cursor: pointer;
}
.hidden {
  display: block;
}
</style>
