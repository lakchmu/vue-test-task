<template>
  <div class="product-grid">
    <HomeViewProductCard
      v-for="(product, index) in props.products"
      :key="index"
      :product="product"
      @buy="(value) => $emit('buy', value)"
    />
  </div>
</template>

<script setup lang="ts">
import { HomeViewProductCard } from '@/components/HomeView'

import type { IProduct } from '@/interfaces'

const props = defineProps<{ products: IProduct[] }>()
defineEmits<{ (e: 'buy', value: IProduct): void }>()
</script>

<style src="./HomeViewProductGrid.css" scoped></style>
