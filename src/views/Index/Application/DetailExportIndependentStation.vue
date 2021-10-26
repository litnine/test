<template>
  <el-main class="subpage">
    <el-card
      v-loading="loading"
      class="main-box"
    >
      <DetailPageHeader
        title="跨境电商出口物流详情"
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
              <span class="text--primary">{{ data.enterprise_name }}</span>
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
              label="企业类型"
              prop="enterprise_type"
            >
              <span class="text--primary">{{ data.enterprise_type_cn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="统一社会信用代码"
              prop="license_no"
              label-width="150px"
            >
              <span class="text--primary">{{ data.license_no }}</span>
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
              <span class="text--primary">{{ data.account }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="平台邀请码"
              prop="invitation_code"
            >
              <span class="text--primary">{{ data.invitation_code }}</span>
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
              <span class="text--primary">{{ data.link_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系电话"
              prop="link_tel"
            >
              <span class="text--primary">{{ data.link_tel }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="联系邮箱"
              prop="link_email"
            >
              <span class="text--primary">{{ data.link_email }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <h4 class="form__section__title">
          节点列表
        </h4>
        <div v-if="data.warehouse">
          <el-row
            v-for="warehouse in data.warehouse"
            :key="warehouse.warehouse_id"
            class="item"
          >
            <el-col :span="8">
              <el-form-item label="节点名称">
                <span class="text--primary">{{ warehouse.warehouse_name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="节点类型">
                <span class="text--primary">{{ warehouse.warehouse_type }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="详细地址">
                <span class="text--primary">{{ warehouse.warehouse_address }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="现场海关">
                <span class="text--primary">{{ warehouse.customs_name }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户名">
                <span class="text--primary">{{ warehouse.account }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <h4 class="form__section__title">
          线路列表
        </h4>
        <div v-if="data.route">
          <div
            v-for="route in data.route"
            :key="route.route_id"
            class="item"
          >
            <el-form-item label="线路名称">
              <span class="text--primary">{{ route.route_name }}</span>
            </el-form-item>
            <el-form-item label-width="0">
              <div class="route-nodes">
                <template v-for="warehouse in route.detail">
                  <div
                    :key="`node${warehouse.warehouse_id}`"
                    class="text--primary"
                  >
                    {{ warehouse && warehouse.warehouse_name }}
                  </div>
                  <i
                    :key="`icon${warehouse.warehouse_id}`"
                    class="el-icon-right"
                  />
                </template>
              </div>
            </el-form-item>
          </div>
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
import { getDetail } from '@/api/exportSupplyLogistics';
import { ApiOutput } from '@/lib/axios-api-generator';

export default defineComponent({
  name: 'DetailExportIndependentStation',
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
