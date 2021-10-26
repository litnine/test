<template>
  <el-upload
    ref="uploadRef"
    class="img-uploader"
    :action="UPLOAD_URL"
    name="picture"
    accept="image/jpeg, image/png"
    :file-list="fileList"
    :show-file-list="false"
    :auto-upload="false"
    :limit="1"
    :on-success="onSuccess"
    :on-remove="onRemove"
    :on-preview="onPreview"
    :on-change="onChange"
  >
    <div
      class="img-container"
      :style="bodyStyle"
    >
      <template v-if="remoteURL">
        <img
          :src="remoteURL"
          class="img"
        >
        <div
          class="actions"
          @click.stop
        >
          <i
            class="el-icon-zoom-in action"
            @click="onPreview"
          />
          <i
            class="el-icon-delete action"
            @click="onRemove"
          />
        </div>
      </template>
      <i
        v-else
        class="el-icon-plus uploader__plus"
      />
    </div>

    <el-dialog
      :visible.sync="previewing"
      append-to-body
    >
      <img
        width="100%"
        :src="remoteURL"
        alt=""
      >
    </el-dialog>
    <el-dialog
      :visible.sync="cropping"
      width="960px"
      :close-on-click-modal="false"
      append-to-body
    >
      <div class="wrap">
        <img
          ref="imgRef"
          :src="localURL"
        >
      </div>
      <span slot="footer">
        <el-button @click="cropping = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="uploading"
          @click="uploadImg"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-upload>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  nextTick,
} from '@vue/composition-api';
import { Message } from 'element-ui';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';

export default defineComponent<{
  value: string;
  cropper?: {
    aspectRatio?: number;
    getCroppedCanvasOptions?: Cropper.GetCroppedCanvasOptions;
  };
}>({
  name: 'UploadImg',
  model: {
    event: 'change',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    bodyStyle: Object,
    cropper: Object,
  },
  setup(props, { emit }) {
    const uploadRef = ref(null as any);
    const imgRef = ref(null as HTMLImageElement | null);

    const fileList = ref([] as any[]);

    const localURL = ref('');
    const remoteURL = ref(props.value);
    watch(() => props.value, (val) => {
      remoteURL.value = val;
    });

    const cropping = ref(false);
    const uploading = ref(false);

    const previewing = ref(false);

    let cropper: Cropper;

    function validate(file: File) {
      const isLegalType = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isLegalType) {
        throw new Error('上传图片只能是 jpg、png 格式!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        throw new Error('上传图片大小不能超过 2MB!');
      }
    }

    return {
      UPLOAD_URL: `${process.env.VUE_APP_API_BASE_URL}/master/index/uploadFile`,

      uploadRef,
      imgRef,

      fileList,

      remoteURL,

      localURL,

      cropping,
      uploading,

      previewing,

      onSuccess(response: any) {
        if (response.status) {
          remoteURL.value = response.data.url;
          emit('change', response.data.url);
        }
      },
      onRemove() {
        uploadRef.value.clearFiles();
        remoteURL.value = '';
        emit('change', '');
      },
      onPreview() {
        previewing.value = true;
      },
      onChange(fileItem: any) {
        if (fileItem.response) {
          return;
        }

        const file: File = fileItem.raw;

        try {
          validate(file);
        } catch (error) {
          Message.error(error.message);
          return;
        }

        fileList.value = [fileItem];

        if (props.cropper) {
          localURL.value = URL.createObjectURL(file);
          cropping.value = true;
          nextTick(() => {
            if (cropper) {
              cropper.reset().replace(localURL.value);
            } else {
              cropper = new Cropper(imgRef.value!, {
                viewMode: 1,
                aspectRatio: props.cropper!.aspectRatio,
              });
            }
          });
        } else {
          uploadRef.value.submit();
        }
      },

      async uploadImg() {
        cropper.getCroppedCanvas(props.cropper!.getCroppedCanvasOptions).toBlob(async (blob) => {
          try {
            uploading.value = true;
            const { uid, name } = fileList.value[0].raw;
            const newFile = new File([blob!], name);
            Object.assign(newFile, { uid });
            Object.assign(fileList.value[0], { raw: newFile });
            uploadRef.value.submit();
          } finally {
            uploading.value = false;
            cropping.value = false;
          }
        });
      },
    };
  },
});
</script>

<style scoped lang="scss">
.img-uploader {
  line-height: 0;

  ::v-deep .el-upload {
    position: relative;

    overflow: hidden;

    cursor: pointer;

    border: 1px dashed #d9d9d9;
    border-radius: 6px;

    &:hover {
      border-color: #409eff;
    }
  }
}

.img-container {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 120px;
  height: 120px;
}

.uploader__plus {
  color: #8c939d;

  font-size: 28px;
}

.img {
  display: block;

  width: 100%;
  height: 100%;

  object-fit: contain;
}

.actions {
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  height: 100%;

  cursor: default;
  transition: opacity 0.3s;
  text-align: center;

  opacity: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);

  font-size: 20px;

  &:hover {
    opacity: 1;
  }

  @at-root {
    .action {
      cursor: pointer;
    }
  }
}
</style>
