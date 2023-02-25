<!-- 文件上传 -->
<script lang='ts' setup>
import { Link } from '@element-plus/icons-vue'
import { confirmMessage, errorMessage } from 'element-next'
import type { UploadInstance, UploadFile, UploadFiles } from 'element-plus'
import { ref, computed, toRefs } from 'vue'
import { getDownloadPath } from '@/utils'
export interface UploadExpose {
  getFiles: () => UploadFiles
  clearFiles: () => void
}
const props = defineProps({
  limit: {
    type: Number,
    defualt: 1,
  },
  accept: {
    type: String,
    default: 'image/*',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  tip: String,
  btnText: {
    type: String,
    default: '请选择文件',
  },
  resetBtnText: {
    type: String,
    default: '重新上传',
  },
  url: String,
  fileMaxSize: {
    type: Number,
    default: 200,
  },
})

const { fileMaxSize } = toRefs(props)

const href = ref(props.url)

const uploadRef = ref<UploadInstance>()
const uploadFileList = ref<UploadFiles>([])

const doExceed = () => {
  errorMessage(`最多上传 ${props.limit} 个文件`)
}
const doChangeFile = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  if (uploadFile.size / 1024 > fileMaxSize.value) {
    errorMessage(`上传的文件不能超过 ${fileMaxSize.value} kb`)
    uploadRef.value.handleRemove(uploadFile)
  }
  else {
    uploadFileList.value = uploadFiles
  }
}
const doRetryUpload = () => {
  confirmMessage('删除后不能恢复，是否重新上传？').then(() => {
    href.value = null
  })
}

defineExpose<UploadExpose>({
  getFiles: () => uploadFileList.value,
  clearFiles: () => {
    uploadFileList.value.forEach((file) => {
      uploadRef.value.handleRemove(file)
    })
  },
})

const isPictrue = computed(() => {
  const imgUrl = href.value.toLowerCase()
  return imgUrl.endsWith('.png') || imgUrl.endsWith('.jpg') || imgUrl.endsWith('.jpeg')
})

const downloadPath = computed(() => {
  return getDownloadPath(href.value, true)
})
</script>

<template>
  <div v-if="href" class="w-full text-center">
    <el-image
      v-if="isPictrue"
      class="m-auto w-32 h-32"
      :src="downloadPath"
      :zoom-rate="1.2"
      :preview-src-list="[downloadPath]"
      fit="cover"
    />
    <p v-else>
      <el-link :href="downloadPath" target="_blank" :icon="Link">
        {{ href }}
      </el-link>
    </p>
    <div class="mt-3">
      <el-button
        type="danger"
        text
        :disabled="disabled"
        bg
        @click="doRetryUpload"
      >
        {{ resetBtnText }}
      </el-button>
    </div>
  </div>
  <el-upload
    v-else
    ref="uploadRef"
    :auto-upload="false"
    :accept="accept"
    :disabled="disabled"
    :limit="limit"
    :on-exceed="doExceed"
    :on-change="doChangeFile"
  >
    <template #trigger>
      <el-button type="primary" :disabled="disabled">
        {{ btnText }}
      </el-button>
    </template>

    <template #tip>
      <div v-if="tip" class="el-upload__tip" v-html="tip" />
    </template>
  </el-upload>
</template>

<style lang='scss' scoped>
</style>
