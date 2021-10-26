<template>
  <el-main class="subpage">
    <el-card
      class="main-box"
      style="min-height: 540px;"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="140px"
        :inline="true"
      >
        <el-form-item label="总订单编号：">
          <el-input v-model="form.total_no" />
        </el-form-item>
        <el-form-item label="订购单编号：">
          <el-input v-model="form.purchase_no" />
        </el-form-item>
        <el-form-item label="订购单状态：">
          <el-select
            v-model="form.lr_id"
            placeholder="请选择"
          >
            <el-option
              label="待发运"
              value="0"
            />
            <el-option
              label="待查验"
              value="1"
            />
            <el-option
              label="转关中"
              value="2"
            />
            <el-option
              label="运输出境"
              value="3"
            />
            <el-option
              label="运抵"
              value="4"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="物流线路：">
          <el-select
            v-model="form.total_status"
            placeholder="请选择"
          >
            <el-option
              v-for="item in RouteData"
              :key="item.lr_id"
              :label="item.route_name"
              :value="item.lr_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="汇总时间："
          label-width="150px"
        >
          <el-col :span="11">
            <el-date-picker
              v-model="form.time_area[0]"
              type="datetime"
              placeholder="选择日期"
              style="width: 96%;"
            />
          </el-col>
          <el-col
            class="line"
            :span="2"
          >
            ——
          </el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="form.time_area[1]"
              type="datetime"
              placeholder="选择时间"
              style="width: 96%;"
            />
          </el-col>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        size="small"
        style="margin-left: 500px;"
        @click="search()"
      >
        搜索
      </el-button>
      <div class="right">
        <el-button
          type="primary"
          size="small"
          @click="ShopInBatch"
        >
          导出
        </el-button>
        <el-button
          type="danger"
          size="small"
          @click="cancelInBatch"
        >
          批量删除
        </el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="onSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="总订单编号"
          prop="total_no"
          width="120"
        />
        <el-table-column
          prop="total_number"
          label="商品总数"
        />
        <el-table-column
          prop="total_price"
          label="总订单金额"
        />
        <el-table-column
          label="汇总时间"
          prop="create_time"
        />
        <el-table-column
          prop="total_status"
          label="总订单状态"
        />
        <el-table-column
          prop="route_name"
          label="物流线路"
          width="120"
        />
        <el-table-column
          prop="warehouse_name"
          label="所处物流节点"
          width="120"
        />
        <el-table-column
          prop="total_trade_way"
          label="贸易方式"
          width="120"
        />
        <el-table-column
          prop="name"
          label="操作"
          width="120"
        >
          <template v-slot="{ row }">
            <el-button
              class="btcenter"
              type="primary"
              size="mini"
            >
              <router-link
                style="color: #fff; height: 100%; width: 100%"
                :to="{
                  name: 'TotalDetailOrder',
                  query: {
                    id: row.tep_id,
                  },
                }"
              >
                查看
              </router-link>
            </el-button>
            <el-button
              class="btcenter"
              type="danger"
              size="mini"
              @click.native.prevent="deleteBill(row.tep_id)"
            >
              删除
            </el-button>
            <el-button
              class="btcenter"
              size="mini"
              @click.native.prevent="split(row.tep_id)"
            >
              拆分
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 总订单拆分 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div class="center">
        <h2>总订单拆分</h2>
        <el-form
          :model="form1"
          class="border"
        >
          <el-form-item label="请选择总订单拆分方式:">
            <el-radio-group v-model="form1.type">
              <el-radio :label="0">
                逐个拆分（以商品为单位，一个商品一张订单）
              </el-radio>
              <el-radio :label="1">
                自定义拆分规则（根据商品实际的销售形式，导入规则拆分订单）
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-upload
          class="upload-demo"
          :action="UPLOAD_URL"
          name="order"
          :on-success="uploadControl.onSuccess"
          :limit="1"
          :data="form1"
        >
          <el-button
            size="mini"
            type="primary"
          >
            导入
          </el-button>
        </el-upload>
        <el-link
          href="http://gzportapi.kjtrade.cn/template/order_split.xlsx"
          type="info"
        >
          下载模板
        </el-link>
        <h4>温馨提示</h4>
        <span>请仔细确认订单的拆分方式，拆分出的分订单的商品信息需要与实际的销</span>
        <span>售时平台产生的订单一致</span>
        <p />
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="savesplit"
          >确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </el-main>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
} from '@vue/composition-api';
import { method } from 'lodash';
import { TotalInfo, deleteBill, Route } from '@/api/Total';

