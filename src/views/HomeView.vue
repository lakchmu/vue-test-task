<template>
  <HomeViewProductGrid :products="products" />
</template>

<script setup lang="ts">
import HomeViewProductGrid from '@/components/HomeView/HomeViewProductGrid.vue'
import { ref } from 'vue';
const products = ref(new Array(20).fill('Product'));
</script>

<style scoped></style>
