<template>
  <el-menu class="aside !border-r-0" :default-openeds="['1', '2', '3', '4', '5', '6']" @open="handleMenuIndex"
    :unique-opened="false">
    <el-menu-item index="1">
      <template #title>
        <router-link class="w-full flex items-center" to="/admin/user_info">
          個人資料管理
        </router-link>
      </template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        廣告管理
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" :class="{ 'active': route.name === 'ad_categories' }">
          <router-link class="w-full flex items-center" to="/admin/ad/create">
            建立廣告
          </router-link>
        </el-menu-item>
        <el-menu-item index="2-2" :class="{ 'active': route.name === 'ad_list' }">
          <router-link class="w-full flex items-center" to="/admin/ad/list">
            廣告列表
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        商品管理
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1" :class="{ 'active': route.name === 'product_categories' }">
          <router-link class="w-full flex items-center" to="/admin/product/categories">
            建立分類
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-2" :class="{ 'active': route.name === 'product_categories_list' }">
          <router-link class="w-full flex items-center" to="/admin/product/categories_list">
            分類列表
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-3" :class="{ 'active': route.name === 'product_list' }">
          <router-link class="w-full flex items-center" to="/admin/product/list">
            產品列表
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-4" :class="{ 'active': route.name === 'product' }">
          <router-link class="w-full flex items-center" to="/admin/product/product">
            建立產品
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        新聞管理
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1" :class="{ 'active': route.name === 'news_categories' }">
          <router-link class="w-full flex items-center" to="/admin/news/categories">
            建立分類
          </router-link>
        </el-menu-item>
        <el-menu-item index="4-2" :class="{ 'active': route.name === 'news_categories_list' }">
          <router-link class="w-full flex items-center" to="/admin/news/categories_list">
            分類列表
          </router-link>
        </el-menu-item>
        <el-menu-item index="4-3" :class="{ 'active': route.name === 'news_list' }">
          <router-link class="w-full flex items-center" to="/admin/news/list">
            文章列表
          </router-link>
        </el-menu-item>
        <el-menu-item index="4-4" :class="{ 'active': route.name === 'news' }">
          <router-link class="w-full flex items-center" to="/admin/news/news">
            建立文章
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="5">

      <template #title>
        訂單管理
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1" :class="{ 'active': route.name === 'order_list' }">
          <router-link class="w-full flex items-center" to="/admin/order/list">
            訂單列表
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="6">

      <template #title>
        會員管理
      </template>
      <el-menu-item-group>
        <el-menu-item index="6-1" :class="{ 'active': route.name === 'member_list' }">
          <router-link class="w-full flex items-center" to="/admin/member/list">
            會員列表
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const emit = defineEmits(['get-menu-index'])
const handleMenuIndex = (index: string): void => {
  emit('get-menu-index', index)
}
const route = useRoute()
</script>

<style lang="scss" scoped>
:deep(.el-menu) {
  .el-menu-item-group__title {
    display: none;
  }
}

:deep(.el-sub-menu) {
  .el-sub-menu__title:hover {
    background-color: transparent !important;
  }

  .el-menu--inline {
    position: relative;
  }

  .el-menu--inline::before {
    content: '';
    width: 1px;
    height: calc(100% - 20px);
    background: theme('colors.base.300');
    position: absolute;
    left: 25px;
  }
}

.el-menu-item:hover {
  background-color: transparent;
}

.el-sub-menu__title:hover {
  background-color: transparent;
}

.el-menu-item {
  @apply mb-2 leading-normal
}

.el-menu-item a {
  @apply p-3 rounded-lg relative
}

.el-menu-item a::before {
  content: '';
  width:8px;
  height:1px;
  background:theme('colors.base.300');
  position:absolute;
  left:-14px;
  transform:rotate(30deg)
}

.el-menu-item a.router-link-active {
  @apply text-primary-500 bg-primary-50 font-bold
}

.el-menu-item.is-active {
  color: unset;
  background: unset
}
</style>