import { ApiOutput } from '@/lib/axios-api-generator';
import { Message } from 'element-ui';

export default defineComponent({
  name: 'PurchaseOrders',
  setup() {
    function deleteRow(index, rows) {
      rows.splice(index, 1);
    }
    const dialogVisible = ref(false);
    const data = ref([] as ApiOutput<typeof TotalInfo>['list']);
    const selectedItems = ref([] as ApiOutput<typeof TotalInfo>['list']);
    const RouteData = ref([] as ApiOutput<typeof Route>);
    const loading = ref(false);
    const pagination = reactive({
      page: 1,
      size: 10,
      total: 0,
    });
    const form1 = reactive({
      type: 0,
      tep_id: 0,
    });
    const form = reactive({
      total_no: '',
      purchase_no: '',
      lr_id: '',
      total_status: '',
      time_area: ['2021-01-03 10:00:01', '2021-11-03 10:00:01'],
    });
    async function loadData() {
      try {
        loading.value = true;
        RouteData.value = await Route({ lr_id: 0 });
        const { list, total } = await TotalInfo({
          total_no: '',
          purchase_no: '',
          lr_id: '',
          total_status: '',
          time_area: ['2021-01-03 10:00:01', '2021-11-0310:00:01'],
        });
        data.value = list;
        pagination.total = total;
      } finally {
        loading.value = false;
      }
    }
    function savesplit() {
      form1.type = 0;
      dialogVisible.value = false;
    }
    function split(id) {
      form1.tep_id = id;
      dialogVisible.value = true;
    }
    async function search() {
      try {
        loading.value = true;
        const { list, total } = await TotalInfo({
          total_no: form.total_no,
          purchase_no: form.purchase_no,
          lr_id: form.lr_id,
          total_status: form.total_status,
          time_area: [form.time_area[0], form.time_area[1]],
        });
        data.value = list;
        pagination.total = total;
      } finally {
        loading.value = false;
      }
    }
    loadData();
    return {
      dialogVisible,
      form,
      data,
      split,
      loading,
      savesplit,
      RouteData,
      pagination,
      UPLOAD_URL: `${process.env.VUE_APP_API_BASE_URL}/master/total_purchase/splitTotalBill`,
      async deleteBill(id) {
        await deleteBill({ tep_id: [id] });
        Message.success('删除成功！');
      },
      // async ShopInBatch() {
      //   if (selectedItems.value.length === 0) {
      //     Message('未选择记录');
      //     return;
      //   }
      //   console.log(selectedItems.value.map((item) => item.ep_id));
      //   const arr = selectedItems.value.map((item) => item.ep_id);
      //   await exportPurchase({ ep_id: arr, time_area: [form.time_area[0], form.time_area[1]] });
      //   Message.success('导出成功！');
      //   loadData();
      // },
      uploadControl: {
        onSuccess(response: any) {
          if (response.status) {
            Message.success(response.message);
          } else {
            Message.error(response.message);
          }
        },
      },
      onSelectionChange(selection: any) {
        selectedItems.value = selection;
      },
      async cancelInBatch() {
        if (selectedItems.value.length === 0) {
          Message('未选择记录');
          return;
        }
        await deleteBill({ tep_id: selectedItems.value.map((item) => item.tep_id) });
        Message.success('删除成功');
        loadData();
      },
      async ShopInBatch() {
        if (selectedItems.value.length === 0) {
          Message('未选择记录');
          return;
        }
        const arr = selectedItems.value.map((item) => item.tep_id);
        window.location.href = `http://gzportapi.kjtrade.cn//master/total_purchase/exportTotalBill?tep_id=${arr}&time_area=${form.time_area[0]},${form.time_area[1]}`;
        Message.success('导出成功！');
      },
      deleteRow,
      form1,
      search,
    };
  },
});
</script>

<style lang="scss" scoped>
.right {
  display: flex;
  // flex-direction: row-reverse;
  justify-content: flex-end;
  .button {
    margin: 10px;
  }
}
.btcenter {
    margin: 5px;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .border {
    border-top: 1px #000 solid;
    padding: 0px 100px;
  }
}
</style>
