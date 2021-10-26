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
        <el-form-item label="订购单编号：">
          <el-input v-model="form.purchase_no" />
        </el-form-item>
        <el-form-item label="商品条码：">
          <el-input v-model="form.barcode" />
        </el-form-item>
        <el-form-item label="订购单状态：">
          <el-select
            v-model="form.status"
            placeholder="请选择"
          >
            <el-option
              label="选项1"
              value="0"
            />
            <el-option
              label="选项2"
              value="1"
            />
            <el-option
              label="选项3"
              value="2"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间：">
          <el-col :span="11">
            <el-date-picker
              v-model="form.time_area[0]"
              type="date"
              placeholder="选择日期"
              style="width: 80%;"
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
              type="date"
              placeholder="选择时间"
              style="width: 80%;"
            />
          </el-col>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        style="margin-left: 500px;"
        size="small"
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
          type="primary"
          size="small"
          @click="dialogVisible = true"
        >
          汇总订购单
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="dialogVisible1 = true"
        >
          导入商品表
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
        :data="datalist"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="onSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="purchase_no"
          label="订购单编号"
        />
        <el-table-column
          prop="total_goods_number"
          label="商品总数"
        />
        <el-table-column
          prop="total_fee"
          label="订购单总额"
        />
        <el-table-column
          prop="purchase_time"
          label="下单时间"
        />
        <el-table-column
          prop="status"
          label="订购单状态"
        />
        <el-table-column
          label="操作"
          prop="status"
          width="120"
        >
          <template v-slot="{ row }">
            <el-button
              class="btcenter"
              type="primary"
              size="mini"
            >
              <router-link
                style="color: #fff;"
                :to="{
                  name: 'PurchaseDetailOrder',
                  query: {
                    id: row.ep_id,
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
              @click.native.prevent="deleteBill(row.ep_id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 汇总订购单 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div class="center">
        <h2>汇总订购单</h2>
        <br>
        <el-form
          ref="form1"
          class="border"
          :inline="true"
          :model="form1"
        >
          <el-form-item label="请选择物流线路：">
            <el-select
              v-model="form1.route"
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
          <el-form-item label="请选择物流企业：">
            <el-select
              v-model="form1.region1"
              placeholder="请选择"
            >
              <el-option
                label="顺丰"
                value="shanghai"
              />
              <el-option
                label="邮政"
                value="beijing"
              />
              <el-option
                label="圆通"
                value="bei5jing"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="请选择出口贸易形式：">
            <el-radio-group v-model="resource">
              <el-radio label="跨境电商一般出口（9610）" />
              <el-radio label="跨境电商B2B直接出口（9710）" />
              <el-radio label="跨境电商出口海外仓（9810）" />
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 导入商品 -->
    <el-dialog
      title="导入商品表"
      :visible.sync="dialogVisible1"
      width="30%"
    >
      <div class="center">
        <p>请选择文件</p>
        <el-upload
          class="upload-demo"
          :action="UPLOAD_URL"
          name="purchase"
          :on-success="uploadControl.onSuccess"
          :limit="1"
        >
          <el-button
            size="small"
            type="primary"
          >
            点击上传
          </el-button>
        </el-upload>
        <el-link
          type="primary"
          href="http://gzportapi.kjtrade.cn/template/purchase_plan.xlsx"
        >
          点击>下载模板
        </el-link>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button
          type="primary"
          @click="confirmUpload()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-main>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
} from '@vue/composition-api';
import { ApiOutput } from '@/lib/axios-api-generator';
import { Message } from 'element-ui';

import {
  PurchaseInfo,
  Route,
  deletePurchase,
  exportPurchase,
} from '@/api/purchase';
import { method } from 'lodash';
import download from '@/utils/download';

export default defineComponent({
  name: 'PurchaseOrders',
  setup() {
    const datalist = ref([] as ApiOutput<typeof PurchaseInfo>['list']);
    const RouteData = ref([] as ApiOutput<typeof Route>);
    const loading = ref(false);
    const flag = ref(false);
    const dialogVisible1 = ref(false);
    const selectedItems = ref([] as ApiOutput<typeof PurchaseInfo>['list']);
    const pagination = reactive({
      page: 1,
      size: 10,
      total: 0,
    });
    const form = reactive({
      purchase_no: '',
      barcode: '',
      status: '',
      time_area: ['2021-02-19', '2021-03-21'],
    });

    async function loadData() {
      try {
        loading.value = true;
        RouteData.value = await Route({ lr_id: 0 });
        const { list, total } = await PurchaseInfo({
          page: pagination.page,
          size: pagination.size,
          purchase_no: '',
          barcode: '',
          status: '',
          time_area: ['2021-02-19', '2021-03-21'],
        });
        datalist.value = list;
        pagination.total = total;
      } finally {
        loading.value = false;
      }
    }
    async function search() {
      try {
        loading.value = true;
        const { list, total } = await PurchaseInfo({
          page: pagination.page,
          size: pagination.size,
          purchase_no: form.purchase_no,
          barcode: form.barcode,
          status: form.status,
          time_area: [form.time_area[0], form.time_area[1]],
        });
        datalist.value = list;
        pagination.total = total;
      } finally {
        loading.value = false;
      }
    }
    loadData();
    return {
      dialogVisible: false,
      dialogVisible1,
      UPLOAD_URL: `${process.env.VUE_APP_API_BASE_URL}/master/supply_purchase/importPurchase`,
      form,
      datalist,
      RouteData,
      loading,
      pagination,
      resource: '',
      onSelectionChange(selection: any) {
        selectedItems.value = selection;
      },
      uploadControl: {
        onSuccess(response: any) {
          if (response.status) {
            // Message.success(response.message);
            flag.value = true;
          } else {
            Message.error(response.message);
          }
        },
      },
      confirmUpload() {
        if (flag.value) {
          Message.success('上传成功');
          dialogVisible1.value = false;
          flag.value = false;
        } else {
          Message.error('请选择文件上传');
        }
      },
      form1: {
        route: '',
        region: '',
        region1: '',
        resource: '',
      },
      async deleteBill(id) {
        await deletePurchase({ ep_id: [id] });
        Message.success('删除成功！');
      },
      async ShopInBatch() {
        if (selectedItems.value.length === 0) {
          Message('未选择记录');
          return;
        }
        const arr = selectedItems.value.map((item) => item.ep_id);
        window.location.href = `http://gzportapi.kjtrade.cn/master/supply_purchase/exportPurchase?ep_id=${arr}&time_area=${form.time_area[0]},${form.time_area[1]}`;
        Message.success('导出成功！');
      },
      async cancelInBatch() {
        if (selectedItems.value.length === 0) {
          Message('未选择记录');
          return;
        }
        await deletePurchase({ ep_id: selectedItems.value.map((item) => item.ep_id) });
        Message.success('删除成功');
        loadData();
      },
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
.line {
  margin-left: -30px;
}
.btcenter {
    margin: 5px;
}
.center {
  margin-left: 120px;
}
</style>
