import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { refreshToken } from '@/api/user/user';


export const useAuthStore = defineStore('user', () => {

  const token = ref<string>('')
  const refresh_token = ref<string>('')
  const isLogin = ref<boolean>(false)
  const router = useRouter()

  const SET_TOKEN = (t: string, rt: string) => {
    token.value = t
    refresh_token.value = rt
    isLogin.value = true
  }

  const REFRESH_TOKEN = async () => {
    try {
      const res = await refreshToken(refresh_token.value)
      console.log(res)
      token.value = res.token
      refresh_token.value = res.refresh_token
      return res
    } catch (error) {
      return error
    }

  }

  const CLEAR_TOKEN = () => {
    token.value = ''
    refresh_token.value = ''
    isLogin.value = false
    localStorage.removeItem('user')
    router.go(0)
  }

  return {
    token,
    refresh_token,
    isLogin,
    SET_TOKEN,
    REFRESH_TOKEN,
    CLEAR_TOKEN
  }
}, {
  persist: true
})

export const useUserInfoStore = defineStore('userInfo', () => {
  let user = reactive({
    username: '',
    nickname: '',
    user_pic: ''
  })

  const SET_USER_INFO = (info: any) => {
    user.username = info.username
    user.nickname = info.nickname
    user.user_pic = info.user_pic
  }

  return {
    user,
    SET_USER_INFO
  }
}, {
  persist: true
})

// export const useAuthStore = defineStore('user', {
//   state: () => {
//     return {
//       token: 'hello pinia',
//     }
//   },
//   actions: {
//     SET_TOKEN(t: string) {
//       this.token = t
//     }
//   },
//   persist: true
// })