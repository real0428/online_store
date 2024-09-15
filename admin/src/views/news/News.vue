<template>
  <div>
    <Title>{{ id ? '編輯' : '新增' }}文章</Title>
    <el-form :model="form" ref="formRef" :rules="rules">
      <el-row>
        <div>所屬分類</div>
        <el-form-item prop="type_id">
          <el-select placeholder="請選擇" size="large" v-model="type_id">
            <el-option v-for="item in parents" :key="item.type_id" :label="item.name" :value="item.type_id" />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <div>文章首圖</div>
        <el-form-item prop="image_url">
          <UploadImage class="w-[200px] h-[200px] bg-white" :image="form.img_url" @get-file="getFile" />
        </el-form-item>
      </el-row>
      <el-row>
        <div>文章標題</div>
        <el-form-item prop="title">
          <el-input maxlength="40" show-word-limit size="large" v-model="form.title" placeholder="輸入名稱" />
        </el-form-item>
      </el-row>
      <el-row>
        <div>文章簡述</div>
        <el-form-item prop="description">
          <el-input maxlength="50" show-word-limit size="large" v-model="form.description" placeholder="輸入簡述" />
        </el-form-item>
      </el-row>
      <el-row>
        <div>文章內容</div>
        <div class="rounded overflow-hidden">
          <PostEditor ref="editor" v-model:content="form.body" />
        </div>
      </el-row>
      <div class="flex justify-end">
        <SaveButton @click="save(formRef)">保存</SaveButton>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, withDefaults, toRefs } from 'vue'
import { getNewsCategories } from '@/api/news/category'
import { createNews, getNewsInfo, updateNews } from '@/api/news/news'
import { useMessage } from '@/composables/message'
import { useRouter } from 'vue-router'
import UploadImage from '@/components/UploadImage.vue'
import PostEditor from '@/components/PostEditor.vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { Category } from '@/types/category'

const props = withDefaults(defineProps<{ id?: string }>(), {
  id: ''
})

interface FormData {
  parents: Category[]
  item_id: number | number
  title: string
  description: string
  update_time: string
  image?: object
  img_url: string
  body: string
  type_id: string | number | undefined
  is_active: number
  [key: string]: any
}

const router = useRouter()

const formRef = ref<FormInstance>()

let form = reactive<FormData>({
  parents: [],
  item_id: 0,
  title: '',
  description: '',
  update_time: '',
  image: {},
  img_url: '',
  body: '',
  type_id: 0,
  is_active: 0
})

const rules = reactive<FormRules>({
  type_id: [
    { required: true, message: '分類為必填', trigger: 'blur' }
  ],
  image_url: [
    { required: true, message: '未上傳圖片', trigger: 'blur' }
  ],
  title: [
    { required: true, message: '文章標題為必填', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '文章簡述為必填', trigger: 'blur' }
  ],
})

const { type_id, parents } = toRefs(form)

// 取得上級分類
const fetchParentOptions = async () => {
  const res = await getNewsCategories()
  parents.value = res.data
  const currentOption = parents.value.find((item) => item.type_id === Number(form.type_id))
  type_id.value = currentOption?.type_id
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
    type_id.value = ''
    Object.assign(form, {
      parents: [],
      title: '',
      description: '',
      image: {},
      img_url: '',
      body: '',
      type_id: 0,
      is_active: 0,
      item_id: 0
    })

    editor.value?.resetEditor()

  } else {
    fetchNewsInfo(Number(id))
  }
  fetchParentOptions()
}, {
  immediate: true,
})

const getFile = (f: RawFile, _: any, imageUrl: string) => {
  form.image = f
  form.image_url = imageUrl
}

// 保存
const save = (formEl: any) => {
  if (!formEl) return
  formEl.validate((valid: boolean) => {
    if (!valid) return false
    // 編輯
    if (props.id) {
      form.item_id = Number(props.id)
      form.is_active = 0
      updateNews(form).then(res => {
        useMessage({
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
        useMessage({
          type: "success",
          message: res.message
        })
        router.push({
          path: '/news/list'
        })
      })
    }
  })
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