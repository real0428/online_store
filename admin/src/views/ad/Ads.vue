<template>
  <h1 class="mb-6">{{ id ? '編輯' : '建立' }}廣告</h1>
  <div class="pl-10">
    <el-row class="flex mb-3">
      <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">名稱</span>
      <el-input v-model="type_name" maxlength="50" show-word-limit style="width: 500px" size="large"
        placeholder="輸入名稱" />
    </el-row>
    <el-row class="flex mb-3">
      <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">廣告</span>
      <el-button size="large" class="mb-3" @click="addAd">
        <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />新增廣告
      </el-button>
      <div class="grid grid-cols-3 gap-8">
        <div class="flex flex-wrap" v-for="(ad, index) in images" :key="index">
          <UploadImage :image="ad.imgUrl" :index="index" @get-file="getFile" />
          <el-row class="mb-3 mt-3 items-center w-full">
            <el-input class="mr-1 input-with-select" style="width: 500px" size="large" placeholder="http://"
              v-model="ad.url">
              <template #prepend width="300">
                <span>超連結</span>
              </template>
            </el-input>
          </el-row>
          <el-row class="mb-3 items-center w-full">
            <el-input class="mr-1 input-with-select" style="width: 500px" size="large" placeholder="描述"
              v-model="ad.description">
              <template #prepend width="300">
                <span>圖片描述</span>
              </template>
            </el-input>
          </el-row>
          <el-button class="ml-auto" type="danger" @click="deleteAd(index)">刪除</el-button>
        </div>
      </div>
    </el-row>
    <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, withDefaults, watch } from 'vue'
import { useRouter } from 'vue-router'
import UploadImage from '@/components/UploadImage.vue'
import { uploadImage } from '@/api/upload/image'
import { uploadAd, getAd, updateAd } from '@/api/ad/ad'
import { ElMessage } from 'element-plus'

interface RawFile {
  uid: String,
  name: String,
  size: Number,
  type: String,
  [propName: string]: any
}

const props = withDefaults(defineProps<{ id: string }>(), {
  id: ''
})

const router = useRouter()

const ad = reactive<AdData>({
  type_name: '',
  images: []
})

const { type_name, images } = toRefs(ad)

const fetchAd = async (id: string) => {
  const res = await getAd(id)
  const { type_name, images, type_id } = res.data
  ad.type_name = type_name
  ad.images = images
  ad.type_id = type_id
}

watch(() => props.id, () => {
  if (!!props.id) {
    fetchAd(props.id)
  } else {
    Object.assign(ad, { type_name: '', type_id: '', images: [] })
  }
}, {
  immediate: true
})

const getFile = async (f: RawFile, index: number) => {
  const res = await uploadImage(f)
  images.value[index].imgUrl = res.data.imgUrl
}

const addAd = () => {
  images.value.push({
    imgUrl: '',
    url: '',
    description: ''
  })
}

const deleteAd = (index: number) => {
  images.value.splice(index, 1)
}

const save = async () => {
  let res;
  if (!props.id) {
    res = await uploadAd(ad)
  } else {
    res = await updateAd(ad)
  }
  ElMessage.success(res.message)
  router.push({
    name: 'ad_list'
  })
}
</script>

<style lang="scss" scoped>
:deep() {

  .avatar-uploader,
  .el-upload {
    width: 100%;
  }

  .el-input-group__prepend {
    width: 85px;
  }
}
</style>