<template>
  <main class="container">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <HomeViewProductGrid v-else :products="products" @buy="onBuy"/>
    <HomeViewPagination v-model:page="currentPage" :totalItems="totalCount" />
    <UiPopup
      v-model:open="isOrderOpen"
      title="Оформление заказа"
    />
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { HomeViewProductGrid, HomeViewPagination } from '@/components/HomeView'
import { useProducts } from '@/composables/useProducts'
import { PAGINATION } from '@/config/pagination'
import { UiPopup } from '@/components/ui'

import type { IProduct } from '@/interfaces'

const currentPage = defineModel({ default: PAGINATION.initialPage })

const { products, totalCount, loading, error, loadPage } = useProducts()

const selected = ref<IProduct|null>(null)
const isOrderOpen = ref(false)

const onBuy = (product: IProduct) => {
  selected.value = product
  isOrderOpen.value = true
}

watch(currentPage, (newPage) => {
  loadPage(newPage)
})
</script>

<style src="./HomeView.css" scoped></style>
