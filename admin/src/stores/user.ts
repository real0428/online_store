import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'


export const useAuthStore = defineStore('user', () => {

  const token = ref('hello')
  const isLogin = ref(false)
  const router = useRouter()

  const setToken = (t: string) => {
    token.value = t
    isLogin.value = true
  }

  const getToken = () => token.value

  const clearToken = () => {
    token.value = ''
    isLogin.value = false
    localStorage.removeItem('user')
    router.go(0)
  }

  return {
    token,
    isLogin,
    setToken,
    getToken,
    clearToken
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

  const setUserInfo = (info: any) => {
    user.username = info.username
    user.nickname = info.nickname
    user.user_pic = info.user_pic
  }

  return {
    user,
    setUserInfo
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
//     setToken(t: string) {
//       this.token = t
//     }
//   },
//   persist: true
// })