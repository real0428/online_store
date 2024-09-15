<template>
  <el-menu :router="true" class="aside !border-r-0" :default-openeds="['1', '2', '3', '4', '5', '6']"
    @open="handleMenuIndex" :default-active="route.path">
    <el-sub-menu index="1">
      <template #title>
        <div>個人資料管理</div>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/user_info" :class="{ 'active': route.name === 'user_info' }">
          <router-link class="w-full flex items-center" to="/admin/user_info">
            編輯個人資料
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <!-- <el-sub-menu index="2">
      <template #title>
        廣告管理
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/ad/create" :class="{ 'active': route.name === 'ad_categories' }">
          <router-link class="w-full flex items-center" to="/admin/ad/create">
            建立廣告
          </router-link>
        </el-menu-item>
        <el-menu-item index="/admin/ad/list" :class="{ 'active': route.name === 'ad_list' }">
          <router-link class="w-full flex items-center" to="/admin/ad/list">
            廣告列表
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu> -->
    <el-sub-menu index="3">
      <template #title>
        商品管理
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/product/categories" :class="{ 'active': route.name === 'product_categories' }">
          <router-link class="w-full flex items-center" to="/admin/product/categories">
            新增分類
          </router-link>
        </el-menu-item>
        <el-menu-item index="/admin/product/categories_list"
          :class="{ 'active': route.name === 'product_categories_list' }">
          <router-link class="w-full flex items-center" to="/admin/product/categories_list">
            商品分類
          </router-link>
        </el-menu-item>
        <el-menu-item index="/admin/product/list" :class="{ 'active': route.name === 'product_list' }">
          <router-link class="w-full flex items-center" to="/admin/product/list">
            產品總覽
          </router-link>
        </el-menu-item>
        <el-menu-item index="/admin/product/product" :class="{ 'active': route.name === 'product' }">
          <router-link class="w-full flex items-center" to="/admin/product/product">
            新增產品
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        新聞管理
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/news/categories" :class="{ 'active': route.name === 'news_categories' }">
          <router-link class="w-full flex items-center" to="/admin/news/categories">
            新增分類
          </router-link>
        </el-menu-item>
        <el-menu-item index="/admin/news/categories_list" :class="{ 'active': route.name === 'news_categories_list' }">
          <router-link class="w-full flex items-center" to="/admin/news/categories_list">
            新聞分類
          </router-link>
        </el-menu-item>
        <el-menu-item index="/admin/news/list" :class="{ 'active': route.name === 'news_list' }">
          <router-link class="w-full flex items-center" to="/admin/news/list">
            新聞總覽
          </router-link>
        </el-menu-item>
        <el-menu-item index="/admin/news/news" :class="{ 'active': route.name === 'news' }">
          <router-link class="w-full flex items-center" to="/admin/news/news">
            新增新聞
          </router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="5">

      <template #title>
        訂單管理
      </template>
      <el-menu-item-group>
        <el-menu-item index="/admin/order/list" :class="{ 'active': route.name === 'order_list' }">
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
        <el-menu-item index="/admin/member/list" :class="{ 'active': route.name === 'member_list' }">
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
const route = useRoute()
const emit = defineEmits(['get-menu-index'])
const handleMenuIndex = (index: string): void => {
  emit('get-menu-index', index)
}

</script>

<style lang="scss" scoped>
:deep(.el-menu) {
  .el-menu-item-group__title {
    display: none;
  }
}

:deep(.el-sub-menu) {
  margin-bottom: 20px;
  .el-sub-menu__title {
    height: 45px;
    margin: 0 20px 10px;
    border-radius: 5px;
  }

  &.is-active {
    .el-sub-menu__title {
      background: theme('colors.primary.500');
      color: white;
    }
  }

  &:not(.is-active) {
    .el-sub-menu__title:hover {
      background: transparent
    }
  }
  

  .el-menu--inline {
    position: relative;
  }

  .el-menu--inline::before {
    content: '';
    width: 1px;
    height: calc(100% - 6px);
    background: theme('colors.base.300');
    position: absolute;
    left: 40px;
  }
}



.el-menu-item:hover {
  background-color: transparent;
}

.el-menu-item {
  @apply leading-normal;
  padding-left: 55px !important;
}

.el-menu-item a {
  @apply p-5 rounded-lg relative top-[5px]
}

.el-menu-item a::before {
  content: '';
  width: 8px;
  height: 1px;
  background: theme('colors.base.300');
  position: absolute;
  left: -14px;
  transform: rotate(30deg)
}

.el-menu-item a.router-link-active {
  @apply text-primary-500 bg-primary-50 font-bold
}

.el-menu-item.is-active {
  color: unset;
  background: unset
}
</style>