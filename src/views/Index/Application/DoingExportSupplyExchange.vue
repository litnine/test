<template>
  <el-main class="subpage">
    <el-card
      v-loading="loading"
      class="main-box"
    >
      <DoingPageHeader
        title="跨境电商出口收结汇（B2C）"
        :data="data"
        :steps="['银行开户', '填写信息', '平台审核', '申请完成']"
      />

      <DoingExportSupplyExchangeStep1
        v-if="data.step == 1"
        :data="data"
        :loading.sync="loading"
        @patch:data="patchData"
      />
      <DoingExportSupplyExchangeStep2
        v-else-if="data.step == 2"
        :data="data"
        :loading.sync="loading"
        @patch:data="patchData"
      />
      <DoingExportSupplyExchangeStep3
        v-else-if="data.step == 3"
        :data="data"
        :loading.sync="loading"
        @patch:data="patchData"
      />
      <DoingExportSupplyExchangeStep4
        v-if="data.step == 4"
        :data.sync="data"
        :loading.sync="loading"
        @patch:data="patchData"
      />
    </el-card>
  </el-main>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { defineComponent, ref } from '@vue/composition-api';
import DoingPageHeader from '@/components/DoingPageHeader.vue';
import DoingExportSupplyExchangeStep1 from '@/components/DoingExportSupplyExchangeStep1.vue';
import DoingExportSupplyExchangeStep2 from '@/components/DoingExportSupplyExchangeStep2.vue';
import DoingExportSupplyExchangeStep3 from '@/components/DoingExportSupplyExchangeStep3.vue';
import DoingExportSupplyExchangeStep4 from '@/components/DoingExportSupplyExchangeStep4.vue';

import { getDetail } from '@/api/exportSupplyExchange';
import { ApiOutput } from '@/lib/axios-api-generator';

export default defineComponent({
  name: 'DoingExportSupplyExchange',
  components: {
    DoingPageHeader,
    DoingExportSupplyExchangeStep1,
    DoingExportSupplyExchangeStep2,
    DoingExportSupplyExchangeStep3,
    DoingExportSupplyExchangeStep4,
  },
  props: {
    id: Number,
  },
  setup(props) {
    const loading = ref(false);

    const data = ref({ step: 0 } as ApiOutput<typeof getDetail>);

    function patchData(patch: any) {
      data.value = { ...data.value, ...patch };
    }

    async function loadData() {
      try {
        loading.value = true;
        data.value = await getDetail({ service_id: props.id! });
      } finally {
        loading.value = false;
      }
    }

    if (props.id) {
      loadData();
    } else {
      data.value.step = 1;
    }

    return {
      loading,
      data,

      patchData,
    };
  },
});
</script>

<style scoped lang="scss">
.irrelevant {
  font-size: 18px;
}

.container__title {
  margin-left: 0.5em;

  color: rgb(255, 141, 26);

  font-size: 25px;
}

.info {
  color: rgb(166, 166, 166);

  font-size: 12px;
}
</style>
