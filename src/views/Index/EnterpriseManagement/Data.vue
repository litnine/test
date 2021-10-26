<template>
  <el-main>
    <div class="main-box">
      <el-card>
        {{ profile.company_name }}
        <el-tag
          v-for="item in profile.sign"
          :key="item"
          class="tag"
          color="#00baad"
          size="mini"
          effect="dark"
        >
          {{ item }}
        </el-tag>
      </el-card>
      <br>
      <div class="header section">
        <el-card>
          <div class="statistics-group">
            <div class="statistics-item">
              <div class="statistics-item__value">
                0
              </div>
              <div class="statistics-item__title">
                待申报
              </div>
            </div>
            <div class="statistics-item">
              <div class="statistics-item__value">
                0
              </div>
              <div class="statistics-item__title">
                申报中
              </div>
            </div>
            <div class="statistics-item">
              <div class="statistics-item__value text--danger">
                0
              </div>
              <div class="statistics-item__title">
                申报异常
              </div>
            </div>
            <div class="statistics-item">
              <div class="statistics-item__value text--primary">
                0
              </div>
              <div class="statistics-item__title">
                清关中
              </div>
            </div>
            <div class="statistics-item">
              <div class="statistics-item__value text--primary">
                0
              </div>
              <div class="statistics-item__title">
                放行
              </div>
            </div>
            <div class="statistics-item">
              <div class="statistics-item__value text--danger">
                0
              </div>
              <div class="statistics-item__title">
                清关异常
              </div>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="statistics-group">
            <div class="statistics-item">
              <div class="statistics-item__value">
                0
              </div>
              <div class="statistics-item__title">
                所有SKU
              </div>
            </div>
            <div class="statistics-item">
              <div class="statistics-item__value text--primary">
                0
              </div>
              <div class="statistics-item__title">
                出售中
              </div>
            </div>
            <div class="statistics-item">
              <div class="statistics-item__value text--primary">
                0
              </div>
              <div class="statistics-item__title">
                在途中
              </div>
            </div>
            <div class="statistics-item">
              <div class="statistics-item__value text--primary">
                0
              </div>
              <div class="statistics-item__title">
                收藏夹
              </div>
            </div>
          </div>
        </el-card>
        <el-card style="grid-row-start: span 2;">
          <div class="services">
            <div class="service-group blue">
              已开通服务：
            </div>
            <div class="service-group">
              <template v-if="profile.sharing_service">
                <span class="service-item">出口货源共享</span>
              </template>
              <template v-if="profile.logistics_service">
                <span class="service-item">出口物流</span>
              </template>
              <template v-if="profile.settle_service">
                <span class="service-item">出口结汇</span>
              </template>
              <template v-if="profile.order_service">
                <span class="service-item">出口订单申报</span>
              </template>
              <template v-if="profile.purchase_service">
                <span class="service-item">出口货源采购</span>
              </template>
              <template v-if="profile.sharing_service_import">
                <span class="service-item">进口货源共享</span>
              </template>
              <template v-if="profile.purchase_service_import">
                <span class="service-item">进口货源采购</span>
              </template>
              <template v-if="profile.logistics_service_import">
                <span class="service-item">进口物流</span>
              </template>
            </div>
            <el-link
              type="primary"
              class="t-c"
              :underline="false"
              @click="$router.push('/service/export')"
            >
              <i
                class="el-icon-circle-plus-outline"
                style="font-size: 40px; margin-bottom: 10px;"
              />
              <br>
              添加服务
            </el-link>
          </div>
        </el-card>
      </div>
      <el-card class="section">
        <div slot="header">
          <span>店铺概况</span>
          <span
            class="text--info"
            style="float: right; padding: 3px 0"
          >
            更新时间：{{ updateTime }}
          </span>
        </div>
        <div class="overview">
          <div class="overview__left">
            <div class="cell-item cell-item--active">
              <div class="cell-item__first">
                <span
                  class="el-icon"
                  style="background: #2062e6;"
                >￥</span>
                <div>
                  <div>访客数</div>
                  <div>0</div>
                </div>
              </div>
              <div>
                <div class="index-item">
                  <span class="index-item__label">行业排名</span>100+
                </div>
                <div class="index-item">
                  <span class="index-item__label">无线占比</span>0.00%
                </div>
                <div class="index-item">
                  <span class="index-item__label">昨天全天</span>0
                </div>
              </div>
            </div>
            <div
              ref="chartRef"
              class="chart"
            />
          </div>
          <div class="cell-group">
            <div class="cell-item">
              <div class="cell-item__first">
                <img
                  class="el-icon"
                  src="@/assets/foot.png"
                  style="padding: 6px;background: #fe7c24;"
                >
                <div>
                  <div>访客数</div>
                  <div>0</div>
                </div>
              </div>
              <div class="index-group">
                <div class="index-item">
                  <span class="index-item__label">无线占比</span>0.00%
                </div>
                <div class="index-item">
                  <span class="index-item__label">昨天全天</span>0
                </div>
                <div class="index-item">
                  <span class="index-item__label">排名</span>100+
                </div>
              </div>
            </div>
            <div class="cell-item">
              <div class="cell-item__first">
                <i
                  class="el-icon-s-custom"
                  style="background: #00ba26;"
                />
                <div>
                  <div>支付买家数</div>
                  <div>0</div>
                </div>
              </div>
              <div class="index-group">
                <div class="index-item">
                  <span class="index-item__label">无线占比</span>0.00%
                </div>
                <div class="index-item">
                  <span class="index-item__label">昨天全天</span>0
                </div>
                <div class="index-item">
                  <span class="index-item__label">排名</span>100+
                </div>
              </div>
            </div>
            <div class="cell-item">
              <div class="cell-item__first">
                <i
                  class="el-icon-view"
                  style="background: #f3d024;"
                />
                <div>
                  <div>浏览量</div>
                  <div>0</div>
                </div>
              </div>
              <div class="index-group">
                <div class="index-item">
                  <span class="index-item__label">无线占比</span>0.00%
                </div>
                <div class="index-item">
                  <span class="index-item__label">昨天全天</span>0
                </div>
              </div>
            </div>
            <div class="cell-item">
              <div class="cell-item__first">
                <i
                  class="el-icon-document"
                  style="background: #00b3fe;"
                />
                <div>
                  <div>支付子订单数</div>
                  <div>0</div>
                </div>
              </div>
              <div class="index-group">
                <div class="index-item">
                  <span class="index-item__label">无线占比</span>0.00%
                </div>
                <div class="index-item">
                  <span class="index-item__label">昨天全天</span>0
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <div class="footer section">
        <el-card>
          <div class="sale">
            <div class="sale__main">
              <div class="sale__title">
                本周销售
              </div>
              <div class="target-group">
                <div class="target-item">
                  <div class="text--info">
                    本周已完成
                  </div>
                  <div class="target-item__value">
                    -
                  </div>
                </div>
                <div class="target-item">
                  <div class="text--info">
                    上周已完成
                  </div>
                  <div class="target-item__value">
                    0.00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <el-card>
          <div class="sale">
            <div class="sale__main">
              <div class="sale__title">
                本月销售
              </div>
              <div class="target-group">
                <div class="target-item">
                  <div class="text--info">
                    已完成
                  </div>
                  <div class="target-item__value">
                    0.00
                  </div>
                </div>
                <div class="target-item">
                  <div class="text--info">
                    目标
                  </div>
                  <div>
                    <span class="target-item__value">-</span>
                    <a
                      href="#"
                      class="text--primary"
                    >
                      设置
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <el-progress
              type="circle"
              :percentage="0"
              :width="80"
            />
          </div>
        </el-card>
        <el-card>
          <div class="sale">
            <div class="sale__main">
              <div class="sale__title">
                全年销售
              </div>
              <div class="target-group">
                <div class="target-item">
                  <div class="text--info">
                    已完成
                  </div>
                  <div class="target-item__value">
                    0.00
                  </div>
                </div>
                <div class="target-item">
                  <div class="text--info">
                    目标
                  </div>
                  <div>
                    <span class="target-item__value">-</span>
                    <a
                      href="#"
                      class="text--primary"
                    >
                      设置
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <el-progress
              type="circle"
              :percentage="0"
              :width="80"
            />
          </div>
        </el-card>
      </div>
    </div>
  </el-main>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted, watch,
} from '@vue/composition-api';
import { ApiOutput } from '@/lib/axios-api-generator';
import { getCompany } from '@/api/enterprisemanagement';

