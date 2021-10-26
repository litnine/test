<template>
  <el-main class="subpage">
    <el-card
      v-loading="loading"
      class="main-box"
    >
      <DetailPageHeader
        title="跨境电商出口收结汇"
        :data="data"
      />
      <el-form
        label-width="100px"
        label-position="left"
        class="form"
      >
        <h4 class="form__section__title">
          银行信息
        </h4>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="办理/代办人姓名"
              prop="agent_name"
              label-width="150px"
            >
              <span class="text--primary">{{ data.agent_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="办理/代办人联系电话"
              prop="agent_tel"
              label-width="150px"
            >
              <span class="text--primary">{{ data.agent_tel }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="办理/代办人联系邮箱"
              prop="agent_email"
              label-width="150px"
            >
              <span class="text--primary">{{ data.agent_email }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="回执编码"
              prop="receipt_no"
              label-width="150px"
            >
              <span class="text--primary">{{ data.receipt_no }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <h4 class="form__section__title">
          企业信息
        </h4>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="企业全称"
              prop="enterprise_name"
            >
              <span class="text--primary">{{ data.enterprise_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="企业类型"
              prop="enterprise_type"
            >
              <span class="text--primary">{{ data.enterprise_type_cn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="营业执照注册编号"
              prop="license_no"
              label-width="150px"
            >
              <span class="text--primary">{{ data.license_no }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="企业注册地"
              prop="register_place"
              label-width="150px"
            >
              <span class="text--primary">{{ data.register_place }}</span>
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
          店铺列表
        </h4>
        <div v-if="data.shop">
          <el-row
            v-for="shop in data.shop"
            :key="shop.shop_id"
            class="item"
          >
            <el-col :span="12">
              <el-form-item label="平台名称">
                <span class="text--primary">{{ shop.platform_name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="店铺名称">
                <span class="text--primary">{{ shop.shop_name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效链接">
                <span class="text--primary">{{ shop.effective_link }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="绑定银行账户">
                <span class="text--primary">{{ shop.bank_account }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="店铺负责人">
                <span class="text--primary">{{ shop.shop_leader }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话">
                <span class="text--primary">{{ shop.link_tel }}</span>
              </el-form-item>
            </el-col><el-col :span="12">
              <el-form-item label="联系邮箱">
                <span class="text--primary">{{ shop.link_email }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-form-item
          label-width="0"
          class="t-c"
          style="margin-top: 20px"
        >
          <el-button
            type="primary"
            plain
            @click="$router.push({ name: 'ApplicationList' })"
          >
            返回列表
          </el-button>
          <el-button type="primary">
            跳转入口
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import {
  defineComponent,
  ref,
} from '@vue/composition-api';
import DetailPageHeader from '@/components/DetailPageHeader.vue';
import UploadImg from '@/components/UploadImg.vue';
import { getDetail } from '@/api/exportSupplyExchange';
import { ApiOutput } from '@/lib/axios-api-generator';

export default defineComponent({
  name: 'DetailExportSupplyExchange',
  components: {
    DetailPageHeader,
    UploadImg,
  },
  props: {
    id: Number,
  },
  setup(props) {
    const loading = ref(false);

    const data = ref({} as ApiOutput<typeof getDetail>);

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

.item:not(:last-child) {
  border-bottom: 1px solid #ddd;
}

.route-nodes {
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: $colorInfo;
  .el-icon-right {
    margin: 0 15px;

    font-size: 30px;
    &:last-child {
      display: none;
    }
  }
}
</style>
