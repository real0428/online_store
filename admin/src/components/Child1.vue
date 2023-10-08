<template>
  <div class="child">
    子組件1 {{ modelValue }} <br />
    pageNo {{ pageNo }} <br />
    <button @click="updateValue">value加1</button>
    <button @click="$emit('update:pageNo', pageNo + 2)">pageNo加2</button>
    <button :="$attrs">attr按鈕</button>
    <button @click="handler($parent)">拿到父組件的num</button>
  </div>
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue'
let props = defineProps(['modelValue', 'pageNo', 'pageSize'])
let $emits = defineEmits(['update:modelValue', 'update:pageNo', 'update:pageSize'])
const updateValue = () => {
  $emits('update:modelValue', props.modelValue + 1)
}
let name = ref('兒子')

// 暴露給父組件
defineExpose({
  name
})

let $attrs = useAttrs()

const handler = ($parent: any) => {
  console.log($parent.num)
}
</script>

<style class="child" scoped>
.child {
  width: 300px;
  height: 300px;
  background-color: pink;
}
</style>
