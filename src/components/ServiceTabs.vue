<template>
  <el-tabs
    class="box"
    tab-position="left"
  >
    <el-tab-pane
      v-for="pane in layout"
      :key="pane.title"
      :label="pane.title"
    >
      <section
        v-for="section in pane.sections"
        :key="section.title"
        class="list-group"
      >
        <h3 class="list-group__title">
          {{ section.title }}
        </h3>
        <div
          v-for="item in section.items"
          :key="item.title"
          class="list-item"
        >
          <span
            class="list-item__icon"
            :style="{background: item.color}"
          >{{ item.icon }}</span>
          <div class="list-item__content">
            <h4 class="list-item__title">
              {{ item.title }}
            </h4>
            <p class="list-item__desc">
              {{ item.description }}
            </p>
          </div>
          <el-button
            type="primary"
            @click="toApply(item)"
          >
            立即申请
          </el-button>
        </div>
      </section>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@vue/composition-api';

import router from '@/router';
import { Message } from 'element-ui';
import { RawLocation } from 'vue-router';

export default defineComponent({
  name: 'ServiceTabs',
  props: {
    layout: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
      async toApply(item: { preCheck?: Function; route: RawLocation }) {
        if (item.preCheck) {
          await item.preCheck();
        }
        if (item.route) {
          router.push(item.route);
        } else {
          Message('功能暂未开通');
        }
      },
    };
  },
});
</script>

<style scoped lang="scss">
.box {
  display: flex;

  min-height: 600px;

  border: solid 1px #e6e6e6;
  background: #fff;

  ::v-deep {
    .el-tabs__header.is-left {
      // width: 150px;
      width: 0px;
      height: auto;
      margin-right: 0;
      .el-tabs__item {
        text-align: left;
      }
    }
    .el-tabs__content {
      flex: 1;
    }
  }
}

.list-group__title {
  margin: 0;
  padding: 10px 20px;

  background: #f0f0f0;

  font-size: 18px;
}

.list-group + .list-group {
  border-top: solid 1px #e6e6e6;
}

@font-face {
  font-family: 'Material Icons';

  src: url('~@/assets/MaterialIcons-Regular2-edc437c996.woff2');
}

.list-item {
  display: flex;
  align-items: center;

  padding: 16px;
  .el-button {
    align-self: center;
  }

  + .list-item {
    border-top: solid 1px #e6e6e6;
  }

  @at-root {
    .list-item__icon {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 50px;
      height: 50px;

      color: #fff;
      border-radius: 15px;
      background: rgba(60, 139, 226, 1);

      font-family: 'Material Icons';
      font-size: 36px;
    }

    .list-item__content {
      flex: 1;

      margin: 0 200px 0 16px;
    }

    .list-item__title {
      margin: 0 0 8px 0;
    }

    .list-item__desc {
      min-height: 38px;
      margin: 0;

      color: rgba(166, 166, 166, 1);

      font-size: 14px;
      line-height: 19px;
    }

    .el-button {
      margin-right: 16px;
    }
  }
}
</style>
