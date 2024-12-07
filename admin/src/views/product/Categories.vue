<template>
  <div>
    <Title>{{ id ? '編輯' : '新增' }}分類</Title>
    <div>
      <el-form :model="categoryData" :rules="rules" ref="formRef" status-icon>
        <el-row>
          <div>分類名稱</div>
          <el-form-item prop="input">
            <el-input size="large" v-model="input" placeholder="輸入名稱" />
          </el-form-item>
        </el-row>
        <el-row>
          <div>上級分類</div>
          <el-select placeholder="請選擇" size="large" v-model="parentId">
            <el-option :value="0" label="請選擇"></el-option>
            <el-option v-for="item in parents" :key="item.type_id" :label="item.name" :value="item.type_id" />
          </el-select>
        </el-row>
        <div class="flex justify-end">
          <SaveButton @click="save()">保存</SaveButton>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, toRefs } from 'vue'
import { getProductCategories, createProductCategory, updateProductCategory } from '@/api/product/category'
import { useMessage } from '@/composables/message'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import type { Category } from '@/types/category'

interface ICategoryData {
  parents: Category[]
  input: string
  typeId: number
  parentId: number | undefined
}

const props = defineProps<{ id?: number }>()
const router = useRouter()

const categoryData = reactive<ICategoryData>({
  parents: [],
  input: '',
  typeId: 0,
  parentId: 0
})

const rules = reactive<FormRules>({
  input: [
    { required: true, message: '名稱不得為空', trigger: 'blur' }
  ]
})

const { parents, input, typeId, parentId } = toRefs(categoryData)

// 建立 / 更新分類
const formRef = ref<FormInstance>()
const save = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) return false
    let response = {} as ApiResponse
    try {
      if (props.id) {
        response = await updateProductCategory(input.value, parentId.value, typeId.value)
      } else {
        response = await createProductCategory(input.value, parentId.value)
      }
      useMessage({
        type: "success",
        message: response.message
      })
      router.push({
        path: '/admin/product/categories_list'
      })
    } catch (error: any) {
      useMessage({
        type: "warning",
        message: error.message
      })
    }
  })
}

// 取得上級分類
const fetchParents = async () => {
  const { data } = await getProductCategories()
  parents.value = data as Category[]
  const currentOption = parents.value.find((item) => item.type_id === Number(props.id))
  input.value = currentOption?.name as string
  typeId.value = currentOption?.type_id as number
  parentId.value = currentOption?.parent_id
}

// 監聽二級分類id，如果id為null，表示新建分類
watch(() => props.id, (id) => {
  if (!id) {
    input.value = ''
    typeId.value = 0
    parentId.value = 0
  }
})

fetchParents()

</script>
