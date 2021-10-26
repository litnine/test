<template>
  <el-main class="subpage">
    <el-card
      class="main-box"
      style="min-height: 540px;"
    >
      <h2>订单详情</h2>
      <el-form
        ref="form"
        :model="form"
        :inline="true"
        label-width="200px"
      >
        <el-form-item label="订购单编号：">
          <span>{{ datalist.purchase_no }}</span>
        </el-form-item>
        <el-form-item label="下单时间：">
          <span>{{ datalist.purchase_time }}</span>
        </el-form-item>
        <el-form-item label="订购单商品总数：">
          <span>{{ datalist.total_goods_number }}</span>
        </el-form-item>
        <el-form-item label="订购单总额：">
          <span>{{ datalist.total_fee }}</span>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="datalist.goods_detail"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          prop="epg_id"
          label="序号"
        />
        <el-table-column
          prop="main_photo"
          label="商品图片"
        >
          <el-image
            style="width: 100px; height: 100px; display: block;"
            :src="datalist.goods_detail.main_photo"
            fit="contain"
            :preview-src-list="[datalist.goods_detail.main_photo]"
          />
        </el-table-column>
        <el-table-column
          prop="goods_name"
          label="商品名称"
        />
        <el-table-column
          prop="barcode"
          label="商品条码"
          width="120"
        />
        <el-table-column
          prop="number"
          label="商品数量"
          width="120"
        />
        <el-table-column
          prop="total"
          label="商品总额"
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
              type="danger"
              size="mini"
              @click.native.prevent="deleteBill(row.epg_id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-main>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from '@vue/composition-api';
import { ApiOutput } from '@/lib/axios-api-generator';
import { GetDetail, deleteBill } from '@/api/purchase';

import { Message } from 'element-ui';

export default defineComponent({
  name: 'PurchaseDetailOrder',
  props: {
    id: Number,
  },
  setup(props) {
    const loading = ref(false);
    const datalist = ref({} as ApiOutput<typeof GetDetail>);

    async function loadData() {
      try {
        loading.value = true;
        datalist.value = await GetDetail({
          ep_id: props.id!,
        });
      } finally {
        loading.value = false;
      }
    }
    loadData();
    return {
      dialogVisible: false,
      form: {
        name: '',
        region: '',
        region1: '',
        resource: '',
      },
      datalist,
      async deleteBill(id) {
        await deleteBill({ epg_id: id });
        Message.success('删除成功！');
      },
      multipleSelection: [],
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
</style>
