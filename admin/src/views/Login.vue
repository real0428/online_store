<template>
  <div class="bg-primary-50 w-full h-full flex justify-center items-center">
    <div class="max-w-[360px] w-full">
      <div class="text-center mb-10 text-2xl text-primary-500 font-bold">後台管理系統</div>
      <div class="bg-white rounded-lg px-15 py-20">
        <div class="text-center mb-10 text-xl font-bold">登入</div>
        <el-form :model="form" ref="formRef">
          <el-row>
            <el-form-item prop="username" class="w-full" :rules="[
          {
            required: true,
            message: '*尚未輸入帳號',
            trigger: 'blur',
          },
        ]">
              <el-input class="border border-solid border-primary-100 rounded" type="text" v-model="form.username"
                show-word-limit size="large" placeholder="帳號" />
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item prop="password" class="relative w-full" :rules="[
          {
            required: true,
            message: '*尚未輸入密碼',
            trigger: 'blur',
          },
        ]">
              <el-input class="border border-solid border-primary-100 rounded" :type="pwdVisible ? 'text' : 'password'"
                v-model="form.password" show-word-limit size="large" placeholder="密碼" />
              <div class="absolute right-7 top-2 cursor-pointer" @click="pwdVisible = !pwdVisible">
                <font-awesome-icon class="text-primary-500" :icon="['far', `${pwdVisible ? 'eye' : 'eye-slash'}`]" />
              </div>
            </el-form-item>
          </el-row>
          <button class="mt-18 bg-primary-500 text-sm py-5 text-white text-center block w-full rounded"
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
import { useMessage } from '@/composables/message';
import { useAuthStore } from '@/stores/user'
import type { FormInstance, FormRules } from 'element-plus'

const pwdVisible = ref(false)
const formRef = ref<FormInstance>()
const form = reactive({
  username: '',
  password: ''
})

const router = useRouter()

function login(event: Event) {
  event.preventDefault()
  if (!formRef.value) return
  formRef.value.validate((valid: boolean) => {
    if (!valid) return
    getTokens(form).then((res) => {
      const { token, refresh_token } = res
      const { SET_TOKEN } = useAuthStore()
      SET_TOKEN(token, refresh_token)
      useMessage.success(res.message)
      router.push('/admin/user_info')
    }).catch((err) => {
      useMessage.warning(err.response.data.message)
    })
  })
}



</script>

<style lang="scss" scoped></style>