<template>
  <el-main class="subpage">
    <el-card
      class="main-box"
      style="min-height: 540px;"
    >
      <header>
        <h2>
          申请列表
        </h2>
        <p>在这里查看申请服务列表</p>
        <p>
          <el-button
            type="primary"
            plain
            @click="$router.push('/service')"
          >
            新增申请
          </el-button>
          <el-button
            type="danger"
            plain
            @click="cancelInBatch"
          >
            批量撤销
          </el-button>
        </p>
      </header>

      <el-table
        v-loading="loading"
        class="table"
        :data="data"
        @selection-change="onSelectionChange"
      >
        <el-table-column
          type="selection"
        />
        <el-table-column
          label="申请ID"
          prop="apply_no"
        />
        <el-table-column
          label="办理项目"
          prop="project_type_cn"
        />
        <el-table-column
          label="申请时间"
          prop="apply_time"
        />
        <el-table-column
          label="申请进度"
          prop="apply_status"
        />
        <el-table-column
          label="操作"
        >
          <template v-slot="{ row }">
            <router-link
              v-if="row.apply_status !== '已撤销' && row.apply_status !== '申请完成'"
              :to="{
                name: TYPE_VIEW_MAP[row.project_type] && TYPE_VIEW_MAP[row.project_type].doing,
                query: {
                  id: row.service_id,
                },
              }"
            >
              继续
            </router-link>
            <router-link
              v-if="row.apply_status !== '进行中' && row.apply_status !== '审核完成'"
              :to="{
                name: TYPE_VIEW_MAP[row.project_type] && TYPE_VIEW_MAP[row.project_type].detail,
                query: {
                  id: row.service_id,
                },
              }"
            >
              查看
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <p class="t-c">
        <el-pagination
          :page="pagination.page"
          :size="pagination.size"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
        />
      </p>
    </el-card>
  </el-main>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
} from '@vue/composition-api';
import { Message } from 'element-ui';
import { ApiOutput } from '@/lib/axios-api-generator';
import { listApplications, cancelInBatch } from '@/api/application';
import applicationConfig from './config';

const TYPE_VIEW_MAP = {
  // 跨境电商出口收结汇
  5: {
    doing: 'DoingExportSupplyExchange',
    detail: 'DetailExportSupplyExchange',
  },
  ...applicationConfig.TYPE_ROUTE_MAP,
};

export default defineComponent({
  name: 'ApplicationList',
  setup() {
    const data = ref([] as ApiOutput<typeof listApplications>['list']);
    const loading = ref(false);
    const pagination = reactive({
      page: 1,
      size: 10,
      total: 0,
    });
    const selectedItems = ref([] as ApiOutput<typeof listApplications>['list']);
    async function loadData() {
      try {
        loading.value = true;
        const { list, total } = await listApplications({
          page: pagination.page,
          size: pagination.size,
        });
        data.value = list;
        pagination.total = total;
      } finally {
        loading.value = false;
      }
    }
    loadData();
    return {
      TYPE_VIEW_MAP,
      data,
      loading,
      pagination,
      onSelectionChange(selection: any) {
        selectedItems.value = selection;
      },
      onSizeChange(size: number) {
        pagination.size = size;
        if (pagination.page > Math.ceil(pagination.total / size)) {
          // 此时会触发 onCurrentChange，避免请求两次
          return;
        }
        loadData();
      },
      onCurrentChange(page: number) {
        pagination.page = page;
        loadData();
      },
      async cancelInBatch() {
        if (selectedItems.value.length === 0) {
          Message('未选择记录');
          return;
        }
        await cancelInBatch({ id: selectedItems.value.map((item) => item.id) });
        Message.success('撤销成功！');
        loadData();
      },
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
