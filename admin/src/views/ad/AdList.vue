<template>
  <h1 class="mb-6">廣告列表</h1>
  <el-table empty-text="查無資料" :data="ads" style="width: 100%">
    <el-table-column prop="type_id" label="ID" width="100" />
    <el-table-column prop="type_name" label="分類名稱" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="handleEdit(scope.row.type_id)">編緝</el-button>
        <el-button type="danger" @click="handleDelete(scope.row)">刪除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from 'vue-router'
import { getAdList, deleteAd } from "@/api/ad/ad"
import { useMessage } from '@/composables/message';
import { ElMessageBox } from "element-plus"

const router = useRouter()
const ads = ref()

const handleEdit = (id: number) => {
  console.log(id)
  router.push({
    name: 'ad_edit',
    path: `/ad/edit`,
    params: {
      id
    }
  })
}

const handleDelete = async (ad: any) => {
  ElMessageBox({
    title: `是否要刪除「${ad.type_name}」?`,
    showCancelButton: true,
    customClass: 'custom-message-box',
    confirmButtonClass: 'el-button--danger',
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        console.log(ad.type_id)
        await deleteAd(ad.type_id)
        done()
      } else {
        done()
      }
    },
  }).then((action) => {
    useMessage({
      type: 'success',
      message: '刪除成功',
    })
    setTimeout(() => {
      fetchAdList()
    })
  }).catch((err) => { })
}

const fetchAdList = async () => {
  const res = await getAdList()
  ads.value = res.data
}

onMounted(() => fetchAdList())


</script>
