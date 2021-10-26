<template>
  <div class="t-c">
    <p>
      <span class="icon-success">
        <i
          v-if="countdown > 3"
          class="el-icon-check"
        />
        <span v-else>{{ countdown }}</span>
      </span>
      <span style="color: #48b0fc">恭喜您！注册完成，正在跳转到登录页面，请稍等......</span>
    </p>
    <section class="note">
      <p style="color: #d43030">
        若您还没有完善企业资料，请尽快补充
      </p>
    </section>
    <p>
      <span
        style="margin-right: 10px; color: #808080; font-size: 12px"
      >若页面无自动跳转，请点击</span>
      <router-link to="/login">
        <el-button
          class="next"
          size="mini"
          plain
        >
          首页
        </el-button>
      </router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from '@vue/composition-api';
import router from '@/router';

export default defineComponent({
  name: 'RegisterFinish',
  components: {},
  setup() {
    const countdown = ref(5);
    let timer = -1;
    onUnmounted(() => window.clearTimeout(timer));
    (function down() {
      countdown.value -= 1;
      if (countdown.value === 0) {
        router.push({ name: 'Login' });
      } else {
        timer = window.setTimeout(down, 1000);
      }
    }());
    return {
      countdown,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon-success {
  display: inline-block;
  position: relative;
  margin-right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 6px solid rgba(72, 176, 252, 1);
  color: rgba(72, 176, 252, 1);
  font-size: 32px;
}
.icon_right i {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.note {
  margin: 100px auto 50px;
}
</style>
