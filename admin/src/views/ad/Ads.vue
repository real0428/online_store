<template>
  <Title>{{ id ? '編輯' : '建立' }}廣告</Title>
  <div>
    <el-row class="flex mb-3">
      <el-input v-model="type_name" maxlength="50" show-word-limit style="width: 500px" size="large"
        placeholder="輸入名稱" />
      <el-button size="large" class="ml-3" @click="addAd">
        <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />新增廣告
      </el-button>
    </el-row>
    <el-row class="flex mb-3">
      <div class="grid grid-cols-4 gap-8">
        <div class="p-8 bg-white rounded" v-for="(ad, index) in images" :key="index">
          <UploadImage class="h-[160px]" :image="ad.imgUrl" :index="index" @get-file="getFile" />
          <div class="mb-3 mt-3">
            <span>連結</span>
            <div>{{ ad.url }}</div>
          </div>
          <div>
            <span>描述</span>
            <div>{{ ad.description }}</div>
          </div>
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
import type { AdData } from "@/types/ad"
import UploadImage from '@/components/UploadImage.vue'
import { uploadImage } from '@/api/upload/image'
import { uploadAd, getAd, updateAd } from '@/api/ad/ad'
import { useMessage } from '@/composables/message'

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
  useMessage.success(res.message)
  router.push({
    name: 'ad_list'
  })
}
</script>

<style lang="scss" scoped>
.el-row {
  @apply block mb-10
}
</style>