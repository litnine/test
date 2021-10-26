<template>
  <div>
    <p>
      <el-radio-group
        v-model="type"
        size="small"
        :disabled="loading"
      >
        <el-radio-button
          v-for="option in OPTIONS"
          :key="option.value"
          :label="option.value"
        >
          {{ option.label }}
        </el-radio-button>
      </el-radio-group>
    </p>
    <div
      :key="type"
      v-loading="loading"
      class="item-group"
    >
      <template v-if="items.length">
        <div
          v-for="item in items"
          :key="item.company_id"
          class="item"
          :title="item.company_name"
          @click="onSelect(item)"
        >
          <i class="el-icon-thumb" /> {{ item.company_name }}
        </div>
      </template>
      <p v-else>
        暂无数据
      </p>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable quote-props */
// import {
//   defineComponent, ref, onUnmounted, watch,
// } from '@vue/composition-api';
import {
  defineComponent, ref, watch,
} from '@vue/composition-api';
// import router from '@/router';
import { getCompany, listCompanies } from '@/api/enterprisemanagement';

const OPTIONS = [
  {
    label: '生产商',
    value: 0,
  },
  {
    label: '分销商',
    value: 1,
  },
  {
    label: '贸易商',
    value: 2,
  },
  {
    label: '运营商',
    value: 3,
  },
];

export default defineComponent({
  name: 'SelectEnterpriseList',
  components: {},
  setup(_, { emit }) {
    const type = ref(OPTIONS[0].value);
    const loading = ref(false);
    const items = ref([] as any[]);
    async function loadData() {
      try {
        loading.value = true;
        items.value = await listCompanies({
          'company_type': type.value,
        });
      } finally {
        loading.value = false;
      }
    }
    watch(() => type.value, loadData, {
      immediate: true,
    });
    return {
      OPTIONS,
      type,
      loading,
      items,
      async onSelect(item: any) {
        const data = await getCompany({ 'company_id': item.company_id });
        emit('select', {
          'enterprise_name': data.company_name,
          'license_no': data.usc_code,
          'license_url': data.license_url,
        });
      },
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap {
  display: inline-block;
}

.dialog {
  text-align: center;

  line-height: 1.5;
  ::v-deep .el-dialog__body {
    padding-top: 0;
  }
}

.radio-group--vertical {
  > .el-radio-button {
    display: block;
  }
}

.item-group {
  overflow: auto;

  min-height: 100px;
  max-height: 400px;
  padding: 1px;
}

.item {
  margin: 4px;
  padding: 8px 16px;

  border-radius: 4px;
  background: #eee;

  @extend %text-ellipsis;
  &:hover {
    cursor: pointer;

    color: #fff;
    background: $colorPrimary;
  }
}
</style>
