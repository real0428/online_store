<template>
  <el-container class="layout-container-demo bg-primary-50 h-full">
    <el-aside width="240px" class="bg-white py-10">
      <el-scrollbar>
        <div class="text-xl font-bold text-center mb-4">
          <!-- <font-awesome-icon class="mr-1 text-gray-900" :icon="['fas', 'gear']" />後台管理系統 -->
        </div>
        <Menu :menuIndex="menuIndex" @get-menu-index="updateTitle()" />
      </el-scrollbar>
    </el-aside>

    <el-container class="px-[60px] pb-10 drop-shadow-[0_25px_25px_rgba(0,0,0,0.01)]">
      <el-header class="!px-0 flex items-center my-3">
        <!-- <div class="text-3xl font-bold text-gray-700">{{ title }}</div> -->
        <div class="toolbar ml-auto">
          <div class="user-dropdown-button flex items-center cursor-pointer relative"
            @click="userDropdownState = !userDropdownState">
            <el-avatar :size="40" class="mr-2" :src="user.user_pic" />
            <div class=" hover:opacity-60 duration-300 ease-in-out">
              <span class="text-gray-800">{{ user.nickname || user.username }}</span>
              <font-awesome-icon class="text-gray-600 ml-1 text-sm" :icon="['fas', 'angle-down']" />
            </div>
            <transition name="user">
              <div v-show="userDropdownState"
                class="w-[120px] text-center shadow-sm inline-block px-5 py-1 rounded bg-white text-gray-800 absolute right-0 top-14"
                @click="logout">登出
              </div>
            </transition>
          </div>
        </div>
      </el-header>
      <el-main class="rounded!p-6">
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, watch, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserInfoStore, useAuthStore } from '@/stores/user'
import Menu from '@/components/Menu.vue'

const title = ref<string>('')
const menuIndex = ref<string>('')
const updateTitle = (index): string => {
  switch (index) {
    case '1':
      return '廣告管理'
    case '2':
      return '個人資料管理'
    case '3':
      return '商品管理'
    case '4':
      return '新聞管理'
    case '5':
      return '訂單管理'
    case '6':
      return '會員管理'
    default:
      return '歡迎回來! 立斌。'
  }
  menuIndex.value = index
}

const route = useRoute()
watch(() => route.name, (name) => {
  if (name?.toString().includes('ad')) menuIndex.value = '1'
  else if (name === 'user_info') menuIndex.value = '2'
  else if (name?.toString().includes('product')) menuIndex.value = '3'
  else if (name?.toString().includes('news')) menuIndex.value = '4'
  else if (name?.toString().includes('order')) menuIndex.value = '5'
  else if (name?.toString().includes('member')) menuIndex.value = '6'
  else menuIndex.value = ''
  title.value = updateTitle()
}, {
  immediate: true,
})

const userInfo = useUserInfoStore()
const { user } = storeToRefs(userInfo)

const userDropdownState = ref(false)
const closeDropdown = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.user-dropdown-button')) {
    userDropdownState.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})

const logout = () => {
  const { CLEAR_TOKEN } = useAuthStore()
  CLEAR_TOKEN()
}

</script>
<style scoped lang="scss">
.user-enter-active,
.user-leave-active {
  transition: all 0.3s ease;
}

.user-enter-from,
.user-leave-to {
  opacity: 0;
  transform: translateY(-20px)
}
</style>