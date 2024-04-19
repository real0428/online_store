<template>
  <h1 class="mb-6">新聞列表</h1>
  <el-table empty-text="查無資料" :data="news" style="width: 100%">
    <el-table-column prop="item_id" label="ID" width="100" />
    <el-table-column prop="img_url" label="縮圖" width="180">
      <template #default="scope">
        <el-image class="!flex" style="width: 100px;height:50px" :src="scope.row.img_url" fit="cover" />
      </template>
    </el-table-column>
    <el-table-column prop="title" label="標題" />
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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
import { getNewsList, deleteNews, updateNews } from "@/api/news/news"
import { ElMessage, ElMessageBox } from "element-plus"

const router = useRouter()

// interface News {
//   item_id: Number,
//   img_url: String,

// }

const news = ref()

const handleEdit = (id: number) => {
  router.push({
    name: 'news_edit',
    path: `/news/edit`,
    params: {
      id
    }
  })
}

const fetchNewsList = async () => {
  const res = await getNewsList()
  news.value = res.data
}

const handleState = (news: any) => {
  updateNews(news);
}

const handleDelete = async (news: any) => {
  ElMessageBox({
    title: `是否要刪除「${news.title}」?`,
    showCancelButton: true,
    customClass: 'custom-message-box',
    confirmButtonClass: 'el-button--danger',
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        await deleteNews(news.item_id)
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
      fetchNewsList()
    })
  }).catch((err) => { })
}

onMounted(async () => {
  fetchNewsList()
})

</script>
