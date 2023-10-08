<template>
  <div>
    <Child2 /> <br />
    todo: {{ todo.todos }} <br />
    total: {{ todo.total }}
    <button @click="updateTodo">更新todo</button>
  </div>
</template>

<script setup lang="ts">
import { useTodo } from '@/stores/modules/todo'
import Child2 from '@/components/Child2.vue'
import request from '@/utils/request'

const todo = useTodo()
const updateTodo = () => {
  todo.updateTodo()
}

request.get('https://cors-anywhere.herokuapp.com/http://127.0.0.1/api/getusers').then((res) => {
  console.log(res);
})

console.log('todo')
</script>

<style></style>
