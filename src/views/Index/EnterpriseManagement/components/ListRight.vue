<template>
  <el-card
    v-loading="loading"
    class="box__right"
  >
    <template v-if="activeCompanyId">
      <div class="title">
        <span>{{ profile.company_name }}</span>
        <div>
          <el-button
            type="primary"
            size="mini"
            @click="$router.push({ name: 'EnterpriseData' ,query: { id: activeCompanyId } })"
          >
            查看数据
          </el-button>
          <el-button
            size="mini"
            @click="$router.push({ name: 'EnterpriseEditing' ,query: { id: activeCompanyId } })"
          >
            修改信息
          </el-button>
          <el-popconfirm
            title="确定删除吗？"
            style="margin-left: 10px;"
            @confirm="onDeleteCompany"
          >
            <el-button
              slot="reference"
              type="danger"
              size="mini"
            >
              删除企业
            </el-button>
          </el-popconfirm>
        </div>
      </div>
      <div>
        <el-tag
          v-for="item in profile.sign"
          :key="item"
          color="#00baad"
          size="mini"
          effect="dark"
        >
          {{ item }}
        </el-tag>
      </div>
      <el-divider />
      <el-form
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="企业全称"
              prop="company_name"
            >
              <span class="text--primary">{{ profile.company_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="统一社会信用代码"
              prop="usc_code"
              label-width="150px"
            >
              <span class="text--primary">{{ profile.usc_code }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="法定代表人"
              prop="charge_name"
            >
              <span class="text--primary">{{ profile.charge_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="营业执照"
              prop="license_url"
            >
              <el-image
                class="license"
                fit="contain"
                :src="profile.license_url"
                :preview-src-list="[profile.license_url]"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="业务联系人"
              prop="b_link_name"
            >
              <span class="text--primary">{{ profile.b_link_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="业务联系人手机"
              prop="b_link_tel"
              label-width="150px"
            >
              <span class="text--primary">{{ profile.b_link_tel }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="技术联系人"
              prop="t_link_name"
            >
              <span class="text--primary">{{ profile.t_link_name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="技术联系人手机"
              prop="t_link_tel"
              label-width="150px"
            >
              <span class="text--primary">{{ profile.t_link_tel }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="shop-title">
        <i class="el-icon-s-shop" /> 店铺管理
      </p>
      <div v-loading="shopLoading">
        <div class="shop-actions">
          <div>
            <el-button
              type="primary"
              size="mini"
              @click="addShopVisible = true"
            >
              新增店铺
              <el-dialog
                title="新增店铺"
                :visible.sync="addShopVisible"
                width="400px"
                append-to-body
              >
                <AddShopForm
                  :company-id="profile.company_id"
                  @success="addShopVisible = false; loadShopList();"
                />
              </el-dialog>
            </el-button>
            <el-button
              type="danger"
              plain
              size="mini"
              @click="deleteShopInBatch"
            >
              批量删除
            </el-button>
          </div>
          <el-button
            class="f-r"
            size="mini"
            @click="sortVisible = true"
          >
            调整排序
            <el-dialog
              title="调整排序"
              :visible.sync="sortVisible"
              width="300px"
              append-to-body
            >
              <el-radio-group
                v-model="sortType"
                style="font-size: 1em;"
                @change="onSortTypeChange"
              >
                <p>
                  <el-radio
                    label="shop"
                    class="big-size"
                  >
                    按店铺名称
                  </el-radio>
                </p>

                <p>
                  <el-radio
                    label="platform"
                    class="big-size"
                  >
                    按平台名称
                  </el-radio>
                </p>

                <p>
                  <el-radio
                    label="turnover"
                    class="big-size"
                  >
                    按营业额
                  </el-radio>
                </p>
              </el-radio-group>
            </el-dialog>
          </el-button>
        </div>
        <el-table
          class="table"
          :data="shopList"
          max-height="288"
          @selection-change="onSelectionChange"
        >
          <el-table-column
            type="selection"
          />
          <el-table-column
            label="店铺名"
            prop="shop_name"
          />
          <el-table-column
            label="平台名"
            prop="platform_name"
          />
          <el-table-column
            label="负责人"
            prop="charge_name"
          />
          <el-table-column
            label="联系电话"
            prop="link_tel"
            width="120"
          />
          <el-table-column
            label="主营类目"
            prop="main_category"
          />
          <el-table-column
            label="营业额"
            prop="turnover"
          />
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
      </div>
    </template>
    <div
      v-else
      class="flexbox"
      style="height: 100%"
    >
      <span><i class="el-icon-warning" /> 尚未选择企业</span>
    </div>
  </el-card>
</template>

<script lang="ts">
import {
  defineComponent, ref, reactive, watch,
} from '@vue/composition-api';
import {
  getCompany, listShops, deleteShopInBatch, deleteCompany,
} from '@/api/enterprisemanagement';
import { ApiOutput } from '@/lib/axios-api-generator';
import { Message } from 'element-ui';
import AddShopForm from './ListRightAddShopForm.vue';

export default defineComponent({
  name: 'EnterpriseListRight',
  components: { AddShopForm },
  props: {
    activeCompanyId: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const loading = ref(false);
    const profile = ref({} as ApiOutput<typeof getCompany>);

    const shopLoading = ref(false);
    const shopList = ref([] as ApiOutput<typeof listShops>['list']);
    const sortVisible = ref(false);
    const sortType = ref('shop');
    const pagination = reactive({
      page: 1,
      size: 10,
      total: 0,
    });
    const selectedItems = ref([] as ApiOutput<typeof listShops>['list']);
    const addShopVisible = ref(false);

    async function loadShopList() {
      try {
        shopLoading.value = true;
        const {
          list,
          total,
        } = await listShops({
          company_id: props.activeCompanyId,
          sort_type: sortType.value,
          page: pagination.page,
          size: pagination.size,
        });
        shopList.value = list;
        pagination.total = total;
      } finally {
        shopLoading.value = false;
      }
    }

    async function loadProfile() {
      if (!props.activeCompanyId) {
        profile.value = {} as ApiOutput<typeof getCompany>;
        shopList.value = [];
        return;
      }
      try {
        loading.value = true;
        [profile.value] = await Promise.all([
          getCompany({ company_id: props.activeCompanyId }),
          loadShopList(),
        ]);
      } finally {
        loading.value = false;
      }
    }

    watch(() => props.activeCompanyId, loadProfile, { immediate: true });

    return {
      loading,
      pagination,
      profile,

      sortVisible,
      sortType,
      shopLoading,
      shopList,
      loadShopList,
      addShopVisible,
      onSortTypeChange() {
        loadShopList();
        sortVisible.value = false;
      },
      onSelectionChange(selection: any) {
        selectedItems.value = selection;
      },
      onSizeChange(size: number) {
        pagination.size = size;
        if (pagination.page > Math.ceil(pagination.total / size)) {
          // 此时会触发 onCurrentChange，避免请求两次
          return;
        }
        loadShopList();
      },
      onCurrentChange(page: number) {
        pagination.page = page;
        loadShopList();
      },
      async onDeleteCompany() {
        try {
          loading.value = true;
          await deleteCompany({
            company_id: props.activeCompanyId!,
          });
          Message.success('删除成功！');
          emit('deleted');
        } finally {
          loading.value = false;
        }
      },
      async deleteShopInBatch() {
        if (selectedItems.value.length === 0) {
          Message('未选择记录');
          return;
        }
        await deleteShopInBatch({ ids: selectedItems.value.map((item) => item.shop_id) });
        Message.success('删除成功！');
        loadShopList();
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.box__right {
  position: relative;

  flex: 1;

  ::v-deep >.el-card__body {

    height: 100%;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 6px;

    font-size: 18px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .el-form-item {
    margin-bottom: 6px;
  }

  .el-divider--horizontal {
    margin: 16px 0;
  }

  @at-root {
    .shop-title {
      color: $colorPrimary;
    }
    .shop-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 6px 12px;

      background: #eceff4;
    }
  }
}
.license {
  display: block;
  width: 60px;
  height: 60px;
}
</style>
