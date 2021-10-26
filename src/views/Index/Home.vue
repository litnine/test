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
            <router-link to="/homemore">
              更多 &gt;
            </router-link>
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
            <router-link to="/service/export">
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
        <el-carousel
          trigger="click"
          height="250px"
        >
          <el-carousel-item
            v-for="item in carousels"
            :key="item.id"
          >
            <img
              :src="item.carousel_pic"
              :alt="item.carousel_name"
            >
          </el-carousel-item>
        </el-carousel>
        <h3>快捷入口</h3>
        <div class="entrance-group">
          <a
            v-for="entry in entries"
            :key="entry.id"
            class="entrance"
            :class="{ 'entrance--new': entry.is_new }"
            :href="entry.jump_link"
            target="_blank"
          >
            <img
              class="entrance__icon"
              :src="entry.icon"
            >
            <div class="entrance__label">
              {{ entry.entry_name }}
            </div>
          </a>
        </div>
        <div class="help">
          <a>
            <i class="el-icon-download" />
            使用手册下载
          </a>
          |
          <span>
            <i class="el-icon-question" />
            客服答疑
          </span>
        </div>
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
      enterpriseInfo: computed(() => {
        const info = store.state.userInfo?.enterprise;
        if (info && 'e_id' in info) {
          return info;
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

      max-width: 100%;
      height: 80px;
      object-fit: contain;
      margin: 0 auto 0.5em;
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

  @at-root {
    .el-carousel__item {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .entrance {
      display: flex;
      align-items: center;

      height: 60px;
      padding: 0 15px;

      color: #333;
      border: 1px solid #dcdfe6;
      border-radius: 4px;

      &:hover {
        border-color: #409eff;
      }

      &.entrance--new {
        position: relative;
        &::after {
          position: absolute;
          z-index: 3;
          top: -10px;
          right: -1em;

          box-sizing: border-box;
          padding: 0 0.75em;

          content: "new";
          text-align: center;

          color: rgba(255, 255, 255, 1);
          border-radius: 12px;
          background-color: rgba(255, 0, 0, 1);

          font-size: 14px;
          line-height: 24px;
        }
      }

      @at-root {
        .entrance-group {
          display: grid;

          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          grid-gap: 20px 40px;
        }

        .entrance__icon {
          width: 40px;
          height: 40px;
          margin-right: 15px;

          border-radius: 5px;
        }

        .entrance__label {
          flex: 1;

          text-align: center;
        }
      }
    }
  }
}

.help {
  position: absolute;
  right: 100px;
  bottom: 20px;

  color: #a6a6a6;

  line-height: 30px;
}

.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #e7e8eb;
}
</style>
