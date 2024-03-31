<template>
  <h1 class="mb-6">分類列表</h1>
  <el-table :data="categories" style="width: 100%">
    <el-table-column prop="type_id" label="ID" width="180" />
    <el-table-column prop="parent_name" label="上級分類" width="180" />
    <el-table-column prop="name" label="分類名稱" />
    <el-table-column>
      <template #default="scope">
        <el-button type="primary" @click="handleEdit(scope.row.type_id)">編緝</el-button>
        <el-button type="danger" @click="handleDelete(scope.row)">刪除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getProductCategories, deleteProductCategory } from '@/api/product/category'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from "element-plus"

const categories = ref()
const router = useRouter()

const handleEdit = (id: number) => {
  router.push({
    name: 'product_categories_edit',
    path: `/product/categories/edit`,
    params: {
      id
    }
  })
}

const handleDelete = async (news: any) => {
  ElMessageBox({
    title: `是否要刪除「${news.name}」?`,
    showCancelButton: true,
    customClass: 'custom-message-box',
    confirmButtonClass: 'el-button--danger',
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        await deleteProductCategory(news.type_id)
        done()
      } else {
        done()
      }
    },
  }).then((action) => {
    ElMessage({
      type: 'success',
      message: '刪除成功',
    })
    setTimeout(() => {
      fetchCategories()
    })
  }).catch((err) => { })
}

const fetchCategories = async () => {
  const res = await getProductCategories()
  console.log(res.data);

  categories.value = res.data
}

onMounted(async () => {
  fetchCategories()
})
</script>
