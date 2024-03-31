<template>
  <div class="bg-neutral-100 w-full h-full flex justify-center items-center">
    <div class="max-w-[400px] w-full bg-white p-8 rounded">
      <div class="text-center mb-6 text-2xl font-bold">使用者登入</div>
      <el-row class="flex mb-6">
        <el-input maxlength="40" type="text" v-model="form.username" class="!w-[400px] mx-auto" show-word-limit
          size="large" placeholder="帳號" />
      </el-row>
      <el-row class="flex mb-6">
        <el-input maxlength="40" type="text" v-model="form.password" class="!w-[400px] mx-auto" show-word-limit
          size="large" placeholder="密碼" />
      </el-row>
      <el-button type="primary" class="w-full p-2" @click="login">登入</el-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getAccessAuth } from '@/api/user/user';
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/user'


const form = reactive({
  username: '',
  password: ''
})

const router = useRouter()

const login = () => {
  getAccessAuth(form).then((res) => {
    const token = res.token
    const { setToken } = useAuthStore()
    setToken(token)

    ElMessage.success(res.message)
    router.push('/')
  }).catch((err) => {
    console.log(err);
  })
}
</script>

<style lang="scss" scoped></style>