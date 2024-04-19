<template>
  <div>
    <h1 class="mb-6">{{ id ? '編輯' : '建立' }}商品</h1>
    <div class="pl-10">
      <el-row class="mb-3">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">所屬分類</span>
        <el-select placeholder="請選擇" size="large" style="width: 178px" v-model="typeId">
          <el-option v-for="item in parentOptions" :key="item.type_id" :label="item.name" :value="item.type_id" />
        </el-select>
      </el-row>
      <el-row class="mb-3">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">商品封面</span>
        <UploadImage :image="form.image_url" @get-file="getFile" />
      </el-row>
      <el-row class="mb-3">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">商品名稱</span>
        <el-input maxlength="30" show-word-limit style="width: 500px" size="large" v-model="form.name"
          placeholder="輸入名稱" />
      </el-row>
      <el-row class="mb-3">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">商品簡述</span>
        <el-input maxlength="50" show-word-limit style="width: 500px" size="large" v-model="form.description"
          placeholder="輸入簡述" />
      </el-row>
      <el-row class="mb-3 items-center">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">商品原價</span>
        <el-input class="mr-1 input-with-select" style="width: 178px" size="large" v-model="form.ori_price"
          placeholder="輸入價格">
          <template #prepend>
            <span>NT$</span>
          </template>
        </el-input>
      </el-row>
      <el-row class="mb-3 items-center">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">商品售價</span>
        <el-input class="mr-1 input-with-select" style="width: 178px" size="large" v-model="form.sale_price"
          placeholder="輸入價格">
          <template #prepend>
            <span>NT$</span>
          </template>
        </el-input>
      </el-row>
      <el-row class="mb-3 items-center">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">商品庫存</span>
        <el-input-number class="mr-1 input-with-select" style="width: 130px" size="large" type="number"
          v-model="form.stock" placeholder="輸入價格">
          <template #prepend>
            <span>單位:個</span>
          </template>
        </el-input-number>
      </el-row>
      <el-row class="mb-3">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">商品介紹</span>
        <div class="max-w-[600px]">
          <PostEditor ref="editor" v-model:content="form.body" />
        </div>
      </el-row>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { getProductCategories } from '@/api/product/category'
import { createProduct, getProductInfo, updateProductInfo } from '@/api/product/product'
import { ElMessage } from "element-plus"
import { useRouter } from 'vue-router'
import UploadImage from '@/components/UploadImage.vue'
import PostEditor from '@/components/PostEditor.vue'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

interface Category {
  type_id: number,
  name: string
  [propName: string]: any
}

interface RawFile {
  uid: String,
  name: String,
  size: Number,
  type: String,
  [propName: string]: any
}

const input = ref<string | undefined>('')
const typeId = ref<string | number | undefined>('')
const router = useRouter()

let form = reactive({
  item_id: 0,
  name: '',
  description: '',
  ori_price: null,
  sale_price: null,
  stock: 0,
  update_time: '',
  image: {},
  image_url: '',
  body: '',
  type_id: typeId,
  is_active: 0
})

const parentOptions = ref<Array<Category>>([])
const currentOption = ref<Category | null>()

// 取得上級分類
const fetchParentOptions = async () => {
  const res = await getProductCategories()
  parentOptions.value = res.data
  currentOption.value = parentOptions.value.find((item) => item.type_id === Number(form.type_id))
  input.value = currentOption.value?.name
  typeId.value = currentOption.value?.type_id
}

const fetchProductInfo = async (id: number) => {
  const res = await getProductInfo(id)
  const [data] = res.data // 使用解構賦值獲取數組的第一個元素
  Object.keys(form).forEach(key => {
    form[key] = data?.[key] || ''
  })
}

const editor = ref()

// 監聽二級分類id，如果id為null，表示新建分類
watch(() => props.id, (id) => {
  if (!id) {

    input.value = ''
    typeId.value = ''

    Object.assign(form, {
      name: '',
      description: '',
      image: {},
      image_url: '',
      ori_price: null,
      sale_price: null,
      stock: 0,
      body: '',
      type_id: typeId.value,
      is_active: 0
    })
    editor.value?.resetEditor()

  } else {
    fetchProductInfo(Number(id))
  }
  fetchParentOptions()
}, {
  immediate: true,
})

const getFile = (f: RawFile) => {
  form.image = f
}

// 保存
const save = () => {
  // 編輯
  if (props.id) {
    form.item_id = Number(props.id)
    form.is_active = 0
    updateProductInfo(form).then((res: { message: any }) => {
      ElMessage({
        type: "success",
        message: res.message
      })
      router.push({
        path: '/product/list'
      })
    })
    // 新建
  } else {
    createProduct(form).then((res: { message: any }) => {
      ElMessage({
        type: "success",
        message: res.message
      })
      router.push({
        path: '/product/list'
      })
    })
  }
}
</script>

<style>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
  width: 60px;
}
</style>