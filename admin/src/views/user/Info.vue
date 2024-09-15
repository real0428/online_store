<template>
  <div>
    <Title>編輯個人資料</Title>
    <el-form :model="form" :rules="rules" ref="formRef" status-icon>
      <div class="flex mb-10 bg-white p-8 rounded items-center">
        <UploadImage class="w-[60px] h-[60px] rounded-full overflow-hidden" :image="form.user_pic"
          @get-file="getFile" />
        <div class="ml-5 w-35 text-gray-600 inline-flex items-center font-bold">我的頭像</div>
        <div class="ml-auto text-primary-500 cursor-pointer text-sm">變更相片</div>
      </div>
      <el-row>
        <div>我的帳號</div>
        <el-form-item prop="username">
          <el-input maxlength="20" show-word-limit size="large" v-model="form.username" placeholder="帳號" />
        </el-form-item>
      </el-row>
      <el-row>
        <div>商家名稱</div>
        <el-form-item prop="nickname">
          <el-input maxlength="20" show-word-limit size="large" v-model="form.nickname" placeholder="暱稱" />
        </el-form-item>
      </el-row>
      <el-row>
        <div>電子信箱</div>
        <el-form-item prop="email">
          <el-input size="large" v-model="form.email" placeholder="信箱" />
        </el-form-item>
      </el-row>
      <div class="flex justify-end">
        <SaveButton @click="save(formRef)">保存</SaveButton>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import { getUserInfo, updateUserInfo } from '@/api/user/user'
import { useUserInfoStore } from '@/stores/user'
import { useMessage } from '@/composables/message'
import type { FormInstance, FormRules } from 'element-plus'
const UploadImage = defineAsyncComponent(() => import('@/components/UploadImage.vue'))


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
    useMessage.error('檔案須為jpg格式!')
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
    userInfo.SET_USER_INFO(res.data)
    useMessage.success(res.message)
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

<style lang="scss" scoped></style>