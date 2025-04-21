<template>
  <main class="container">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <HomeViewProductGrid v-else :products="products" @buy="onBuy" />
    <HomeViewPagination v-model:page="currentPage" :totalItems="totalCount" />
    <UiPopup v-model:open="isOrderOpen" title="Оформление заказа">
      <HomeViewOrderForm :product="selectedProduct" @order-submitted="onOrderSubmitted" />
    </UiPopup>
    <UiPopup v-model:open="isConfirmationOpen" title="Заказ оформлен" :hasClose="false">
      <HomeViewOrderConfirmation v-model:open="isConfirmationOpen" />
    </UiPopup>
  </main>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import {
  HomeViewProductGrid,
  HomeViewPagination,
  HomeViewOrderForm,
  HomeViewOrderConfirmation,
} from '@/components/HomeView'
import { useProducts } from '@/composables/useProducts'
import { PAGINATION } from '@/config/pagination'
import { UiPopup } from '@/components/ui'

import type { IProduct } from '@/interfaces'

const currentPage = defineModel({ default: PAGINATION.initialPage })

const { products, totalCount, loading, error, loadPage } = useProducts()

const selectedProduct = ref<IProduct>()
const isOrderOpen = ref(false)
const isConfirmationOpen = ref(false)

const onBuy = (product: IProduct) => {
  selectedProduct.value = product
  isOrderOpen.value = true
}

const onOrderSubmitted = (data: {
  fullName: string
  email: string
  phone: string
  product?: IProduct
}) => {
  console.log('Данные заказа: ', JSON.stringify(data, null, 2))
  isConfirmationOpen.value = true
}

watch(currentPage, (newPage) => {
  loadPage(newPage)
})

watch(isConfirmationOpen, (newValue) => {
  if (!newValue) {
    isOrderOpen.value = false
  }
})
</script>

<style src="./HomeView.css" scoped />
