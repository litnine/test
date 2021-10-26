<template>
  <div
    class="t-c"
  >
    <el-row
      type="flex"
      align="middle"
    >
      <el-col
        :span="5"
        :offset="2"
      >
        <p>1. 企业下载合同模板</p>
        <p>2. 填写相关合同信息</p>
        <p>3. 确认合同信息无误</p>
        <p>4. 盖章扫描回传系统</p>
        <p>5. 平台正式签订</p>
      </el-col>
      <el-col :span="10">
        <p>
          <span
            class="urgent"
          >
            <span class="urgent__tag">下载</span>
            <span class="urgent__label">点击获取委托申报合同模板</span>
          </span>
        </p>
        <p>
          <el-upload
            drag
            :action="UPLOAD_URL"
            name="picture"
            :limit="1"
            :on-success="uploadControl.onSuccess"
            :on-remove="uploadControl.onRemove"
            :before-upload="uploadControl.beforeUpload"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              点击回传盖章后的电子版合同，或将文件拖到此处
            </div>
          </el-upload>
        </p>
      </el-col>
    </el-row>
    <p>
      <el-button
        type="primary"
        @click="next"
      >
        下一步
      </el-button>
    </p>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from '@vue/composition-api';
import UploadImg from '@/components/UploadImg.vue';

import { KEY } from '../config';
import { next2 } from '../api';

export default defineComponent({
  name: `Doing${KEY}Step2`,
  components: {
    UploadImg,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const formModel = ref({
      contract_url: '',
    });

    return {
      UPLOAD_URL: `${process.env.VUE_APP_API_BASE_URL}/master/index/uploadFile`,

      formModel,
      uploadControl: {
        onSuccess(response: any) {
          if (response.status) {
            formModel.value.contract_url = response.data.url;
          }
        },
        onRemove() {
          formModel.value.contract_url = '';
        },
        beforeUpload() {
          return true;
        },
      },
      async next() {
        try {
          emit('update:loading', true);
          const data = await next2({
            service_id: props.data.service_id,
            ...formModel.value,
          });
          emit('patch:data', data);
        } finally {
          emit('update:loading', false);
        }
      },
    };
  },
});
</script>

<style scoped lang="scss">

.urgent {
  display: inline-block;

  cursor: pointer;

  border: 1px solid #ccc;

  font-size: 14px;
  line-height: 2;
  .urgent__tag {
    display: inline-block;

    padding: 0 1em;

    color: #fff;
    background: #ff5733;
  }
  .urgent__label {
    display: inline-block;

    padding: 0 .5em;
  }
}

</style>
