<template>
  <el-main class="subpage">
    <el-card
      class="main-box"
      style="min-height: 570px;"
    >
      <el-form
        :model="form"
        :inline="true"
        label-width="140px"
      >
        <el-form-item label="商品名称：">
          <el-input v-model="form.goods_name" />
        </el-form-item>
        <el-form-item
          label="商品条码/货号："
          style="margin-left: 100px;"
        >
          <el-input v-model="form.keyword" />
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
          @click="dialogVisible = true"
        >
          商品分组设置
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="ShopInBatch"
        >
          导出商品信息
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="dialogVisible1 = true"
        >
          导入商品表
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
          label="商品名称"
          prop="goods_name"
          width="120"
        />
        <el-table-column
          prop="main_photo"
          label="商品图片"
        >
          <el-image
            style="width: 100px; height: 100px; display: block;"
            :src="data.main_photo"
            fit="contain"
            :preview-src-list="[data.main_photo]"
          />
        </el-table-column>
        <el-table-column
          prop="barcode"
          label="商品条码"
        />
        <el-table-column
          label="商品分组"
          prop="type_name"
          width="120"
        />
        <el-table-column
          prop="price"
          label="商品单价"
          width="120"
        />
        <el-table-column
          prop="shelf_status_zn"
          label="上下架状态"
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
              @click="editGoodsInfo(row.eg_id)"
            >
              编辑
            </el-button>
            <el-button
              class="btcenter"
              type="danger"
              size="mini"
              @click.native.prevent="deleteBill(row.eg_id)"
            >
              删除
            </el-button>
            <el-button
              v-if="row.shelf_status === 1"
              class="btcenter"
              type="danger"
              size="mini"
              @click.native.prevent="setGoodsStatus(row.eg_id, row.shelf_status)"
            >
              下架
            </el-button>
            <el-button
              v-else
              class="btcenter"
              type="warning"
              size="mini"
              @click.native.prevent="setGoodsStatus(row.eg_id, row.shelf_status)"
            >
              上架
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加分类 -->
      <el-dialog
        :visible.sync="dialogVisible"
        width="50%"
        center
      >
        <h2>商品分类设置</h2>
        <el-button
          type="primary"
          @click="innerVisible = true"
        >
          添加分类
        </el-button>
        <el-table
          ref="multipleTable"
          :data="AllType"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            label="分类名称"
          >
            <template v-slot="{ row }">
              <div class="block">
                <!-- <span class="demonstration">hover 触发子菜单</span> -->
                <el-cascader
                  v-model="value"
                  :placeholder="row.type_name"
                  :options="AllType"
                  :props="{
                    expandTrigger: 'hover',
                    value: 'type_id',
                    label: 'type_name',
                    children: 'more',}"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
          >
            <template v-slot="{ row }">
              <el-button
                icon="el-icon-edit"
                circle
                @click.native.prevent="editType(row.type_id,row.type_name)"
              />
              <el-button
                icon="el-icon-delete"
                circle
                @click.native.prevent="deleterType(row.type_id)"
              />
            </template>
          </el-table-column>
        </el-table>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确 定</el-button>
        </span>
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
            :on-success="uploadControl.onSuccess"
            name="goods"
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
            href="http://gzportapi.kjtrade.cn/template/出口商品信息备案模板.xlsx"
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
      <!-- 添加分类 -->
      <el-dialog
        width="40%"
        title="添加分类"
        :visible.sync="innerVisible"
      >
        <el-form
          :model="typeForm"
          label-width="100px"
        >
          <el-form-item label="所属类目：">
            <el-cascader
              v-model="typeForm.parent_id"
              :options="AllType"
              :props="{
                expandTrigger: 'hover',
                value: 'type_id',
                label: 'type_name',
                children: 'more',
                checkStrictly: true}"
            />
          </el-form-item>
          <el-form-item label="类目名称：">
            <el-input v-model="typeForm.type_name" />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          @click="addType(typeForm.parent_id, typeForm.type_name)"
        >
          保存设置
        </el-button>
      </el-dialog>
      <!-- 编辑分类 -->
      <el-dialog
        width="40%"
        title="编辑分类"
        :visible.sync="innerVisible1"
      >
        <el-form
          :model="typeForm"
          label-width="100px"
        >
          <el-form-item label="所属类目：">
            <el-cascader
              v-model="type.type_id"
              :options="[gettypeById]"
              :placeholder="type.type_name"
              :props="{
                expandTrigger: 'hover',
                value: 'type_id',
                label: 'type_name',
                children: 'more',
                checkStrictly: true}"
            />
          </el-form-item>
          <el-form-item label="类目名称：">
            <el-input v-model="type.type_name" />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          @click="editeType(type.type_id)"
        >
          保存设置
        </el-button>
      </el-dialog>
      <!-- 删除分类 -->
      <el-dialog
        width="40%"
        title="删除分类"
        :visible.sync="innerVisible2"
      >
        <el-form
          :model="typeForm"
          label-width="100px"
        >
          <el-form-item label="所属类目：">
            <el-cascader
              v-model="type.type_id"
              :options="[gettypeById]"
              :placeholder="type.type_name"
              :props="{
                expandTrigger: 'hover',
                value: 'type_id',
                label: 'type_name',
                children: 'more',
                checkStrictly: true}"
            />
          </el-form-item>
        </el-form>
        <el-button
          type="danger"
          @click="deletetype(type.type_id)"
        >
          确认删除
        </el-button>
      </el-dialog>
      <!-- 编辑商品详情 -->
      <el-dialog
        :visible.sync="dialogVisible3"
        width="70%"
        center
      >
        <h2>一般信息</h2>
        <el-form
          ref="goodsForm"
          :model="goodsForm"
          :rules="rules"
          label-width="150px"
          :inline="true"
        >
          <el-form-item label="*商品名称：">
            <el-input v-model="goodsForm.goods_name" />
          </el-form-item>
          <el-form-item label="*商品条码：">
            <el-input v-model="goodsForm.barcode" />
          </el-form-item>
          <el-form-item label="*HScode：">
            <el-input v-model="goodsForm.hscode" />
          </el-form-item>
          <el-form-item label="*目的国：">
            <el-input v-model="goodsForm.country" />
          </el-form-item>
          <el-form-item label="企业商品货号：">
            <el-input v-model="goodsForm.sku" />
          </el-form-item>
          <el-form-item label="账册编号：">
            <el-input v-model="goodsForm.ems_no" />
          </el-form-item>
          <el-form-item label="商品规格：">
            <el-input v-model="goodsForm.attr_name" />
          </el-form-item>
          <el-form-item label="成分：">
            <el-input v-model="goodsForm.ingredient" />
          </el-form-item>
          <el-form-item label="*毛重：">
            <el-input v-model="goodsForm.gross_weight" />
          </el-form-item>
          <el-form-item label="*净重：">
            <el-input v-model="goodsForm.net_weight" />
          </el-form-item>
          <el-form-item label="*币制：">
            <el-input v-model="goodsForm.currency" />
          </el-form-item>
          <el-form-item label="*申报价格：">
            <el-input v-model="goodsForm.form_price" />
          </el-form-item>
          <el-form-item label="*申报计量单位：">
            <el-input v-model="goodsForm.unit" />
          </el-form-item>
          <el-form-item label="*供货单价：">
            <el-input v-model="goodsForm.price" />
          </el-form-item>
          <el-form-item label="*第一法定单位：">
            <el-input v-model="goodsForm.std_unit" />
          </el-form-item>
          <el-form-item label="*第一法定单位数量：">
            <el-input v-model="goodsForm.unit_sum1" />
          </el-form-item>
          <el-form-item label="第二法定单位：">
            <el-input v-model="goodsForm.sec_unit" />
          </el-form-item>
          <el-form-item label="第二法定单位数量：">
            <el-input v-model="goodsForm.unit_sum2" />
          </el-form-item>
          <el-form-item label="所属类目：">
            <el-select
              v-model="goodsForm.type_name"
              placeholder="请选择"
            >
              <el-option
                v-for="item in typeList"
                :key="item.type_id"
                :label="item.type_name"
                :value="item.type_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="*备案图片：">
            <span> 800*800（单位：px），添加1-4张</span>
            <el-upload
              class="upload-demo"
              :action="UPLOAD_URL_MAIN"
              multiple
              name="pic"
              :on-success="uploadControl1.onSuccess"
              :limit="4"
            >
              <el-button
                size="small"
                type="primary"
              >
                点击上传
              </el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button
            type="primary"
            @click="saveGoods"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </el-main>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
} from '@vue/composition-api';
import { ApiOutput } from '@/lib/axios-api-generator';
import {
  listGetGoods,
  deleteBill,
  setGoodsStatus,
  getAllType,
  getTypeList,
  deleteType,
  saveType,
  addType,
  getGoodsInfo,
  getTypeById,
  saveGoodsDetail,
  exportGoodsList,
} from '@/api/commodityManagement';

