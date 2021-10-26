<template>
  <el-main class="subpage">
    <el-card
      v-loading="loading"
      class="main-box"
    >
      <DoingPageHeader
        title="跨境电商进口物流"
        :data="data"
        :steps="['填写资料', '添加节点', '组合路线', '平台审核', '申请完成']"
      />
      <DoingStep1
        v-if="data.step == 1"
        :data="data"
        :loading.sync="loading"
        @patch:data="patchData"
      />
      <DoingStep2
        v-else-if="data.step == 2"
        :data="data"
        :loading.sync="loading"
        @patch:data="patchData"
      />
      <DoingStep3
        v-else-if="data.step == 3"
        :data="data"
        :loading.sync="loading"
        @patch:data="patchData"
      />
      <DoingStep4
        v-if="data.step == 4"
        :data.sync="data"
        :loading.sync="loading"
        @patch:data="patchData"
      />
      <DoingStep5
        v-if="data.step == 5"
        :data.sync="data"
        :loading.sync="loading"
        @patch:data="patchData"
      />
    </el-card>
  </el-main>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from '@vue/composition-api';
import { ApiOutput } from '@/lib/axios-api-generator';

import DoingPageHeader from '@/components/DoingPageHeader.vue';
import DoingStep1 from './components/DoingStep1.vue';
import DoingStep2 from './components/DoingStep2.vue';
import DoingStep3 from './components/DoingStep3.vue';
import DoingStep4 from './components/DoingStep4.vue';
import DoingStep5 from './components/DoingStep5.vue';

import { KEY } from './config';
import { getDetail } from './api';

export default defineComponent({
  name: `Doing${KEY}`,
  components: {
    DoingPageHeader,
    DoingStep1,
    DoingStep2,
    DoingStep3,
    DoingStep4,
    DoingStep5,
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
