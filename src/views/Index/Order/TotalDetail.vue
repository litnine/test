<template>
  <el-main class="subpage">
    <el-card
      class="main-box"
      style="min-height: 540px;"
    >
      <h2>总订单详情</h2>
      <el-form
        ref="form"
        :model="form"
        :inline="true"
        label-width="200px"
      >
        <el-form-item label="总订购单编号：">
          <!-- <el-input v-model="form.name"></el-input> -->
          <span>{{ datalist.total_no }}</span>
        </el-form-item>
        <el-form-item label="总运单号：">
          <span>{{ datalist.total_logistics_no }}</span>
        </el-form-item>
        <el-form-item label="总订单金额：">
          <span>{{ datalist.total_price }}</span>
        </el-form-item>
        <el-form-item label="商品总数：">
          <span>{{ datalist.total_number }}</span>
        </el-form-item>
        <el-form-item label="合计分订单数量：">
          <span>{{ datalist.sub_total }}</span>
        </el-form-item>
        <el-form-item label="物流线路：">
          <span>{{ datalist.route_name }}</span>
        </el-form-item>
        <el-form-item label="所处物流节点：">
          <span>{{ datalist.warehouse_name }}</span>
        </el-form-item>
      </el-form>
      <el-table
        v-if="datalist.split_status===1"
        ref="multipleTable"
        :data="datalist.sub_order"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template #default="props">
            <div
              v-for="(item, index) in props.row.goods_detail"
              :key="index"
            >
              <h3>商品{{ index+1 }}</h3>
              <el-form
                label-position="left"
                inline
                class="demo-table-expand"
              >
                <el-form-item label="商品图片:">
                  <el-image
                    style="width: 100px; height: 100px; display: block;"
                    :src="item.main_photo"
                    fit="contain"
                    :preview-src-list="[item.main_photo]"
                  />
                </el-form-item>
                <el-form-item label="商品名称:">
                  <span>{{ item.goods_name }}</span>
                </el-form-item>
                <el-form-item label="商品条码:">
                  <span>{{ item.barcode }}</span>
                </el-form-item>
                <el-form-item label="商品单价:">
                  <span>{{ item.price }}</span>
                </el-form-item>
                <el-form-item label="商品数量:">
                  <span>{{ item.number }}</span>
                </el-form-item>
              </el-form>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="分订单号"
          prop="sub_no"
        />
        <el-table-column
          prop="logistics_no"
          label="分运单号"
        />
        <!-- <el-table-column
          prop="address"
          label="商品图片"
        >
        </el-table-column>
        <el-table-column
          label="商品名称"
          width="120"
        >
          <template
            slot-scope="scope"
          >
            {{ scope.row.date }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品条码"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品单价"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品数量"
          width="120"
        >
        </el-table-column> -->
        <el-table-column
          prop="total_fee"
          label="分订单金额"
        />
      </el-table>
      <el-table
        v-else
        ref="multipleTable"
        :data="datalist.goods_detail"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
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
          label="商品名称"
          prop="goods_name"
        />
        <el-table-column
          prop="barcode"
          label="商品条码"
        />
        <el-table-column
          prop="price"
          label="商品单价"
        />
        <el-table-column
          prop="number"
          label="商品数量"
        />
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
import { GetDetail } from '@/api/Total';

export default defineComponent({
  name: 'TotalDetailOrder',
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
          tep_id: props.id!,
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