import { Message } from 'element-ui';

export default defineComponent({
  name: 'CommodityManagement',
  setup() {
    function deleteRow(index, rows) {
      rows.splice(index, 1);
    }
    // const sort= ref(true);
    const selectedItems = ref([] as ApiOutput<typeof listGetGoods>['list']);
    const data = ref([] as ApiOutput<typeof listGetGoods>['list']);
    const AllType = ref([] as ApiOutput<typeof getAllType>);
    const gettypeById = ref({} as ApiOutput<typeof getTypeById>);
    const goodsInfo = ref({} as ApiOutput<typeof getGoodsInfo>);
    const typeList = ref([] as ApiOutput<typeof getTypeList>);
    const innerVisible = ref(false);
    const innerVisible1 = ref(false);
    const innerVisible2 = ref(false);
    const dialogVisible = ref(false);
    const dialogVisible1 = ref(false);
    const dialogVisible2 = ref(false);
    const dialogVisible3 = ref(false);
    const flag = ref(false);
    const loading = ref(false);
    const selectData = ref([]);
    const pagination = reactive({
      page: 1,
      size: 10,
      total: 0,
    });
    const type = reactive({
      type_id: 0,
      type_name: '',
    });
    const form = reactive({
      goods_name: '',
      keyword: '',
    });
    const goodsForm = reactive({
      eg_id: 0,
      goods_name: '',
      barcode: '',
      hscode: '',
      country: '',
      sku: '',
      ems_no: '',
      attr_name: '',
      ingredient: '',
      gross_weight: '',
      net_weight: '',
      currency: '',
      // name: '',
      form_price: '',
      unit: '',
      price: '',
      std_unit: '',
      unit_sum1: '',
      sec_unit: '',
      unit_sum2: '',
      type_id: 0,
      main_photo: '',
    });
    const typeForm = reactive({
      parent_id: '',
      type_name: '',
    });
    function clear() {
      typeForm.parent_id = '';
      typeForm.type_name = '';
    }
    async function getallType() {
      AllType.value = await getAllType({ eg_id: [1] });
    }
    async function loadData() {
      try {
        loading.value = true;
        AllType.value = await getAllType({ eg_id: [1] });
        typeList.value = await getTypeList({ type_name: '' });
        const { list, total } = await listGetGoods({
          page: pagination.page,
          size: pagination.size,
          goods_name: '',
          keyword: '',
        });
        data.value = list;
        pagination.total = total;
      } finally {
        loading.value = false;
      }
    }
    async function editType(id, name) {
      innerVisible1.value = true;
      type.type_id = id;
      type.type_name = name;
      gettypeById.value = await getTypeById({ type_id: id });
      // type.SelectType = AllType.value.type_id;
      // await saveType({ type_id: String(type.type_id), type_name: type.type_name });
    }
    async function deleterType(id) {
      innerVisible2.value = true;
      type.type_id = id;
      gettypeById.value = await getTypeById({ type_id: id });
    }
    async function editeType(id) {
      if (id.length > 1) {
        await saveType({ type_id: String(id.pop()), type_name: type.type_name });
      } else {
        await saveType({ type_id: String(id), type_name: type.type_name });
      }
      getallType();
      innerVisible1.value = false;
    }
    async function deletetype(id) {
      if (id.length > 1) {
        await deleteType({ type_id: String(id.pop()) });
      } else {
        await deleteType({ type_id: String(id) });
      }
      getallType();
      Message.success('删除成功！');
      innerVisible2.value = false;
    }

    async function search() {
      try {
        loading.value = true;
        const { list, total } = await listGetGoods({
          page: pagination.page,
          size: pagination.size,
          goods_name: form.goods_name,
          keyword: form.keyword,
        });
        data.value = list;
        pagination.total = total;
      } finally {
        loading.value = false;
      }
    }
    async function saveGoods(id) {
      await saveGoodsDetail(goodsForm);
      dialogVisible3.value = false;
      loadData();
    }
    async function editGoodsInfo(id) {
      goodsInfo.value = await getGoodsInfo({ eg_id: id });
      goodsForm.eg_id = goodsInfo.value.eg_id;
      dialogVisible3.value = true;
      goodsForm.goods_name = goodsInfo.value.goods_name;
      goodsForm.barcode = goodsInfo.value.barcode;
      goodsForm.hscode = goodsInfo.value.hscode;
      goodsForm.country = goodsInfo.value.country;
      goodsForm.sku = goodsInfo.value.sku;
      goodsForm.ems_no = goodsInfo.value.ems_no;
      goodsForm.attr_name = goodsInfo.value.attr_name;
      goodsForm.ingredient = goodsInfo.value.ingredient;
      goodsForm.gross_weight = goodsInfo.value.gross_weight;
      goodsForm.net_weight = goodsInfo.value.net_weight;
      goodsForm.currency = goodsInfo.value.currency;
      // goodsForm.// name = goodsInfo.value.;
      goodsForm.form_price = goodsInfo.value.form_price;
      goodsForm.unit = goodsInfo.value.unit;
      goodsForm.price = goodsInfo.value.price;
      goodsForm.std_unit = goodsInfo.value.std_unit;
      goodsForm.unit_sum1 = goodsInfo.value.unit_sum1;
      goodsForm.sec_unit = goodsInfo.value.sec_unit;
      goodsForm.unit_sum2 = goodsInfo.value.unit_sum2;
      goodsForm.type_id = goodsInfo.value.type_id;
      goodsForm.main_photo = goodsInfo.value.main_photo;
    }
    loadData();
    return {
      innerVisible,
      innerVisible1,
      innerVisible2,
      dialogVisible,
      dialogVisible1,
      dialogVisible2,
      dialogVisible3,
      editGoodsInfo,
      goodsForm,
      deletetype,
      deleterType,
      UPLOAD_URL: `${process.env.VUE_APP_API_BASE_URL}/master/supply_sharing/importGoods`,
      UPLOAD_URL_MAIN: `${process.env.VUE_APP_API_BASE_URL}/master/supply_sharing/uploadPic`,
      form,
      saveGoods,
      editType,
      editeType,
      typeForm,
      gettypeById,
      type,
      data,
      // sort,
      AllType,
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
        console.log(selectedItems);
      },
      // tableSelected(val) {
      // // for (let selectedItem of val) {
      // //     selectData.value.push(selectedItem.eg_id);
      // //   }
      // },
      async ShopInBatch() {
        if (selectedItems.value.length === 0) {
          Message('未选择记录');
          return;
        }
        // console.log(selectedItems.value.map((item) => item.eg_id));
        const arr = selectedItems.value.map((item) => item.eg_id);
        window.location.href = `http://gzportapi.kjtrade.cn/master/supply_sharing/exportGoodsList?eg_id=${arr}`;
        // await exportGoodsList({ eg_id: [2] });
        Message.success('导出成功！');
        loadData();
      },
      uploadControl1: {
        onSuccess(response: any) {
          if (response.status) {
            goodsForm.main_photo = response.url;
          } else {
            Message.error(response.message);
          }
        },
      },
      async addType(id, name) {
        await addType({ parent_id: id ? id.pop() : '', type_name: name });
        loadData();
        getallType();
        clear();
        innerVisible.value = false;
        Message.success('添加成功！');
      },
      rules: {
        goods_name: [{ required: true, message: '必填项！', trigger: 'blur' }],
        barcode: [{ required: true, message: '必填项！', trigger: 'blur' }],
        hscode: [{ required: true, message: '必填项！', trigger: 'blur' }],
        country: [{ required: true, message: '必填项！', trigger: 'blur' }],
        gross_weight: [{ required: true, message: '必填项！', trigger: 'blur' }],
        net_weight: [{ required: true, message: '必填项！', trigger: 'blur' }],
        currency: [{ required: true, message: '必填项！', trigger: 'blur' }],
        form_price: [{ required: true, message: '必填项！', trigger: 'blur' }],
        unit: [{ required: true, message: '必填项！', trigger: 'blur' }],
        price: [{ required: true, message: '必填项！', trigger: 'blur' }],
        std_unit: [{ required: true, message: '必填项！', trigger: 'blur' }],
        unit_sum1: [{ required: true, message: '必填项！', trigger: 'blur' }],
      },
      async deleteBill(id) {
        await deleteBill({ eg_id: [id] });
        Message.success('删除成功！');
      },
      async setGoodsStatus(id, status) {
        if (status === 1) {
          status = 0;
        } else {
          status = 1;
        }
        await setGoodsStatus({ eg_id: [id], shelf_status: status });
        loadData();
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
      loading,
      pagination,
      value: [],
      typeList,
      deleteRow,
      search,
    };
  },
});
</script>

<style lang="scss" scoped>
.btcenter {
    margin: 5px;
}
.right {
  display: flex;
  // flex-direction: row-reverse;
  justify-content: flex-end;
  .button {
    margin: 10px;
  }
}
.center {
  margin-left: 120px;
}
</style>
