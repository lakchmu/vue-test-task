<template>
  <div v-if="loading">Загрузка...</div>
  <HomeViewProductGrid v-else :products="products" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import HomeViewProductGrid from '@/components/HomeView/HomeViewProductGrid.vue'
import { getProducts } from '@/services/products';

import type { IProduct } from '@/interfaces';

const products = ref([] as IProduct[]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    products.value = await getProducts(1, 20);
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Не удалось загрузить товары';
  } finally {
    loading.value = false;
  }
})
</script>

<style scoped></style>
