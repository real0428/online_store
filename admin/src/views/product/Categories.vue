<template>
  <div>
    <h1 class="mb-6">建立分類</h1>
    <div class="pl-10">
      <el-row class="flex mb-3">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">上級分類</span>
        <el-select placeholder="請選擇" size="large" style="width: 240px" v-model="parentId">
          <el-option v-for="item in parentOptions" :key="item.type_id" :label="item.name" :value="item.type_id" />
        </el-select>
      </el-row>
      <el-row class="flex mb-3">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">分類名稱</span>
        <el-input style="width: 240px" size="large" v-model="input" placeholder="輸入名稱" />
      </el-row>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { getProductCategories, createProductCategory, updateProductCategory } from '@/api/product/category'
import { ElMessage } from "element-plus"
import { useRouter } from 'vue-router'

interface Category {
  type_id: number,
  name: string
  [propName: string]: any
}


const props = defineProps({
  id: {
    type: [Number, String, Array],
    default: ''
  }
})

const parentOptions = ref<Array<Category>>([])
const input = ref<string | undefined>('')
const typeId = ref<string | number | undefined>('')
const parentId = ref<string | number>('')
const router = useRouter()

// 建立 / 更新分類
const save = () => {
  if (props.id) {
    updateProductCategory(input.value, parentId.value, typeId.value).then(response => {
      console.log(response);
      ElMessage({
        type: "success",
        message: response.message
      })
      router.push({
        path: '/product/categories_list'
      })
    })
  } else {
    createProductCategory(input.value, parentId.value).then(response => {
      console.log(response);
      ElMessage({
        type: "success",
        message: response.message
      })
      router.push({
        path: '/product/categories_list'
      })
    })
  }

}

const currentOption = ref<Category | null>()

// 取得上級分類
const fetchParentOptions = async () => {
  const res = await getProductCategories()
  parentOptions.value = res.data

  currentOption.value = parentOptions.value.find((item) => item.type_id === Number(props.id))
  input.value = currentOption.value?.name
  typeId.value = currentOption.value?.type_id
  parentId.value = currentOption.value?.parent_id
}

// 監聽二級分類id，如果id為null，表示新建分類
watch(() => props.id, (id) => {
  if (!id) {
    input.value = ''
    typeId.value = ''
    parentId.value = ''
  }
})

onMounted(() => {
  fetchParentOptions()
})

</script>