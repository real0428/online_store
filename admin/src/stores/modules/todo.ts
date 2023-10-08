// Pinia 的 composition api 寫法

import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export const useTodo = defineStore('todo', () => {
  const todos = reactive([
    { id: 1, title: '吃飯' },
    { id: 2, title: '睡覺' },
    { id: 3, title: '打豆豆' }
  ])

  const arr = ref([1, 2, 3, 4, 5])

  const total = computed((): number => {
    return arr.value.reduce((prev: number, next: number) => {
      return prev + next
    }, 0)
  })

  const updateTodo = () => {
    todos.push({
      id: 4,
      title: '組合式api'
    })
  }

  return {
    todos,
    updateTodo,
    total
  }
})
