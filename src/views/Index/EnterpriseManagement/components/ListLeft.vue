<template>
  <el-card
    v-loading="loading"
    class="box__left"
  >
    <el-input
      v-model="query.company_name"
      placeholder="搜索"
      prefix-icon="el-icon-search"
      @keypress.native="loadItems"
    />
    <p class="t-c">
      <el-radio-group
        v-model="query.company_type"
        size="mini"
        @change="loadItems"
      >
        <el-radio-button
          v-for="option in COMPANY_TYPE_OPTIONS"
          :key="option.value"
          :label="option.value"
        >
          {{ option.label }}
        </el-radio-button>
      </el-radio-group>
    </p>
    <div
      v-if="items.length"
      class="item-group"
    >
      <div
        v-for="item in items"
        :key="item.company_id"
        class="item"
        :class="{ 'item--active': activeCompanyId === item.company_id }"
        :title="item.company_name"
        @click="onSelect(item.company_id)"
      >
        <i class="el-icon-s-shop" /> {{ item.company_name }}
      </div>
    </div>
    <div
      v-else
      class="flexitem t-c"
    >
      暂无数据
    </div>
    <el-button
      type="primary"
      plain
      icon="el-icon-folder-add"
      @click="$router.push({ name: 'EnterpriseAdd'})"
    >
      新增企业
    </el-button>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { listCompanies } from '@/api/enterprisemanagement';
import { ApiOutput } from '@/lib/axios-api-generator';

const COMPANY_TYPE_OPTIONS = [
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
  name: 'EnterpriseListLeft',
  components: {},
  setup(props, { emit }) {
    const loading = ref(false);
    const query = ref({
      company_name: '',
      company_type: 0,
    });
    const items = ref([] as ApiOutput<typeof listCompanies>);
    async function loadItems() {
      try {
        loading.value = true;
        items.value = await listCompanies(query.value);
      } finally {
        loading.value = false;
      }
    }

    loadItems();

    const activeCompanyId = ref('');

    function onSelect(id: string) {
      activeCompanyId.value = id;
      emit('change', id);
    }

    return {
      COMPANY_TYPE_OPTIONS,
      loading,
      query,
      items,
      loadItems,
      activeCompanyId,
      onSelect,
      onDeleted(id: number) {
        const index = items.value.findIndex((item) => item.company_id === id);
        if (index > -1) {
          items.value.splice(index, 1);
        }
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.box__left {
  width: 320px;

  background: #f4f6f8;

  ::v-deep >.el-card__body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
  }
}
.item-group {
  overflow-y: auto;
  flex: 1;

  margin: 0 -20px 16px;
}
.item {
  padding: 0 20%;

  cursor: pointer;

  color: #808080;
  background: #e5e5e5;

  line-height: 40px;

  @extend %text-ellipsis;

  + .item {
    margin-top: 5px;
  }

  &:hover {
    color: #fff;
    background: lighten($colorPrimary, 10%);
  }

  &.item--active {
    color: #fff;
    background: $colorPrimary;
  }
}
</style>
