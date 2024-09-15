<template>
  <div>
    <Title>{{ id ? '編輯' : '建立' }}商品</Title>
    <el-form :model="form" ref="formRef" :rules="rules">
      <el-row class="mb-3">
        <div>所屬分類</div>
        <el-form-item class="block" prop="type_id">
          <el-select placeholder="請選擇" size="large" v-model="form.type_id">
            <el-option v-for="item in parents" :key="item.type_id" :label="item.name" :value="item.type_id" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row class="mb-3">
        <div>商品封面</div>
        <el-form-item prop="image_url">
          <UploadImage class="w-[200px] h-[200px] bg-white" :image="form.image_url" @get-file="getFile" />
        </el-form-item>
      </el-row>
      <el-row class="mb-3">
        <div>商品名稱</div>
        <el-form-item prop="name">
          <el-input maxlength="30" show-word-limit size="large" v-model="form.name" placeholder="輸入名稱" />
        </el-form-item>
      </el-row>
      <el-row class="mb-3">
        <div>商品簡述</div>
        <el-form-item prop="description">
          <el-input maxlength="50" show-word-limit size="large" v-model="form.description" placeholder="輸入簡述" />
        </el-form-item>
      </el-row>
      <el-row class="mb-3 items-center">
        <div>商品原價</div>
        <el-form-item prop="ori_price">
          <el-input class="mr-1 input-with-select" style="width: 180px" size="large" v-model.number="form.ori_price"
            placeholder="輸入價格">
            <template #prepend>
              <span>NT$</span>
            </template>
          </el-input>
        </el-form-item>
      </el-row>
      <el-row class="mb-3 items-center">
        <div>商品售價</div>
        <el-form-item prop="sale_price">
          <el-input class="mr-1 input-with-select" style="width: 180px" size="large" v-model.number="form.sale_price"
            placeholder="輸入價格">
            <template #prepend>
              <span>NT$</span>
            </template>
          </el-input>
        </el-form-item>
      </el-row>
      <el-row class="mb-3 items-center">
        <div>商品庫存</div>
        <el-form-item prop="stock" :status-icon="false">
          <el-input-number :min="0" :max="99" class="mr-1 input-with-select" style="width: 130px" size="large"
            type="number" v-model.number="form.stock" placeholder="庫存">
            <template #prepend>
              <span>單位:個</span>
            </template>
          </el-input-number>
        </el-form-item>
      </el-row>
      <el-row class="mb-3">
        <div>商品介紹</div>
        <div class="rounded overflow-hidden">
          <PostEditor ref="editor" v-model:content="form.body" />
        </div>
      </el-row>
      <div class="flex justify-end">
        <SaveButton @click="save()">保存</SaveButton>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref, reactive, watch, onMounted } from 'vue'
import { getProductCategories } from '@/api/product/category'
import { createProduct, getProductInfo, updateProductInfo } from '@/api/product/product'
import { useMessage } from '@/composables/message'
import { useRouter } from 'vue-router'
import UploadImage from '@/components/UploadImage.vue'
import PostEditor from '@/components/PostEditor.vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { Category } from '@/types/category'

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

interface FormData {
  parents: Category[]
  item_id: string | number
  name: string
  description: string
  ori_price: number
  sale_price: number
  stock: number
  update_time: string
  image?: object
  image_url?: string
  body: string
  type_id: string | number | undefined
  is_active: number
  [key: string]: any;
}

const router = useRouter()

let form = reactive<FormData>({
  parents: [],
  item_id: 0,
  name: '',
  description: '',
  ori_price: 0,
  sale_price: 0,
  stock: 0,
  update_time: '',
  image: {},
  image_url: '',
  body: '',
  type_id: 0,
  is_active: 0
})

const formRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  type_id: [
    { required: true, message: '分類為必填', trigger: 'blur' }
  ],
  image_url: [
    { required: true, message: '未上傳圖片', trigger: 'change' }
  ],
  name: [
    { required: true, message: '名稱為必填', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '商品簡述為必填', trigger: 'blur' }
  ],
  ori_price: [
    { required: true, message: '原價為必填', trigger: 'blur' },
    { type: 'number', message: '原價必須為數字', trigger: 'blur' }
  ],
  sale_price: [
    { required: true, message: '售價為必填', trigger: 'blur' },
    { type: 'number', message: '售價必須為數字', trigger: 'blur' }
  ],
  stock: [
    { required: true, message: '庫存為必填', trigger: 'blur' }
  ]
})

const { type_id, parents, body } = toRefs(form)

// 取得上級分類
const fetchparents = async () => {
  const res = await getProductCategories()
  parents.value = res.data
  const currentOption = parents.value.find((item) => item.type_id === Number(form.type_id))
  type_id.value = currentOption?.type_id
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
    Object.assign(form, {
      name: '',
      description: '',
      image: {},
      image_url: '',
      ori_price: null,
      sale_price: null,
      stock: 0,
      body: '',
      type_id: 0,
      is_active: 0
    })
    editor.value?.resetEditor()

  } else {
    fetchProductInfo(Number(id))
  }
  fetchparents()
}, {
  immediate: true,
})

const getFile = (f: RawFile, _: any, imageUrl: string) => {
  form.image = f
  form.image_url = imageUrl
}

// 保存
const save = () => {
  if (!formRef.value) return
  formRef.value.validate((valid: boolean) => {
    if (!valid) return false
    // 編輯
    if (props.id) {
      form.item_id = Number(props.id)
      form.is_active = 0
      updateProductInfo(form).then((res: { message: any }) => {
        useMessage({
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
        useMessage({
          type: "success",
          message: res.message
        })
        router.push({
          path: '/product/list'
        })
      })
    }
  })

}
</script>

<style>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
  width: 60px;
}
</style>