<template>
  <div>
    <h1 class="mb-6">{{ id ? '編輯' : '建立' }}文章</h1>
    <div class="pl-10">
      <el-row class="flex mb-3">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">所屬分類</span>
        <el-select placeholder="請選擇" size="large" style="width: 178px" v-model="typeId">
          <el-option v-for="item in parentOptions" :key="item.type_id" :label="item.name" :value="item.type_id" />
        </el-select>
      </el-row>
      <el-row class="flex mb-3">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">文章首圖</span>
        <UploadImage :image="form.img_url" @get-file="getFile" />
      </el-row>
      <el-row class="flex mb-3">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">文章標題</span>
        <el-input maxlength="40" show-word-limit style="width: 500px" size="large" v-model="form.title"
          placeholder="輸入名稱" />
      </el-row>
      <el-row class="flex mb-3">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">文章簡述</span>
        <el-input maxlength="50" show-word-limit style="width: 500px" size="large" v-model="form.description"
          placeholder="輸入簡述" />
      </el-row>
      <el-row class="flex mb-3 items-start">
        <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">文章內容</span>
        <div class="max-w-[600px]">
          <PostEditor ref="editor" v-model:content="form.body" />
        </div>
      </el-row>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { getNewsCategories } from '@/api/news/category'
import { createNews, getNewsInfo, updateNews } from '@/api/news/news'
import { ElMessage } from "element-plus"
import { useRouter } from 'vue-router'
import UploadImage from '@/components/UploadImage.vue'
import PostEditor from '@/components/PostEditor.vue'

const props = defineProps<{ id: number }>()

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
const parentId = ref<string | number>('')
const router = useRouter()

let form = reactive({
  item_id: 0,
  title: '',
  description: '',
  update_time: '',
  image: {},
  img_url: '',
  body: '',
  type_id: typeId,
  is_active: 0
})

const parentOptions = ref<Array<Category>>([])
const currentOption = ref<Category | null>()

// 取得上級分類
const fetchParentOptions = async () => {
  const res = await getNewsCategories()
  parentOptions.value = res.data
  currentOption.value = parentOptions.value.find((item) => item.type_id === Number(form.type_id))
  input.value = currentOption.value?.name
  typeId.value = currentOption.value?.type_id
}

const fetchNewsInfo = async (id: number) => {
  const res = await getNewsInfo(id)
  console.log(res.data);

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
      title: '',
      description: '',
      image: {},
      img_url: '',
      body: '',
      type_id: typeId.value,
      is_active: 0,
      item_id: 0
    })

    editor.value?.setHTML('')
  } else {
    fetchNewsInfo(Number(id))
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
    form.item_id = props.id
    form.is_active = 0
    updateNews(form).then(res => {
      ElMessage({
        type: "success",
        message: res.message
      })
      router.push({
        path: '/news/list'
      })
    })
    // 新建
  } else {
    createNews(form).then(res => {
      ElMessage({
        type: "success",
        message: res.message
      })
      router.push({
        path: '/news/list'
      })
    })
  }
}
</script>

<style lang="scss">
.ql-picker-item[data-value='10px']::before,
.ql-picker-label[data-value='10px']::before {
  content: '10px' !important;
}

.ql-picker-item[data-value='12px']::before,
.ql-picker-label[data-value='12px']::before {
  content: '12px' !important;
}

.ql-picker-item[data-value='14px']::before,
.ql-picker-label[data-value='14px']::before {
  content: '14px' !important;
}

.ql-picker-item[data-value='16px']::before,
.ql-picker-label[data-value='16px']::before {
  content: '16px' !important;
}

.ql-picker-item[data-value='18px']::before,
.ql-picker-label[data-value='18px']::before {
  content: '18px' !important;
}

.ql-picker-item[data-value='20px']::before,
.ql-picker-label[data-value='20px']::before {
  content: '20px' !important;
}

.ql-picker-item[data-value='24px']::before,
.ql-picker-label[data-value='24px']::before {
  content: '24px' !important;
}

.ql-picker-item[data-value='30px']::before,
.ql-picker-label[data-value='30px']::before {
  content: '30px' !important;
}

.ql-picker-item[data-value='32px']::before,
.ql-picker-label[data-value='32px']::before {
  content: '32px' !important;
}

.ql-picker-item[data-value='36px']::before,
.ql-picker-label[data-value='36px']::before {
  content: '36px' !important;
}
</style>