import dayjs from 'dayjs';
// import router from '@/router';
import echarts from 'echarts';

export default defineComponent({
  name: 'Data',
  components: {},
  props: {
    id: Number,
  },
  setup(props) {
    const chartRef = ref(null as HTMLDivElement | null);
    const profile = ref({} as ApiOutput<typeof getCompany>);
    const loading = ref(false);

    const updateTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    async function loadProfile() {
      if (!props.id) {
        profile.value = {} as ApiOutput<typeof getCompany>;
        return;
      }
      try {
        loading.value = true;
        [profile.value] = await Promise.all([
          getCompany({ company_id: props.id }),
        ]);
      } finally {
        loading.value = false;
      }
    }
    onMounted(() => {
      const echartsInstance = echarts.init(chartRef.value!);
      echartsInstance.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00', '03', '06', '09', '12', '15', '18', '21', '24'],
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          minInterval: 1,
        },
        grid: {
          top: 40,
          left: 30,
          bottom: 30,
          right: 30,
        },
        legend: {
          // icon: 'roundRect',
          left: 10,
        },
        color: ['#2062e6', '#909399'],
        series: [
          {
            name: '今天',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: 'line',
          },
          {
            name: '昨天',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            type: 'line',
          },
        ],
      });
    });
    watch(() => props.id, loadProfile, { immediate: true });
    return {
      chartRef,
      updateTime,
      profile,
      loadProfile,
    };
  },
});
</script>

