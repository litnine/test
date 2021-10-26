<template>
  <div>
    <el-link
      type="primary"
      icon="el-icon-circle-plus-outline"
      :underline="false"
      @click="visible = true"
    >
      快捷添加
    </el-link>
    <el-dialog
      class="dialog"
      :visible.sync="visible"
      title="企业档案"
      width="340px"
    >
      <SelectEnterpriseList @select="onSelect" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
/* eslint-disable quote-props */
import {
  defineComponent, ref,
} from '@vue/composition-api';
import SelectEnterpriseList from './SelectEnterpriseList.vue';

export default defineComponent({
  name: 'SelectEnterprise',
  components: {
    SelectEnterpriseList,
  },
  setup(_, { emit }) {
    const visible = ref(false);
    return {
      visible,
      onSelect(data: any) {
        emit('select', data);
        visible.value = false;
      },
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap {
  display: inline-block;
}

.dialog {
  text-align: center;

  font-weight: normal;
  line-height: 1.5;
  ::v-deep .el-dialog__body {
    padding-top: 0;
  }
}
</style>
