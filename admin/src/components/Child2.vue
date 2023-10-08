<template>
  <div>
    count: {{ infoStore.count }} <br />
    total: {{ infoStore.total }}
    <button @click="updateCount">count+1</button>
  </div>
</template>

<script setup lang="ts">
import { useInfoStore } from '@/stores/modules/info'
const infoStore = useInfoStore()
const updateCount = () => {
  /* infoStore.$patch({
    count: infoStore.count + 1
  }) */
  infoStore.updateData()
}
</script>

<style></style>
