<template>
  <el-main class="subpage">
    <el-card
      v-loading="loading"
      class="main-box"
    >
      <DetailPageHeader
        title="跨境电商出口货源共享"
        :data="data"
      />
      <el-form
        label-width="100px"
        label-position="left"
        class="form"
      >
        <h4 class="form__section__title">
          企业信息
        </h4>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="企业全称"
              prop="enterprise_name"
            >
              <span class="text">{{ data.enterprise_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="企业注册地"
              prop="register_place"
              label-width="150px"
            >
              <span class="text">{{ data.register_place }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="企业类型"
              prop="enterprise_type"
            >
              <span class="text">{{ data.enterprise_type_cn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="统一社会信用代码"
              prop="license_no"
              label-width="150px"
            >
              <span class="text">{{ data.license_no }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="营业执照"
              prop="license_url"
            >
              <img
                class="img"
                :src="data.license_url"
                alt=""
              >
            </el-form-item>
          </el-col>
        </el-row>

        <h4 class="form__section__title">
          平台信息
        </h4>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="用户名"
              prop="account"
            >
              <span class="text">{{ data.account }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="平台邀请码"
              prop="invitation_code"
            >
              <span class="text">{{ data.invitation_code }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="平台简称"
              prop="platform_name"
            >
              <span class="text">{{ data.platform_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="主营类目"
              prop="main_category"
            >
              <span class="text">{{ data.main_category }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <h4 class="form__section__title">
          联系方式
        </h4>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="联系人姓名"
              prop="link_name"
            >
              <span class="text">{{ data.link_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系电话"
              prop="link_tel"
            >
              <span class="text">{{ data.link_tel }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系邮箱"
              prop="link_email"
            >
              <span class="text">{{ data.link_email }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label-width="0"
          class="t-c"
        >
          <el-button
            type="primary"
            plain
            @click="$router.push({ name: 'ApplicationList' })"
          >
            返回列表
          </el-button>
          <el-button
            type="primary"
          >
            跳转入口
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from '@vue/composition-api';
import DetailPageHeader from '@/components/DetailPageHeader.vue';
import UploadImg from '@/components/UploadImg.vue';

import { KEY } from './config';
import { getDetail } from './api';

export default defineComponent({
  name: `Detail${KEY}`,
  components: {
    DetailPageHeader,
    UploadImg,
  },
  props: {
    id: Number,
  },
  setup(props) {
    const loading = ref(false);

    const data = ref({});

    async function loadData() {
      try {
        loading.value = true;
        data.value = await getDetail({ service_id: props.id! });
      } finally {
        loading.value = false;
      }
    }

    loadData();

    return {
      loading,
      data,
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
  padding: 0 12px;

  background: rgb(236, 239, 244);

  line-height: 40px;
}

.img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.text {
  color: #409eff;
}
</style>
