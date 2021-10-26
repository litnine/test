<template>
  <el-main class="subpage">
    <el-card
      v-loading="loading"
      class="main-box"
    >
      <DetailPageHeader
        title="跨境电商出口订单申报"
        :data="data"
      />
      <el-form
        label-width="150px"
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
            >
              <span class="text">{{ data.license_no }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="24">
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
          <el-col :span="12">
            <el-form-item
              label="电商企业海关备案号"
            >
              <span class="text">{{ data.e_custom_num }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="电商平台企业名"
            >
              <span class="text">{{ data.platform_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="电商平台海关备案号"
            >
              <span class="text">{{ data.p_custom_num }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <h4 class="form__section__title">
          资质参数
        </h4>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="现场海关或口岸名"
            >
              <span class="text">{{ data.port_name }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="DXPID"
            >
              <span class="text">{{ data.dxpid }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="操作员卡账号"
            >
              <span class="text">{{ data.cart_account }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <h4 class="form__section__title">
          技术参数
        </h4>
        <p class="subsection__title">
          <i class="subsection__title__icon el-icon-s-flag" /> {{ selectedSingleWindowName }}
        </p>
        <el-row style="padding-left: 50px">
          <el-col :span="12">
            <el-form-item
              label="企业备案编号"
            >
              <span class="text">{{ data.enterprise_record_number }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="加签客户端ftp账号"
            >
              <span class="text">{{ data.ftp_account }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <h4 class="form__section__title">
          电子合同
        </h4>

        <p>
          <a
            :href="data.contract_url"
            @click.prevent="download(data.contract_url)"
          ><i class="el-icon-document" /> 点击下载</a>
        </p>

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
  computed,
} from '@vue/composition-api';

import DetailPageHeader from '@/components/DetailPageHeader.vue';
import UploadImg from '@/components/UploadImg.vue';

import download from '@/utils/download';
import { KEY } from './config';
import { getDetail, ExportOrderReport } from './api';

const SINGLE_WINDOW_OPTIONS = [
  {
    value: 0,
    label: '广州单一窗口',
  },
  {
    value: 1,
    label: '深圳单一窗口',
  },
  {
    value: 2,
    label: '海南单一窗口',
  },
  {
    value: 3,
    label: '南昌单一窗口',
  },
];

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

    const data = ref({} as ExportOrderReport);

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
      selectedSingleWindowName: computed(() => {
        const item = SINGLE_WINDOW_OPTIONS.find((opt) => opt.value === data.value.single_window);
        if (item) {
          return item.label;
        }
        return null;
      }),
      download,
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

.subsection__title {
  color: #409eff;
}

.subsection__title__icon {
  font-size: 250%;
  vertical-align: middle;
}
</style>
