<template>
  <Title>訂單列表</Title>
  <el-table :data="product" style="width: 100%">
    <el-table-column prop="order_id" label="ID" width="100" />
    <el-table-column width="200" prop="order_date" label="訂單日期" />
    <el-table-column width="200" prop="sale_price" label="訂單金額">
      <template #default="scope">
        <span>$ {{ scope.row.sale_price }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="customer_name" width="200" label="客戶名稱" />
    <el-table-column prop="is_active" width="200" label="訂單狀態">
      <template #default="scope">
        <!-- 當綁定的值不同於 :active-value和inactive-value 就會觸發@change事件 -->
        <el-switch @change="handleState(scope.row)" :active-value="1" :inactive-value="0" v-model="scope.row.is_active"
          inline-prompt active-text="上架" inactive-text="下架" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <FunctionalButton class="bg-primary-500 text-white mx-2" @click="handleEdit(scope.row.item_id)">查看
        </FunctionalButton>
      </template>
    </el-table-column>
  </el-table>
</template>