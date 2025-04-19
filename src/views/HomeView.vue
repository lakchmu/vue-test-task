<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else-if="error">{{ error }}</div>
  <HomeViewProductGrid v-else :products="products" />
</template>

<script setup lang="ts">
import HomeViewProductGrid from '@/components/HomeView/HomeViewProductGrid.vue'
import { useProducts } from '@/composables/useProducts'

const { products, loading, error } = useProducts(1)

</script>

<style scoped></style>
