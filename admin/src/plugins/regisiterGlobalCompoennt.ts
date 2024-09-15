import { defineAsyncComponent } from 'vue'
export default function registerGlobalComponent(app: any) {
  app.component('Title', defineAsyncComponent(() => import('@/components/Title.vue')))
  app.component('SaveButton', defineAsyncComponent(() => import('@/components/SaveButton.vue')))
  app.component('FunctionalButton', defineAsyncComponent(() => import('@/components/FunctionalButton.vue')))
}