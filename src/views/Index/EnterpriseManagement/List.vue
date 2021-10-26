<template>
  <el-main>
    <div class="main-box">
      <ListLeft
        ref="listLeftRef"
        @change="activeCompanyId = $event"
      />
      <ListRight
        :active-company-id="activeCompanyId"
        @deleted="onDeleted"
      />
    </div>
  </el-main>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import ListLeft from './components/ListLeft.vue';
import ListRight from './components/ListRight.vue';

export default defineComponent({
  name: 'EnterpriseList',
  components: {
    ListLeft,
    ListRight,
  },
  // setup(props) {
  setup() {
    const listLeftRef = ref(null as any);
    const activeCompanyId = ref(undefined);
    return {
      listLeftRef,
      activeCompanyId,
      onDeleted() {
        listLeftRef.value!.onDeleted(activeCompanyId.value);
        activeCompanyId.value = undefined;
      },
    };
  },
});

</script>

<style lang="scss" scoped>
.main-box {
  display: flex;

  min-height: 750px;
}
</style>
