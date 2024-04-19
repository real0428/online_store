<template>
  <el-container class="layout-container-demo bg-gray-50 h-full">
    <el-aside width="260px" class="bg-white px-3 py-10">
      <el-scrollbar>
        <div class="text-xl font-bold text-center mb-4">
          <font-awesome-icon class="mr-1 text-gray-900" :icon="['fas', 'gear']" />後台管理系統
        </div>
        <el-menu :default-openeds="[menuIndex]" class="!border-r-0" @open="handleMenuIndex" :unique-opened="true">
          <el-menu-item index="1">
            <template #title>
              <router-link class="w-full flex items-center" to="/user_info">
                <font-awesome-icon class="mr-1" :icon="['fas', 'pen-to-square']" />個人資料管理
              </router-link>
            </template>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <font-awesome-icon class="mr-1" :icon="['fas', 'bag-shopping']" />廣告管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" :class="{ 'active': route.name === 'ad_categories' }">
                <router-link class="w-full flex items-center" to="/ad/create">
                  建立廣告
                </router-link>
              </el-menu-item>
              <el-menu-item index="2-2" :class="{ 'active': route.name === 'ad_list' }">
                <router-link class="w-full flex items-center" to="/ad/list">
                  廣告列表
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <font-awesome-icon class="mr-1" :icon="['fas', 'bag-shopping']" /> 商品管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" :class="{ 'active': route.name === 'product_categories' }">
                <router-link class="w-full flex items-center" to="/product/categories">
                  建立分類
                </router-link>
              </el-menu-item>
              <el-menu-item index="3-2" :class="{ 'active': route.name === 'product_categories_list' }">
                <router-link class="w-full flex items-center" to="/product/categories_list">
                  分類列表
                </router-link>
              </el-menu-item>
              <el-menu-item index="3-3" :class="{ 'active': route.name === 'product_list' }">
                <router-link class="w-full flex items-center" to="/product/list">
                  產品列表
                </router-link>
              </el-menu-item>
              <el-menu-item index="3-4" :class="{ 'active': route.name === 'product' }">
                <router-link class="w-full flex items-center" to="/product/product">
                  建立產品
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <font-awesome-icon class="mr-1" :icon="['far', 'file-lines']" />新聞管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" :class="{ 'active': route.name === 'news_categories' }">
                <router-link class="w-full flex items-center" to="/news/categories">
                  建立分類
                </router-link>
              </el-menu-item>
              <el-menu-item index="4-2" :class="{ 'active': route.name === 'news_categories_list' }">
                <router-link class="w-full flex items-center" to="/news/categories_list">
                  分類列表
                </router-link>
              </el-menu-item>
              <el-menu-item index="4-3" :class="{ 'active': route.name === 'news_list' }">
                <router-link class="w-full flex items-center" to="/news/list">
                  文章列表
                </router-link>
              </el-menu-item>
              <el-menu-item index="4-4" :class="{ 'active': route.name === 'news' }">
                <router-link class="w-full flex items-center" to="/news/news">
                  建立文章
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="5">

            <template #title>
              <font-awesome-icon class="mr-1" :icon="['fas', 'cart-shopping']" />訂單管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1" :class="{ 'active': route.name === 'order_list' }">
                <router-link class="w-full flex items-center" to="/order/list">
                  訂單列表
                </router-link>
              </el-menu-item>
              <el-menu-item index="5-1" :class="{ 'active': route.name === 'order' }">
                <router-link class="w-full flex items-center" to="/order/order">
                  訂單詳情
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="6">

            <template #title>
              <font-awesome-icon class="mr-1" :icon="['far', 'user']" />會員管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1" :class="{ 'active': route.name === 'member_list' }">
                <router-link class="w-full flex items-center" to="/member/list">
                  會員列表
                </router-link>
              </el-menu-item>
              <el-menu-item index="6-2" :class="{ 'active': route.name === 'member_info' }">
                <router-link class="w-full flex items-center" to="/member/info">
                  會員詳情
                </router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container class="p-10 drop-shadow-[0_25px_25px_rgba(0,0,0,0.01)]">
      <el-header class="!p-3 flex items-center justify-between mb-5">
        <div class="text-3xl font-bold text-gray-700">{{ title }}</div>
        <div class="toolbar">
          <div class="user-dropdown-button flex items-center cursor-pointer relative"
            @click="userDropdownState = !userDropdownState">
            <el-avatar :size="40" class="mr-2" :src="user.user_pic" />
            <div class=" hover:opacity-60 duration-300 ease-in-out">
              <span class="text-gray-800">{{ user.nickname || user.username }}</span>
              <font-awesome-icon class="text-gray-600 ml-1 text-sm" :icon="['fas', 'angle-down']" />
            </div>
            <transition name="user">
              <div v-show="userDropdownState"
                class="shadow-sm inline-block px-5 py-1 rounded bg-white text-gray-800 absolute right-0 top-14"
                @click="logout">登出
              </div>
            </transition>
          </div>
        </div>
      </el-header>
      <el-main class="bg-white rounded !p-0">
        <el-scrollbar class="p-6">
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

const title = ref<string>('')
const menuIndex = ref<string>('')

const handleMenuIndex = (index: string): void => {
  menuIndex.value = index
}

const updateTitle = (): string => {
  switch (menuIndex.value) {
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
}

const route = useRoute()
watch(() => route.name, (name) => {
  if (name === 'hero_banner_edit') menuIndex.value = '1'
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
  const { clearToken } = useAuthStore()
  clearToken()
}

</script>

<style scoped lang="scss">
.el-menu-item:hover {
  @apply bg-green-50
}

.el-sub-menu :deep(.el-sub-menu__title):hover {
  @apply bg-green-50
}

.el-menu :deep(.el-menu-item-group__title) {
  display: none;
}

.el-menu-item.is-active {
  color: unset
}

.el-menu-item.active {
  @apply text-green-700 bg-green-50;
}

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