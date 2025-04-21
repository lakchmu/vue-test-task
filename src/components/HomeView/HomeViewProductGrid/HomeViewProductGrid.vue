<template>
  <div class="product-grid">
    <UiCard
      v-for="product in products"
      :key="product.productId"
    >
      <template #favorite>
        <UiFavoriteToggle
          :pressed="isFavorite(product.productId)"
          @toggle="() => toggle(product.productId)"
        />
      </template>
      <template #media>
        <img :src="product.image" :alt="product.title"/>
      </template>
      <template #title>
        {{ product.title }}
      </template>
      <template #action>
        <UiButton @click="$emit('buy', product)">Купить</UiButton>
      </template>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { UiButton, UiCard, UiFavoriteToggle } from '@/components/ui';
import { useFavorites } from '@/composables/useFavorites';

import type { IProduct } from '@/interfaces'

defineProps<{ products: IProduct[] }>()
defineEmits<{ (e: 'buy', product: IProduct): void }>()

const { toggle, isFavorite } = useFavorites()
</script>

<style src="./HomeViewProductGrid.css" scoped />
