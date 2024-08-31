<template>
  <svg>
    <use xlink:href="#icon-home" fill="hotpink"></use>
  </svg>
  <div class="name">123</div>
  <div class="bg-red-600">
    父組件 {{ num }} <br />
    pageNo {{ pageNo }} <br />
    son名稱 {{ son }}
    <Child ref="son" v-model="num" v-model:pageNo="pageNo" type="number" alt="小孩組件"></Child>
    <button @click="handler">拿到兒子的名字</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Child from '@/components/Child1.vue'
import { getUsers } from '@/api/user/user'
let num = ref(1000)
let pageNo = ref(1)
let son = ref()

const handler = () => {
  console.log(son.value.name)
}

const users = await getUsers();
console.log(users);



// 暴露給子組件
defineExpose({
  num
})
</script>

<style scoped lang="scss">
.name {
  color: red;
  @apply text-lg;
}
</style>