<style lang="scss" scoped>
$gap: 10px;

.section:not(:last-child) {
  margin-bottom: $gap;
}

.header {
  display: grid;

  grid-template-columns: auto 225px;
  grid-template-rows: 135px 135px;
  grid-auto-flow: column dense;
  gap: $gap;
  ::v-deep .el-card__body {
    height: 100%;
  }
}

.statistics-group {
  display: flex;
  justify-content: space-around;

  height: 100%;
}

.statistics-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;

  text-align: center;
  .statistics-item__value {
    font-size: 24px;
    font-weight: bold;
  }
}

.services {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;

  .service-group {
    display: grid;
    justify-content: space-between;

    width: 100%;

    grid-template-columns: auto auto;
    gap: 30px 10px;
  }

  .service-item {
    display: inline-block;
  }

}

.overview {
  display: grid;

  height: 250px;

  grid-template-columns: 1fr 1fr;
  gap: 20px;

  .overview__left {
    display: flex;
    flex-direction: column;
    .chart {
      flex: 1;
    }
  }
}

.cell-group {
  display: grid;

  grid-template: 1fr 1fr/1fr 1fr;
  gap: 20px;
}

.cell-item {
  [class^="el-icon"] {
    width: 50px;
    height: 50px;
    margin-right: 15px;

    text-align: center;

    color: #fff;
    border-radius: 50%;
    background: chartreuse;

    font-size: 30px;
    line-height: 50px;
  }

  .index-group {
    display: grid;

    margin-top: 10px;

    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-auto-flow: column dense;
  }

  .index-item {
    font-size: 14px;
    line-height: 1.6;
  }

  .index-item__label {
    margin-right: 10px;

    color: $colorInfo;
  }
}

.cell-item--active {
  display: flex;
  justify-content: space-between;

  margin-bottom: 10px;
}

.cell-item__first {
  display: flex;

  line-height: 1.6;
}
.tag {
  margin-right: 5px;
}
.blue{
  color: #5ab7fc;
}
.footer {
  display: grid;

  grid-template-columns: 1fr 1fr 1fr;
  gap: $gap;
}

.sale {
  display: flex;
  justify-content: space-between;
  .sale__main {
    width: 60%;
  }
  .sale__title {
    margin-bottom: 15px;

    font-weight: bold;
  }
  .target-group {
    display: grid;

    grid-template-columns: 1fr 1fr;
    gap: $gap;
  }
  .target-item {
    font-size: 12px;
  }
  .target-item__value {
    font-size: 16px;
    line-height: 2;
  }
}
</style>
