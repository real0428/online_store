<template>
  <div>
    <h1 class="mb-6">建立分類</h1>
    <div class="pl-10">
      <el-form :model="form" :rules="rules" ref="formRef" status-icon>
        <el-row class="flex mb-3">
          <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">上級分類</span>
          <el-select placeholder="請選擇" size="large" style="width: 240px" v-model="parentId">
            <el-option label="請選擇" value="" />
            <el-option v-for="item in parents" :key="item.type_id" :label="item.name" :value="item.type_id" />
          </el-select>
        </el-row>
        <el-row class="flex mb-3">
          <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">分類名稱</span>
          <el-form-item prop="input">
            <el-input style="width: 240px" size="large" v-model="input" placeholder="輸入名稱" />
          </el-form-item>
        </el-row>
        <el-button type="primary" @click="save(formRef)">保存</el-button>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch, toRefs } from 'vue'
import { getProductCategories, createProductCategory, updateProductCategory } from '@/api/product/category'
import { ElMessage } from "element-plus"
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import type { Category } from '@/types/category'

const props = defineProps({
  id: {
    type: [Number, String, Array],
    default: ''
  }
})

interface FormData {
  parents: Category[]
  input: string | undefined
  typeId: string | number | undefined
  parentId: string | number
}

const router = useRouter()

const formRef = ref<FormInstance>()

const form = reactive<FormData>({
  parents: [],
  input: '',
  typeId: '',
  parentId: ''
})

const rules = reactive<FormRules<FormData>>({
  input: [
    { required: true, message: '名稱不得為空', trigger: 'blur' }
  ]
})

const { parents, input, typeId, parentId } = toRefs(form)

// 建立 / 更新分類
const save = (formEl: any) => {
  if (!formEl) return
  formEl.validate((valid: boolean) => {
    if (!valid) return false
    if (props.id) {
      updateProductCategory(input.value, parentId.value, typeId.value).then(response => {
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
  })
}

// 取得上級分類
const fetchParents = async () => {
  const res = await getProductCategories()
  parents.value = res.data
  const currentOption = parents.value.find((item) => item.type_id === Number(props.id))
  input.value = currentOption?.name
  typeId.value = currentOption?.type_id
  parentId.value = currentOption?.parent_id
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
  fetchParents()
})

</script>