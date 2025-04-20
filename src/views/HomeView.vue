<template>
  <main class="container">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <HomeViewProductGrid v-else :products="products" />
    <HomeViewPagination v-model:page="currentPage" :totalItems="totalCount" />
  </main>
</template>

<script setup lang="ts">
import { watch } from 'vue'

import { HomeViewProductGrid, HomeViewPagination } from '@/components/HomeView'
import { useProducts } from '@/composables/useProducts'
import { PAGINATION } from '@/config/pagination'

const currentPage = defineModel({ default: PAGINATION.initialPage })

const { products, totalCount, loading, error, loadPage } = useProducts()

watch(currentPage, (newPage) => {
  loadPage(newPage)
})
</script>

<style src="./HomeView.css" scoped></style>
