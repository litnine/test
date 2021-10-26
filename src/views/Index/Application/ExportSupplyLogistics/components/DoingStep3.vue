<template>
  <el-form
    ref="formRef"
    :model="formModel"
    label-width="100px"
    label-position="left"
    class="form"
    @submit.native.prevent="next"
  >
    <p class="global-tip">
      <i class="el-icon-question" />
      <span>
        新增节点后，将节点按照企业自身业务需求组成运输路线
        <br>
        若企业需要使用平台物流节点资源，可自行选择
      </span>
    </p>
    <p>
      <el-link
        class="control"
        type="primary"
        :underline="false"
        @click="addItem"
      >
        <i class="el-icon-circle-plus-outline" /> 增加
      </el-link>
    </p>
    <section
      v-for="(item, i) in formModel.items"
      :key="i"
    >
      <h4 class="form__section__title">
        <div>
          物流路线{{ i + 1 }}
          <span
            class="tip"
          >完整的货物运输线路，采购时选择路线后自动发起物流</span>
        </div>
        <el-link
          class="control"
          type="danger"
          :underline="false"
          :disabled="formModel.items.length === 1"
          @click="removeItem(i)"
        >
          <i class="el-icon-remove-outline" /> 删除
        </el-link>
      </h4>
      <el-form-item
        label="线路名称"
        :prop="`items[${i}].route_name`"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
      >
        <el-input
          v-model="item.route_name"
          class="input--inline"
        />
        <span
          class="tip"
        >物流线路名称，采购时企业使用名称标识路线。如：广州机场线、香港前海线等</span>
      </el-form-item>
      <el-form-item
        :prop="`items[${i}].detail`"
        :rules="{ required: true, message: '必填项！', trigger: 'blur' }"
        label-width="0"
      >
        <div>
          <el-cascader
            v-model="item.activeInput"
            :options="nodeTree"
            :props="{ label: 'warehouse_name', value: 'warehouse_id' }"
          />
          <el-link
            class="control"
            type="warning"
            :underline="false"
            style="margin-left: 20px"
            :disabled="item.activeInput.length < 2 || item.activeIndex === null"
            @click="addNode(item)"
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
              :class="{ 'node--checked': item.activeIndex === j - 1 }"
              :title="item.detail[j - 1] && item.detail[j - 1].warehouse_name"
              @click="item.activeIndex = j - 1"
            >
              {{ item.detail[j - 1] && item.detail[j - 1].warehouse_name }}
              <i
                v-if="item.detail[j - 1]"
                class="el-icon-circle-close"
                @click="$set(item.detail, j - 1, null)"
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
    <el-form-item
      label-width="0"
      class="t-c"
    >
      <el-button @click="prev">
        上一步
      </el-button>
      <el-button @click="save">
        保 存
      </el-button>
      <el-button
        type="primary"
        native-type="submit"
      >
        下一步
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  set,
} from '@vue/composition-api';
import { Message, Form } from 'element-ui';
import { ApiOutput } from '@/lib/axios-api-generator';

import { KEY } from '../config';
import {
  save3,
  next3,
  getNodes,
  SupplyLogistics,
} from '../api';

export default defineComponent<{
  data: SupplyLogistics;
}>({
  name: `Doing${KEY}Step3`,
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const formRef = ref(null as Form | null);

    const formModel = ref({
      items: props.data.route.map((item) => {
        const detail = new Array(4).fill(null);
        for (const node of item.detail) {
          detail[+node.sort] = node;
        }
        return {
          route_name: item.route_name,
          detail,
          activeIndex: null,
          activeInput: [] as [string?, string?],
        };
      }),
    });

    function addItem() {
      formModel.value.items.push({
        route_name: '',
        detail: [],
        activeIndex: null,
        activeInput: [],
      });
    }

    if (formModel.value.items.length === 0) {
      addItem();
    }

    function removeItem(index: number) {
      formModel.value.items.splice(index, 1);
    }

    const platformNodes = ref([] as ApiOutput<typeof getNodes>['warehouse_list']);
    async function loadPlatformNodes() {
      const { warehouse_list } = await getNodes({ service_id: props.data.service_id, type: 'common' });
      platformNodes.value = warehouse_list;
    }
    loadPlatformNodes();

    const nodeTree = computed(() => [
      {
        warehouse_id: 'self',
        warehouse_name: '自有节点',
        children: props.data.warehouse,
      },
      {
        warehouse_id: 'common',
        warehouse_name: '平台节点',
        children: platformNodes.value,
      },
    ]);

    function getNode([id1, id2]: [string?, string?]) {
      const item1 = nodeTree.value.find((item) => item.warehouse_id === id1);
      const item2 = item1?.children.find((item) => item.warehouse_id === id2);
      return {
        type: id1,
        ...item2,
      };
    }

    function addNode(item: typeof formModel.value.items[number]) {
      set(item.detail, item.activeIndex, {
        ...getNode(item.activeInput)!,
        sort: item.activeIndex,
      });
    }

    async function submit(next = false) {
      try {
        emit('update:loading', true);
        const data = await (next ? next3 : save3)({
          service_id: props.data.service_id,
          route: formModel.value.items.map((item) => ({
            route_name: item.route_name,
            detail: item.detail.filter((_) => _),
          })),
        });
        emit('patch:data', data);
      } finally {
        emit('update:loading', false);
      }
    }

    return {
      nodeTree,

      formRef,

      formModel,
      addItem,
      removeItem,
      addNode,
      prev() {
        emit('patch:data', { step: props.data.step - 1 });
      },
      async save() {
        await submit();
        Message.success('保存成功');
      },
      next() {
        // eslint-disable-next-line consistent-return
        formRef.value!.validate(async (valid: boolean) => {
          if (valid) {
            await submit(true);
          } else {
            return false;
          }
        });
      },
    };
  },
});
</script>

<style scoped lang="scss">
.form {
  width: 900px;
  margin: auto;
}

.form__section__title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 12px;

  border-bottom: 1px solid #d8d8d8;

  line-height: 40px;
}

.input--inline {
  width: 275px;
}

.tip {
  margin-left: 12px;

  color: #929292;

  font-size: 14px;
  font-weight: normal;
}

.global-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  .el-icon-question {
    margin-right: 10px;

    color: #ffc300;

    font-size: 30px;
  }
}

.control {
  font-size: 16px;
  line-height: 24px;
  [class^="el-icon"] {
    vertical-align: bottom;

    font-size: 24px;
  }
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

.node {
  cursor: pointer;
}

.node--checked {
  border-color: $colorPrimary;
}
</style>
