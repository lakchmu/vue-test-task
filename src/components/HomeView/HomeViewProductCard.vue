<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.title" class="product-card__image" />
    <div class="product-card__inner">
      <div class="product-card__title">
        {{ product.title }}
      </div>
      <UiButton>Купить</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiButton from '../ui/Button/UiButton.vue';

import type { IProduct } from '@/interfaces'

const { product } = defineProps<{ product: IProduct }>()
</script>

<style src="./HomeViewProductCard.css" scoped></style>
