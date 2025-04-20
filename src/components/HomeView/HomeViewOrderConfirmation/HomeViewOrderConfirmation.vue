<template>
  <div class="order-confirmation">
    <div class="order-confirmation__message">
      <p>Вы успешно оформили заказ!</p>
    </div>
    <div class="order-confirmation__actions">
      <UiButton @click="close">Закрыть</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiButton } from '@/components/ui'

const emit = defineEmits<{ (e: 'update:open', value: boolean): void }>()

const close = () => {
  emit('update:open', false)
}
</script>

<style src="./HomeViewOrderConfirmation.css" scoped />
