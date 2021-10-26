<template>
  <el-main class="subpage">
    <el-card
      v-loading="loading"
      class="main-box"
    >
      <DoingPageHeader
        title="跨境电商出口独立站建设"
        :data="data"
        :steps="['填写信息', '技术处理', '平台审核', '申请完成']"
      />
      <DoingExportExportIndependentStationStep1
        v-if="data.step == 1"
        :data="data"
        :loading.sync="loading"
        @patch:data="patchData"
      />
      <DoingExportExportIndependentStationStep2
        v-else-if="data.step == 2"
        :data="data"
        :loading.sync="loading"
        @patch:data="patchData"
      />
      <DoingExportExportIndependentStationStep3
        v-else-if="data.step == 3"
        :data="data"
        :loading.sync="loading"
        @patch:data="patchData"
      />
      <DoingExportExportIndependentStationStep4
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
import {
  defineComponent,
  ref,
} from '@vue/composition-api';
import DoingPageHeader from '@/components/DoingPageHeader.vue';
import DoingExportExportIndependentStationStep1 from '@/components/DoingExportExportIndependentStationStep1.vue';
import DoingExportExportIndependentStationStep2 from '@/components/DoingExportExportIndependentStationStep2.vue';
import DoingExportExportIndependentStationStep3 from '@/components/DoingExportExportIndependentStationStep3.vue';
import DoingExportExportIndependentStationStep4 from '@/components/DoingExportExportIndependentStationStep4.vue';

import { getDetail } from '@/api/exportSupplyLogistics';
import { ApiOutput } from '@/lib/axios-api-generator';

export default defineComponent({
  name: 'DoingExportIndependentStation',
  components: {
    DoingPageHeader,
    DoingExportExportIndependentStationStep1,
    DoingExportExportIndependentStationStep2,
    DoingExportExportIndependentStationStep3,
    DoingExportExportIndependentStationStep4,
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
      data.value.step = 2;
    }

    return {
      loading,
      data,

      patchData,
    };
  },
});
</script>
