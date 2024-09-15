<template>
  <el-upload :auto-upload="false" :on-change="getFile" action="#" :show-file-list="false"
    :on-success="handleAvatarSuccess">
    <img v-if="imageUrl" :src="imageUrl" />
    <el-icon v-else class="uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useMessage } from '@/composables/message'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const emit = defineEmits(['get-file'])

const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  size: {
    type: Number
  }
})

const imageUrl = ref<string>('')

watch(() => props.image, (image) => {
  console.log('image', image)
  imageUrl.value = image
}, {
  immediate: true
})

const getFile = (file: any) => {
  const objectURL = URL.createObjectURL(file.raw)
  imageUrl.value = objectURL
  emit('get-file', file.raw, props.index, imageUrl.value)
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

/* const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(123);
  if (rawFile.type !== 'image/jpeg') {
    useMessage.error('檔案須為jpg格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    useMessage.error('檔案不能超過2MB!')
    return false
  }
  return true
} */
</script>

<style lang="scss">
.el-upload {
  width: 100%;
  height: 100%;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.el-upload:hover {
  border-color: transparent !important;
}

.el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.uploader-icon {
  font-size: 20px;
  color: #8c939d;
  text-align: center;
}
</style>
