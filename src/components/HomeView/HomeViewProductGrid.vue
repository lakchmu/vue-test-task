<template>
  <div class="product-grid">
    <div v-for="(product, index) in props.products" :key="index">{{ product }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ products: [] }>();
</script>

<style src="./HomeViewProductGrid.css" scoped></style>
