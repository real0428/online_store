<template>
  <div>
    <Title>{{ id ? '編輯' : '新增' }}分類</Title>
    <el-form ref="formRef" :model="form" :rules="rules" status-icon>
      <el-row class="flex">
        <div>分類名稱</div>
        <el-form-item prop="input">
          <el-input size="large" v-model="input" placeholder="輸入名稱" />
        </el-form-item>
      </el-row>
      <el-row class="flex">
        <div>上級分類</div>
        <el-select placeholder="請選擇" size="large" v-model="parentId">
          <el-option v-for="item in parents" :key="item.type_id" :label="item.name" :value="item.type_id" />
        </el-select>
      </el-row>
      <div class="flex justify-end">
        <SaveButton @click="save(formRef)">保存</SaveButton>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch, toRefs } from 'vue'
import { getNewsCategories, createNewsCategory, updateNewsCategory } from '@/api/news/category'
import { useMessage } from '@/composables/message'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps({
  id: {
    type: [Number, String, Array],
    default: ''
  }
})

interface Category {
  type_id: number,
  name: string
  [propName: string]: any
}

interface FormData {
  parents: Array<Category>
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

const rules = reactive<FormRules>({
  input: [{ required: true, message: "名稱不得為空", trigger: 'blur' }]
})

const { parents, input, typeId, parentId } = toRefs(form)

// 建立 / 更新分類
const save = (formEl: any) => {
  if (!formEl) return
  formEl.validate((valid: boolean) => {
    if (!valid) return false
    if (props.id) {
      updateNewsCategory(input.value, parentId.value, typeId.value).then(res => {
        useMessage({
          type: "success",
          message: res.message
        })
        router.push({
          path: '/news/categories_list'
        })
      })
    } else {
      createNewsCategory(input.value, parentId.value).then(res => {
        useMessage({
          type: "success",
          message: res.message
        })
        router.push({
          path: '/news/categories_list'
        })
      })
    }
  })
}

// 取得上級分類
const fetchParents = async (id: number) => {
  const res = await getNewsCategories()
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
}, {
  immediate: true
})

onMounted(() => {
  fetchParents(2)
})

</script>