<template>
  <div>
    <h1 class="mb-6">編輯我的資料</h1>
    <div class="pl-10">
      <el-form :model="form" :rules="rules" ref="formRef" status-icon>
        <el-row class="flex mb-3">
          <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">我的頭像</span>
          <UploadImage :image="form.user_pic" @get-file="getFile" />
        </el-row>
        <el-row class="flex mb-3">
          <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">我的帳號</span>
          <el-form-item prop="username">
            <el-input maxlength="20" show-word-limit style="width: 200px" size="large" v-model="form.username"
              placeholder="帳號" />
          </el-form-item>
        </el-row>
        <el-row class="flex mb-3">
          <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">我的暱稱</span>
          <el-form-item prop="nickname">
            <el-input maxlength="20" show-word-limit style="width: 200px" size="large" v-model="form.nickname"
              placeholder="暱稱" />
          </el-form-item>
        </el-row>
        <el-row class="flex mb-3">
          <span class="mr-3 w-35 text-gray-600 inline-flex items-center font-bold">電子信箱</span>
          <el-form-item prop="email">
            <el-input style="width: 400px" size="large" v-model="form.email" placeholder="信箱" />
          </el-form-item>
        </el-row>
        <el-button type="primary" @click="save(formRef)">保存</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import UploadImage from '@/components/UploadImage.vue'
import { getUserInfo, updateUserInfo } from '@/api/user/user'
import { useUserInfoStore } from '@/stores/user'
import { ElMessage } from "element-plus"
import type { FormInstance, FormRules } from 'element-plus'

interface RawFile {
  uid: String,
  name: String,
  size: Number,
  type: String,
  [propName: string]: any
}

interface FormData {
  username: string
  nickname: string
  email: string
  image?: object
  user_pic: string
}

const formRef = ref<FormInstance>()

const form = reactive<FormData>({
  username: '',
  nickname: '',
  email: '',
  image: {},
  user_pic: ''
})

const rules = reactive<FormRules<FormData>>({
  username: [
    { required: true, message: '帳號不得為空', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '信箱不得為空', trigger: 'blur' },
    { type: 'email', message: '信箱格式錯誤', trigger: 'change' }
  ]
})

const getFile = (f: RawFile) => {
  if (f.type != 'image/jpeg') {
    ElMessage.error('檔案須為jpg格式!')
    return
  }
  form.image = f
}

const save = (formEl: any) => {
  if (!formEl) return
  formEl.validate(async (valid: boolean) => {
    if (!valid) return false
    const userInfo = useUserInfoStore()
    const res = await updateUserInfo(form)
    ElMessage.success(res.message)
    userInfo.setUserInfo(res.data)
  })
}

const fetchUserInfo = async () => {
  const res: any = await getUserInfo()
  const data = res.user
  Object.keys(form).forEach(key => {
    form[key] = data?.[key] || ''
  })
}

onMounted(async () => {
  fetchUserInfo()
})

</script>

<style lang="" scoped>

</style>