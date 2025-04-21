<template>
  <div class="product-card">
    <UiFavoriteToggle
      :pressed="isFav"
      @toggle="toggleFav"
      class="product-card__favorite-toggle"
    />
    <img :src="product.image" :alt="product.title" class="product-card__image" />
    <div class="product-card__inner">
      <div class="product-card__title">
        {{ product.title }}
      </div>
      <UiButton @click="$emit('buy', product)">Купить</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiButton, UiFavoriteToggle } from '@/components/ui'
import { useFavorites } from '@/composables/useFavorites'

import type { IProduct } from '@/interfaces'

const { product } = defineProps<{ product: IProduct }>()
defineEmits<{ (e: 'buy', product: IProduct): void }>()

const { toggleFavorite, isFavorite } = useFavorites()
const isFav = isFavorite(product.productId)

function toggleFav() {
  toggleFavorite(product.productId)
}
</script>

<style src="./HomeViewProductCard.css" scoped></style>
