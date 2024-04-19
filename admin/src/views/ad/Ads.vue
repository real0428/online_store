<template>
  <h1 class="mb-6">建立廣告</h1>
  <div class="pl-10">
    <el-row class="flex mb-3">
      <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">名稱</span>
      <el-input v-model="type_name" maxlength="50" show-word-limit style="width: 500px" size="large"
        placeholder="輸入名稱" />
    </el-row>
    <el-row class="flex mb-3">
      <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">廣告</span>

      <el-button type="success" size="large" class="mb-3" @click="addAd">新增廣告</el-button>
      <div class="grid grid-cols-3 gap-8">
        <div class="flex flex-wrap" v-for="(ad, index) in ads" :key="index">
          <UploadImage :index="index" @get-file="getFile" />
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
          <el-button type="danger">刪除</el-button>
        </div>
      </div>
    </el-row>
    <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import UploadImage from '@/components/UploadImage.vue'
import { uploadImage } from '@/api/upload/image'
import { uploadAd } from '@/api/ad/ad'

interface RawFile {
  uid: String,
  name: String,
  size: Number,
  type: String,
  [propName: string]: any
}

const adData = reactive<AdData>({
  type_name: '',
  ads: []
})

const { type_name, ads } = toRefs(adData)

const getFile = async (f: RawFile, index: number) => {
  const res = await uploadImage(f)
  ads.value[index].imgUrl = res.data.imgUrl
}

const addAd = () => {
  ads.value.push({
    imgUrl: '',
    url: '',
    description: ''
  })
}

const save = async () => {
  const res = await uploadAd(adData)
  console.log(res)
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