<template>
  <h1 class="mb-6">產品列表</h1>
  <el-table :data="product" style="width: 100%">
    <el-table-column prop="item_id" label="ID" width="100" />
    <el-table-column prop="image_url" label="縮圖" width="180">
      <template #default="scope">
        <el-image class="!flex" style="width: 100px;height:50px" :src="scope.row.image_url" fit="cover" />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="名稱" />
    <el-table-column width="100" prop="sale_price" label="售價">
      <template #default="scope">
        <span>$ {{ scope.row.sale_price }}</span>
      </template>
    </el-table-column>
    <el-table-column width="100" prop="stock" label="庫存" />
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button type="primary" @click="handleEdit(scope.row.item_id)">編緝</el-button>
        <el-button type="danger" @click="handleDelete(scope.row)">刪除</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="is_active" label="上架狀態">
      <template #default="scope">
        <!-- 當綁定的值不同於 :active-value和inactive-value 就會觸發@change事件 -->
        <el-switch @change="handleState(scope.row)" :active-value="1" :inactive-value="0" v-model="scope.row.is_active"
          inline-prompt active-text="上架" inactive-text="下架" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, ref, h } from 'vue';
import { useRouter } from 'vue-router'
import { getProductList, deleteProduct, updateProductInfo } from "@/api/product/product"
import { ElMessage, ElMessageBox } from "element-plus"

const router = useRouter()
const categories = ref()
const product = ref()

const handleEdit = (id: number) => {
  router.push({
    name: 'product_edit',
    path: `/product/edit`,
    params: {
      id
    }
  })
}

const handleDelete = (product: any) => {
  ElMessageBox({
    title: `是否要刪除「${product.name}」?`,
    showCancelButton: true,
    customClass: 'custom-message-box',
    confirmButtonClass: 'el-button--danger',
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        deleteProduct(product.item_id)
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
      fetchProductList()
    })
  }).catch((err) => { })
}

// 上架狀態處理
const handleState = (product: any) => {
  updateProductInfo(product);
}

const fetchProductList = async () => {
  const res = await getProductList()
  product.value = res.data
  console.log(product.value);

}

onMounted(() => {
  fetchProductList()
})
</script>

<style lang="scss"></style>