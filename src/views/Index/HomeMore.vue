<template>
  <el-main>
    <div class="main-box">
      <el-card class="box__left">
        <section class="enterprise">
          <div v-if="enterpriseInfo && enterpriseInfo.logo_url">
            <img
              class="enterprise__logo"
              :src="enterpriseInfo.logo_url"
              alt="logo"
            >
            <div>
              {{ enterpriseInfo.enterprise_name }}
            </div>
          </div>
          <div v-else>
            <img
              class="enterprise__logo"
              :src="$store.state.appLogo"
              alt="logo"
            >
            <span>{{ $store.state.appTitle }}</span>
          </div>
        </section>
        <el-divider />
        <section>
          <div class="cell">
            <span class="cell__label">企业类型：</span>
            <template v-if="enterpriseInfo">
              <div
                v-for="item in enterpriseInfo.enterprise_type_cn"
                :key="item"
              >
                {{ item }}
              </div>
            </template>
            <template v-else>
              -
            </template>
          </div>
          <div class="cell">
            <span class="cell__label">法人：</span>
            {{ enterpriseInfo ? enterpriseInfo.charge_name : "-" }}
          </div>
          <div class="cell">
            <span class="cell__label">业务联系人：</span>
            {{ enterpriseInfo ? enterpriseInfo.b_link_name : "-" }}
          </div>
          <div class="cell">
            <span class="cell__label">技术联系人：</span>
            {{ enterpriseInfo ? enterpriseInfo.t_link_name : "-" }}
          </div>
          <div class="cell">
            <a href="">更多 &gt;</a>
          </div>
        </section>
        <el-divider />
        <section>
          <div>
            <span class="cell__label">已开通服务：</span>
            <span class="right_services">{{ getNum + "个" }}</span>
          </div>
          <div
            v-if="enterpriseInfo"
            class="services"
          >
            <!-- <p>
              <span>{{ enterpriseInfo.sharing_service ? "共享 |" : " " }}</span>
              <span>{{ enterpriseInfo.logistics_service ? "物流 |" : " " }}</span>
              <span>{{ enterpriseInfo.purchase_service ? "采购" : " " }}</span>
            </p>
            <p>
              <span>{{ enterpriseInfo.order_service ? "申报 |" : " " }}</span>
              <span>{{ enterpriseInfo.settle_service ? "结汇 |" : " " }}</span>
            </p> -->
            <p><span>资质</span> | <span>通关</span> | <span>外汇</span> | <span>退税</span></p>
            <p><span>货源</span> | <span>申报</span> | <span>物流</span> | <span>金融</span></p>
          </div>
          <div class="cell">
            <router-link to="/service">
              服务中心 &gt;
            </router-link>
          </div>
        </section>
        <el-divider />
        <h4>企业认证</h4>
        <div>
          <p class="t-c">
            <el-button
              icon="el-icon-phone"
              circle
            />
            <el-button
              icon="el-icon-edit"
              circle
            />
            <el-button
              icon="el-icon-document"
              circle
            />
            <el-button
              icon="el-icon-paperclip"
              circle
            />
          </p>
          <p class="t-c">
            <el-button
              type="primary"
              :disabled="enterpriseInfo && enterpriseInfo.verify_status === 2"
              @click="
                $router.push({
                  name: 'DoingImproveEnterpriseInfo',
                  query: {
                    step: enterpriseInfo ? 1 : 0
                  }
                })
              "
            >
              完善企业资料
            </el-button>
          </p>
          <el-alert
            v-if="!enterpriseInfo"
            type="warning"
            :closable="false"
          >
            <p>您还未完成企业认证</p>
            <p>申请企业认证，获取更多权益</p>
          </el-alert>
          <el-alert
            v-else-if="enterpriseInfo.verify_status === 0 || enterpriseInfo.verify_status === 1"
            type="warning"
            :closable="false"
          >
            <p>信息已提交，请耐心等待平台审核</p>
            <p>需要约1-3个工作日</p>
          </el-alert>
          <el-alert
            v-else-if="enterpriseInfo.verify_status === 2"
            type="warning"
            :closable="false"
          >
            <p>您已完成企业认证</p>
            <p>请在服务中心按需办理服务</p>
          </el-alert>
        </div>
      </el-card>
      <el-card class="box__right">
        <router-link to="/">
          <el-button
            circle
            size="mini"
            icon="el-icon-close"
          />
        </router-link>
        <h2>企业基本资料</h2>
        <div>
          <span class="red">**&nbsp;&nbsp;</span>
          <span class="red">审核状态&nbsp;&nbsp;</span>

          <template v-if="enterpriseInfo && enterpriseInfo.verify_status_cn==='未审核'">
            <span class="red">未审核</span>
          </template>
          <template v-else-if="enterpriseInfo && enterpriseInfo.verify_status_cn==='审核中'">
            <span class="red">审核中</span>
          </template>
          <template v-else-if="enterpriseInfo && enterpriseInfo.verify_status_cn==='已通过'">
            <span class="green">已通过</span>
          </template>
          <template v-else />
        </div>
        <el-divider />
        <el-form
          label-width="100px"
          label-position="left"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="企业全称"
                prop="enterprise_name"
                label-width="80px"
              >
                <span class="text--primary">{{ enterpriseInfo ? enterpriseInfo.enterprise_name : "-" }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="企业类型"
                prop="enterprise_type_cn"
              >
                <template v-if="enterpriseInfo">
                  <div
                    class="line__feed"
                    :title="getstatetype"
                  >
                    <span
                      class="text--primary"
                    >
                      {{ getstatetype.join(',') }}
                    </span>
                  </div>
                </template>
                <template v-else>
                  -
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="统一社会信用代码"
                prop="usc_code"
                label-width="130px"
              >
                <span class="text--primary">{{ enterpriseInfo ? enterpriseInfo.usc_code : "-" }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="营业执照"
                prop="license_url"
              >
                <template v-if="enterpriseInfo">
                  <el-image
                    class="img"
                    fit="contain"
                    :src="enterpriseInfo.license_url"
                    :preview-src-list="[enterpriseInfo.license_url]"
                  />
                </template>
                <template v-else>
                  -
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form
          label-width="100px"
          label-position="left"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="法定代表人"
                prop="charge_name"
              >
                <span class="text--primary">{{ enterpriseInfo ? enterpriseInfo.charge_name : "-" }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="法人身份证"
                prop="charge_cert_num"
              >
                <span class="text--primary">{{ enterpriseInfo ? enterpriseInfo.charge_cert_num : "-" }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="法人身份证效期"
                prop="idcard_startDate idcard_endDate"
                label-width="120px"
              >
                <template v-if="enterpriseInfo">
                  <span class="text--primary">{{ enterpriseInfo.idcard_startDate }} ~ {{ enterpriseInfo.idcard_endDate }}</span>
                </template>
                <template v-else>
                  -
                </template>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form
          label-width="100px"
          label-position="left"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="业务联系人"
                prop="b_link_name"
              >
                <span class="text--primary">{{ enterpriseInfo ? enterpriseInfo.b_link_name : "-" }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="业务联系人手机"
                prop="b_link_tel"
                label-width="150px"
              >
                <span class="text--primary">{{ enterpriseInfo ? enterpriseInfo.b_link_tel : "-" }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="技术联系人"
                prop="t_link_name"
              >
                <span class="text--primary">{{ enterpriseInfo ? enterpriseInfo.t_link_name : "-" }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="技术联系人手机"
                prop="t_link_tel"
                label-width="150px"
              >
                <span class="text--primary">{{ enterpriseInfo ? enterpriseInfo.t_link_tel : "-" }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div><span class="bg__gray">跨境电子商务业务类型</span></div>
        <br>
        <template v-if="enterpriseInfo">
          <div
            class="line"
          >
            <span
              v-for="item in enterpriseInfo.business_type_cn"
              :key="item"
              class="text--primary yellow"
            >
              {{ item }}
            </span>
          </div>
        </template>
        <template v-else>
          -
        </template>
      </el-card>
    </div>
  </el-main>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import store from '@/store';
import { getEntry, getCarousel } from '@/api/home';
import { ApiOutput } from '@/lib/axios-api-generator';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const entries = ref([] as ApiOutput<typeof getEntry>);
    const carousels = ref([] as ApiOutput<typeof getCarousel>);
    async function loadData() {
      getEntry().then((data) => {
        entries.value = data;
      });
      getCarousel().then((data) => {
        carousels.value = data;
      });
    }
    loadData();
    return {
      formInline: {
        user: '',
        region: '',
      },
      enterpriseInfo: computed(() => {
        const info = store.state.userInfo?.enterprise;
        if (info && 'e_id' in info) {
          return info;
        }
        return null;
      }),
      getstatetype: computed(() => {
        const info = store.state.userInfo?.enterprise;
        if (info && 'e_id' in info) {
          return info.enterprise_type_cn;
        }
        return null;
      }),
      getNum: computed(() => {
        const info = store.state.userInfo;
        if (!info) {
          return 0;
        }
        let num = 0;
        if (info.sharing_service) {
          num += 1;
        }
        if (info.logistics_service) {
          num += 1;
        }
        if (info.purchase_service) {
          num += 1;
        }
        if (info.order_service) {
          num += 1;
        }
        if (info.settle_service) {
          num += 1;
        }
        return num;
      }),
      entries,
      carousels,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-box {
  display: flex;
}

.box__left {
  width: 275px;

  background: #f4f6f8;

  .el-form-item {
    margin-bottom: 0px;

    text-align: right;
  }

  @at-root {
    .cell {
      overflow: hidden;

      text-align: right;

      font-size: 14px;
      line-height: 28px;
      > .cell__label {
        float: left;

        margin-right: 12px;
      }
    }
    .enterprise {
      text-align: center;
    }

    .enterprise__logo {
      display: block;

      height: 80px;
      object-fit: contain;
      margin: auto;
    }
    .right_services {
      float: right;
    }
    .services {
      text-align: center;
    }
  }
}

.box__right {
  position: relative;
  flex: 1;
  padding-bottom: 50px;
  .el-button {
    float: right;
    font-weight: 900;
    top: 20px;
  }
}

.help {
  position: absolute;
  right: 100px;
  bottom: 20px;

  color: #a6a6a6;

  line-height: 30px;
}
.red {
    color: #e4476c;
    font-weight: 700;
    font-size: 12px;
}
.bg__gray {
    background-color: #eceff4;
}
.yellow {
    color: #ff972f;
    padding-left: 20px;
}
.green {
   color: #ACD94E;
   font-weight: 700;
  font-size: 12px;
}
.line__feed {
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: bottom;
}
.line {
  width: 150px;
  white-space: nowrap;
}
.img {
  width: 100px;
  max-width: 200px;
  max-height: 80%;
}
.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #e7e8eb;
}
</style>
