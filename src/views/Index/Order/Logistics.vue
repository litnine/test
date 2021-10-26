<template>
  <el-main class="subpage">
    <el-card
      class="main-box"
      style="min-height: 540px;"
    >
      <h2>物流节点管理</h2>
      <el-button
        type="primary"
        size="small"
        @click="dialogVisible = true"
      >
        新增节点
      </el-button>
      <el-table
        ref="multipleTable"
        :data="WareData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="节点名称"
          prop="warehouse_name"
        />
        <el-table-column
          prop="warehouse_type_zn"
          label="节点类型"
        />
        <el-table-column
          prop="warehouse_address"
          label="详细地址"
        />
        <el-table-column
          label="现场海关"
          prop="customs_name"
        />
        <el-table-column
          prop="account"
          label="转运中心账号"
        />
        <el-table-column
          label="操作"
          width="120"
        >
          <template v-slot="{ row }">
            <el-button
              class="btcenter"
              type="primary"
              size="mini"
              @click.native.prevent="editBill(row.lw_id)"
            >
              编辑
            </el-button>
            <el-button
              class="btcenter"
              type="danger"
              size="mini"
              @click.native.prevent="deleteBill(row.lw_id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <h2>物流线路管理</h2>
      <el-button
        type="primary"
        size="small"
        @click="dialogVisible0 = true"
      >
        新增路线
      </el-button>
      <div
        v-for="(item,index) in RouteData"
        :key="index"
      >
        <div>
          <h3>线路{{ index+1 }}：{{ item.route_name }}</h3>
          <div class="btright">
            <el-button
              type="primary"
              size="mini"
              @click.native.prevent="editRoute(item.lr_id)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click.native.prevent="deleteRoute(item.lr_id)"
            >
              删除
            </el-button>
          </div>
        </div>
        <hr style="margin-bottom:15px;">
        <div>
          <el-input
            v-model="item.detail[0].warehouse_name"
            :placeholder="item.detail[0] ? item.detail[0].warehouse_name : ' '"
            disabled
            style=""
          />
          <i class="el-icon-right" />
          <el-input
            v-model="item.detail[1].warehouse_name"
            :placeholder="item.detail[1] ? item.detail[1].warehouse_name : ' '"
            disabled
            style="width: 150px;"
          />
          <i class="el-icon-right" />
          <el-input
            v-model="input1"
            :placeholder="item.detail[2] ? item.detail[2].warehouse_name : ' '"
            disabled
            style="width: 150px;"
          />
          <i class="el-icon-right" />
          <el-input
            v-model="input1"
            :placeholder="item.detail[3] ? item.detail[3].warehouse_name : ' '"
            disabled
            style="width: 150px;"
          />
        </div>
        <br>
      </div>
    </el-card>
    <el-dialog
      :visible.sync="dialogVisible0"
      title="新增路线"
      width="80%"
      center
    >
      <el-form
        ref="formRef"
        :model="formModelRouter"
        label-width="100px"
        label-position="left"
        class="form"
        @submit.native.prevent="next"
      >
        <section>
          <el-form-item
            label="线路名称"
            :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
          >
            <el-input
              v-model="formModelRouter.route_name"
              class="input--inline"
            />
            <span
              class="tip"
            >物流线路名称，采购时企业使用名称标识路线。如：广州机场线、香港前海线等</span>
          </el-form-item>
          <el-form-item
            :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
            label-width="0"
          >
            <div>
              <el-cascader
                v-model="formModelRouter.activeInput"
                :options="nodeTree"
                :props="{ label: 'warehouse_name', value: 'warehouse_id' }"
              />
              <el-link
                class="control"
                type="warning"
                :underline="false"
                style="margin: -6px  10px 0 20px;"
                :disabled="formModelRouter.activeInput.length < 2 || formModelRouter.activeIndex === null"
                @click="addNode(formModelRouter)"
              >
                <i class="el-icon-circle-plus" /> 加入
              </el-link>
              <span class="tip">1. 选中路线中的文本框；  2. 选择某一节点；  3. 点击加号添加到路线中</span>
            </div>
            <div class="tip">
              路线最多支持四个节点，若节点少于四个，则相应位置为空即可
            </div>
            <div class="route-nodes">
              <template v-for="j in 4">
                <div
                  :key="`node${j}`"
                  class="node el-input__inner"
                  :class="{ 'node--checked': formModelRouter.activeIndex === j - 1 }"
                  :title="formModelRouter.detail[j - 1] && formModelRouter.detail[j - 1].warehouse_name"
                  @click="formModelRouter.activeIndex = j - 1"
                >
                  {{ formModelRouter.detail[j - 1] && formModelRouter.detail[j - 1].warehouse_name }}
                  <i
                    v-if="formModelRouter.detail[j - 1]"
                    class="el-icon-circle-close"
                    @click="$set(formModelRouter.detail, j - 1, null)"
                  />
                </div>
                <i
                  :key="`icon${j}`"
                  class="el-icon-right"
                />
              </template>
            </div>
          </el-form-item>
        </section>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible0 = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addRouter()"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible2"
      title="编辑路线"
      width="80%"
      center
    >
      <el-form
        ref="formRef"
        :model="getrouteInfo"
        label-width="100px"
        label-position="left"
        class="form"
        @submit.native.prevent="next"
      >
        <section>
          <el-form-item
            label="线路名称"
            :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
          >
            <el-input
              v-model="getrouteInfo.route_name"
              class="input--inline"
            />
            <span
              class="tip"
            >物流线路名称，采购时企业使用名称标识路线。如：广州机场线、香港前海线等</span>
          </el-form-item>
          <el-form-item
            :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
            label-width="0"
          >
            <div>
              <el-cascader
                v-model="getrouteInfo.activeInput"
                :options="nodeTree"
                :props="{ label: 'warehouse_name', value: 'warehouse_id' }"
              />
              <el-link
                class="control"
                type="warning"
                :underline="false"
                style="margin: -6px  10px 0 20px;"
                :disabled="getrouteInfo.activeInput.length < 2 || getrouteInfo.activeIndex === null"
                @click="addNode(getrouteInfo)"
              >
                <i class="el-icon-circle-plus" /> 加入
              </el-link>
              <span class="tip">1. 选中路线中的文本框；  2. 选择某一节点；  3. 点击加号添加到路线中</span>
            </div>
            <div class="tip">
              路线最多支持四个节点，若节点少于四个，则相应位置为空即可
            </div>
            <div class="route-nodes">
              <template v-for="j in 4">
                <div
                  :key="`node${j}`"
                  class="node el-input__inner"
                  :class="{ 'node--checked': getrouteInfo.activeIndex === j - 1 }"
                  :title="getrouteInfo.detail[j - 1] && getrouteInfo.detail[j - 1].warehouse_name"
                  @click="getrouteInfo.activeIndex = j - 1"
                >
                  {{ getrouteInfo.detail[j - 1] && getrouteInfo.detail[j - 1].warehouse_name }}
                  <i
                    v-if="getrouteInfo.detail[j - 1]"
                    class="el-icon-circle-close"
                    @click="$set(getrouteInfo.detail, j - 1, null)"
                  />
                </div>
                <i
                  :key="`icon${j}`"
                  class="el-icon-right"
                />
              </template>
            </div>
          </el-form-item>
        </section>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button
            type="primary"
            @click="saveRouter()"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      title="新增节点"
      width="70%"
      center
      @close="clear()"
    >
      <el-form
        :model="formModel"
        label-width="100px"
        label-position="left"
        class="form"
      >
        <section>
          <el-form-item
            label="节点名称"
            :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
          >
            <el-input
              v-model="formModel.warehouse_name"
              class="input--inline"
            />
            <span class="tip">如广州南沙仓，香港元朗仓等，由中英文组成</span>
          </el-form-item>
          <el-form-item
            label="节点类型"
            :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
          >
            <el-select
              v-model="formModel.warehouse_type"
              placeholder="请选择"
              class="input--inline"
            >
              <el-option
                v-for="option in WAREHOUSE_TYPE_OPTIONS"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <span class="tip">选择节点的类型</span>
          </el-form-item>
          <el-form-item
            label="详细地址"
            :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
          >
            <el-input
              v-model="formModel.warehouse_address"
              class="input--inline"
            />
            <span class="tip">仓库或者是海关特殊监管场所的详细地址</span>
          </el-form-item>
          <el-form-item
            label="现场海关"
            :rules="{ required: formModel.warehouse_type == 1 || formModel.warehouse_type == 3, message: '必填项！', trigger: 'blur' }"
          >
            <el-input
              v-model="formModel.customs_name"
              class="input--inline"
            />
            <span class="tip">保税仓或海关特殊监管场所 <span style="color: #F56C6C">必 填</span></span>
          </el-form-item>
          <el-form-item
            label="用户名"
            :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
          >
            <el-input
              v-model="formModel.account"
              class="input--inline"
            />
            <span
              class="tip"
            >
              登录转运中心商家会员端账号名，10位以内，英文或数字组成
            </span>
          </el-form-item>
          <el-form-item
            label="密码"
            :rules="[
              { required: true, message: '必填项！', trigger: 'blur' },
              { validator: genPasswordValidator(formModel), trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="formModel.password"
              class="input--inline"
              type="password"
            />
            <span
              class="tip"
            >登录转运中心商家会员端账号密码，18位以内，英文或数字组成</span>
          </el-form-item>
          <el-form-item
            label="确认密码"
            :rules="[
              { required: true, message: '必填项！', trigger: 'blur' },
              { validator: genRePasswordValidator(formModel), trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="formModel.repassword"
              class="input--inline"
              type="password"
            />
            <span class="tip">再次确认登录密码</span>
          </el-form-item>
        </section>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="addWareNode()"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible1"
      title="编辑节点"
      width="70%"
      center
    >
      <el-form
        :model="getwarehouseNode"
        label-width="100px"
        label-position="left"
        class="form"
      >
        <section>
          <el-form-item
            label="节点名称"
            :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
          >
            <el-input
              v-model="getwarehouseNode.warehouse_name"
              class="input--inline"
            />
            <span class="tip">如广州南沙仓，香港元朗仓等，由中英文组成</span>
          </el-form-item>
          <el-form-item
            label="节点类型"
            :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
          >
            <el-select
              v-model="getwarehouseNode.warehouse_type"
              placeholder="请选择"
              class="input--inline"
            >
              <el-option
                v-for="option in WAREHOUSE_TYPE_OPTIONS"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <span class="tip">选择节点的类型</span>
          </el-form-item>
          <el-form-item
            label="详细地址"
            :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
          >
            <el-input
              v-model="getwarehouseNode.warehouse_address"
              class="input--inline"
            />
            <span class="tip">仓库或者是海关特殊监管场所的详细地址</span>
          </el-form-item>
          <el-form-item
            label="现场海关"
            :rules="{ required: formModel.warehouse_type == 1 || formModel.warehouse_type == 3, message: '必填项！', trigger: 'blur' }"
          >
            <el-input
              v-model="getwarehouseNode.customs_name"
              class="input--inline"
            />
            <span class="tip">保税仓或海关特殊监管场所 <span style="color: #F56C6C">必 填</span></span>
          </el-form-item>
          <el-form-item
            label="用户名"
            :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
          >
            <el-input
              v-model="getwarehouseNode.account"
              class="input--inline"
            />
            <span
              class="tip"
            >
              登录转运中心商家会员端账号名，10位以内，英文或数字组成
            </span>
          </el-form-item>
        </section>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button
            type="primary"
            @click="editWareNode()"
          >确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </el-main>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  set,
} from '@vue/composition-api';
import { ApiOutput } from '@/lib/axios-api-generator';
import { method } from 'lodash';

import {
  GetWarehouseInfo,
  deleteBill,
  deleteRoute,
  WarehouseList,
  WarehouseNode,
  getWarehouseNode,
  saveWarehouseNode,
  AddRouteInfo,
  saveRouteInfo,
  getRouteInfo,
} from '@/api/logistics';
import { Message } from 'element-ui';
import md5 from 'md5';

import get from 'lodash/get';

const WAREHOUSE_TYPE_OPTIONS = [
  {
    value: 1,
    label: '保税仓',
  },
  {
    value: 2,
    label: '海外仓',
  },
  {
    value: 3,
    label: '特殊监管保税外延仓',
  },
  {
    value: 4,
    label: '国内仓库',
  },
  {
    value: 5,
    label: '其他',
  },
];
export default defineComponent({
  name: 'LogisticsOrders',
  setup() {
    function deleteRow(index, rows) {
      rows.splice(index, 1);
    }
    const input1 = ref('');
    const dialogVisible0 = ref(false);
    const dialogVisible = ref(false);
    const dialogVisible1 = ref(false);
    const dialogVisible2 = ref(false);
    const WareData = ref([] as ApiOutput<typeof GetWarehouseInfo>['warehouse_info']);
    const getwarehouseNode = ref({} as ApiOutput<typeof getWarehouseNode>);
    const RouteData = ref([] as ApiOutput<typeof GetWarehouseInfo>['route_info']);
    const WarehouseCommon = ref({} as ApiOutput<typeof WarehouseList>['warehouse_list']);
    const loading = ref(false);
    async function loadData() {
      try {
        loading.value = true;
        const { warehouse_info, route_info } = await GetWarehouseInfo({ company_id: '' });
        WareData.value = warehouse_info;
        RouteData.value = route_info;
      } finally {
        loading.value = false;
      }
    }
    function genPasswordValidator(path: string) {
      return (_rule: any, value: string, callback: Function) => {
        const rePasswordPath = `${path}.rePassword`;
        callback();
      };
    }
    function getNode([id1, id2]: [string?, string?]) {
      const item1 = nodeTree.value.find((item) => item.warehouse_id === id1);
      const item2 = item1?.children.find((item) => item.warehouse_id === id2);
      return {
        type: id1,
        ...item2,
      };
    }
    function addNode(item: typeof formModelRouter.value) {
      set(item.detail, item.activeIndex, {
        ...getNode(item.activeInput)!,
        sort: item.activeIndex,
      });
    }
    function genRePasswordValidator(path: string) {
      return (_rule: any, value: string, callback: Function) => {
        if (value !== get(formModel.value, `${path}.password`)) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    }
    const nodesCommon = ref([] as ApiOutput<typeof WarehouseList>['warehouse_list']);
    const nodesSelf = ref([] as ApiOutput<typeof WarehouseList>['warehouse_list']);
    async function loadnodesCommon() {
      const { warehouse_list } = await WarehouseList({ type: 'common' });
      nodesCommon.value = warehouse_list;
    }
    async function loadnodesSelf() {
      const { warehouse_list } = await WarehouseList({ type: 'self' });
      nodesSelf.value = warehouse_list;
    }
    loadnodesSelf();
    loadnodesCommon();
    const nodeTree = computed(() => [
      {
        warehouse_id: 'self',
        warehouse_name: '自有节点',
        children: nodesSelf.value,
      },
      {
        warehouse_id: 'common',
        warehouse_name: '平台节点',
        children: nodesCommon.value,
      },
    ]);
    const formModel = ref({
      warehouse_name: '',
      warehouse_type: 1,
      warehouse_address: '',
      customs_name: '',
      account: '',
      password: '',
      repassword: '',
    });
    const formModelRouter = ref({
      route_name: '',
      detail: [],
      activeIndex: null,
      activeInput: [] as [string?, string?],
    });
    const getrouteInfo = ref({
      lr_id: 0,
      route_name: '',
      detail: [],
      activeIndex: null,
      activeInput: [] as [string?, string?],
    });
    async function addWareNode() {
      await WarehouseNode({
        warehouse_name: formModel.value.warehouse_name,
        warehouse_type: formModel.value.warehouse_type,
        warehouse_address: formModel.value.warehouse_address,
        customs_name: formModel.value.customs_name,
        account: formModel.value.account,
        password: md5(md5(formModel.value.password)),
        repassword: md5(md5(formModel.value.repassword)),
      });
      loadData();
      dialogVisible.value = false;
    }
    async function addRouter() {
      await AddRouteInfo({
        route_name: formModelRouter.value.route_name,
        detail: formModelRouter.value.detail,
      });
      loadData();
      dialogVisible0.value = false;
    }
    async function saveRouter() {
      await saveRouteInfo({
        lr_id: getrouteInfo.value.lr_id,
        route_name: getrouteInfo.value.route_name,
        detail: getrouteInfo.value.detail,
      });
      loadData();
      dialogVisible2.value = false;
    }
    async function editWareNode() {
      await saveWarehouseNode({
        lw_id: getwarehouseNode.value.lw_id,
        warehouse_name: getwarehouseNode.value.warehouse_name,
        warehouse_type: getwarehouseNode.value.warehouse_type,
        warehouse_address: getwarehouseNode.value.warehouse_address,
        customs_name: getwarehouseNode.value.customs_name,
        account: getwarehouseNode.value.account,
      });
      loadData();
      dialogVisible1.value = false;
    }
    async function editBill(id) {
      getwarehouseNode.value = await getWarehouseNode({ lw_id: id });
      dialogVisible1.value = true;
    }
    async function editRoute(id) {
      const { route_name, detail } = await getRouteInfo({ lr_id: id });
      getrouteInfo.value.lr_id = id;
      getrouteInfo.value.route_name = route_name;
      dialogVisible2.value = true;
    }
    function clear() {
      formModel.value = {
        warehouse_name: '',
        warehouse_type: 1,
        warehouse_address: '',
        customs_name: '',
        account: '',
        password: '',
        repassword: '',
      };
    }
    loadData();
    return {
      saveRouter,
      getwarehouseNode,
      formModelRouter,
      dialogVisible0,
      dialogVisible1,
      dialogVisible2,
      getrouteInfo,
      clear,
      addNode,
      editRoute,
      addRouter,
      nodesSelf,
      editBill,
      editWareNode,
      addWareNode,
      WAREHOUSE_TYPE_OPTIONS,
      genPasswordValidator,
      genRePasswordValidator,
      WareData,
      RouteData,
      nodeTree,
      input1,
      formModel,
      dialogVisible,
      async deleteBill(id) {
        await deleteBill({ lw_id: id });
        Message.success('删除成功！');
        loadData();
      },
      async deleteRoute(id) {
        await deleteRoute({ lr_id: id });
        Message.success('删除成功！');
        loadData();
      },
      deleteRow,
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
  justify-content: flex-start;
  flex-direction: column;
}
.form {
  width: 900px;
  margin: auto;
}
.route-nodes {
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: $colorInfo;
  .el-icon-right {
    margin: 0 15px;

    font-size: 30px;
    &:last-child {
      display: none;
    }
  }
  .node {
    position: relative;

    @extend %text-ellipsis;
    .el-icon-circle-close {
      position: absolute;
      top: 50%;
      right: 5px;

      display: none;

      transform: translateY(-50%);
    }
    &:hover {
      .el-icon-circle-close {
        display: block;
      }
    }
  }

}
.node--checked {
  border-color: $colorPrimary;
}
.btright {
  display: flex;
  // flex-direction: row-reverse;
  justify-content: flex-end;
  margin-top: -50px;
}
.control {
  font-size: 16px;
  line-height: 24px;
  [class^="el-icon"] {
    vertical-align: bottom;

    font-size: 24px;
  }
}
.el-input {
    width: 150px;
    margin: 0 40px;
}
</style>
