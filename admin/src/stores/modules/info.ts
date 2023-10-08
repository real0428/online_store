// Pinia 的 option api 寫法

import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', {
  state: () => {
    return {
      count: 99,
      arr: [1, 3, 5, 7, 9]
    }
  },
  actions: {
    updateData() {
      this.count++
    }
  },
  getters: {
    total(): number {
      return this.arr.reduce((prev: number, next: number) => {
        return prev + next
      }, 0)
    }
  }
})
