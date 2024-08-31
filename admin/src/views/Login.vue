<template>
  <div class="bg-primary-50 w-full h-full flex justify-center items-center">
    <div class="max-w-[360px] w-full">
      <div class="text-center mb-6 text-2xl text-primary-500 font-bold">後台管理系統</div>
      <div class="bg-white rounded-lg px-10 py-12">
        <div class="text-center mb-6 text-xl font-bold">登入</div>
        <el-form :model="form" ref="formRef">
          <el-row class="flex mb-6">
            <el-form-item prop="username" class="w-full" :rules="[
          {
            required: true,
            message: '*尚未輸入帳號',
            trigger: 'blur',
          },
        ]">
              <el-input type="text" v-model="form.username" show-word-limit size="large" placeholder="帳號" />
            </el-form-item>
          </el-row>
          <el-row class="flex mb-10">
            <el-form-item prop="password" class="relative w-full" :rules="[
          {
            required: true,
            message: '*尚未輸入密碼',
            trigger: 'blur',
          },
        ]">
              <el-input :type="pwdVisible ? 'text' : 'password'" v-model="form.password" show-word-limit size="large"
                placeholder="密碼" />
              <div class="absolute right-4 top-1 cursor-pointer" @click="pwdVisible = !pwdVisible">
                <font-awesome-icon class="text-primary-500" :icon="['far', `${pwdVisible ? 'eye' : 'eye-slash'}`]" />
              </div>
            </el-form-item>
          </el-row>
          <button class="bg-primary-500 text-sm py-2 text-white text-center block w-full rounded"
            @click="login($event)">登入</button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getTokens } from '@/api/user/user';
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/user'
import type { FormInstance, FormRules } from 'element-plus'

const pwdVisible = ref(false)
const formEl = ref<FormInstance>()
const form = reactive({
  username: '',
  password: ''
})

const router = useRouter()

function login(event: Event) {
  event.preventDefault()
  getTokens(form).then((res) => {
    const { token, refresh_token } = res
    const { SET_TOKEN } = useAuthStore()
    SET_TOKEN(token, refresh_token)
    ElMessage.success(res.message)
    router.push('/admin/user_info')
  }).catch((err) => {
    ElMessage.warning(err.response.data.message)
  })
}



</script>

<style lang="scss" scoped></style>