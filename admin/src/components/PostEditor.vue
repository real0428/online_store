<template>
  <QuillEditor :modules="[uploadModule]" placeholder="輸入內容" class="break-all !h-auto min-h-[500px]"
    :toolbar="toolbarOptions" theme="snow" contentType="html" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ImageUploader from 'quill-image-uploader'
import { Quill } from '@vueup/vue-quill'
import { uploadImage } from '@/api/upload/image'

const sizeStyle = Quill.import('attributors/style/size')
sizeStyle.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '32px', '36px']
Quill.register(sizeStyle, true)

const toolbarOptions = [
  // 粗體 斜體 底線 刪除線 -----['bold', 'italic', 'underline', 'strike']
  ['bold', 'italic', 'underline', 'strike'],
  // 引用  程式碼-----['blockquote', 'code-block']
  ['blockquote', 'code-block'],
  // 1、2 級標題-----[{ header: 1 }, { header: 2 }]
  // [{ header: 1 }, { header: 2 }],
  // 有序、無序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ list: 'ordered' }, { list: 'bullet' }],
  // 上標/下標-----[{ script: 'sub' }, { script: 'super' }]
  // [{ script: 'sub' }, { script: 'super' }],
  // 縮排-----[{ indent: '-1' }, { indent: '+1' }]
  // [{ indent: '-1' }, { indent: '+1' }],
  // 文本方向-----[{'direction': 'rtl'}]
  // [{ direction: 'rtl' }],
  // 字體大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ size: [false, '10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px', '32px', '36px'] }],
  // 標題-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // 字體顏色、字體背景顏色-----[{ color: [] }, { background: [] }]
  [{ color: [] }, { background: [] }],
  // 字體種類-----[{ font: [] }]
  [{ font: [] }],
  // 對齊方式-----[{ align: [] }]
  [{ align: [] }],
  // 清除文本格式-----['clean']
  ['clean'],
  // 連結、圖片、視頻-----['link', 'image', 'video']
  ['link', 'image'],
  // ['table'] // 表格
]

const uploadModule = ref({
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: file => {
      return new Promise((resolve, reject) => {
        // 向後端請求上傳圖片
        uploadImage(file).then(res => {
          console.log(res)
          resolve(res.data.imgUrl)// 後端返回的會是一個 img 網址
        }).catch(err => {
          reject("上傳失敗")
        })
      })
    }
  }
})

</script>

<style lang="scss" scoped></style>