<template>
  <form class="order-form" @submit.prevent="submitForm">
    <div class="order-form__content">
      <div class="order-form__field">
        <label for="fullName">Полное имя</label>
        <input
          id="fullName"
          v-model="fullName"
          type="text"
          required
          placeholder="Введите ваше имя"
        />
      </div>

      <div class="order-form__field">
        <label for="email">E-mail</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="example@mail.com"
        />
      </div>

      <div class="order-form__field">
        <label for="phone">Телефон</label>
        <input
          id="phone"
          v-model="phone"
          type="tel"
          required
          placeholder="7"
        />
      </div>
    </div>

    <div class="order-form__actions">
      <UiButton type="submit">
        Оформить заказ
      </UiButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UiButton } from '@/components/ui';

import type { IProduct } from '@/interfaces';

const props = defineProps<{ product?: IProduct }>()
const emit = defineEmits<{
  (e: 'order-submitted', data: {
    fullName: string
    email: string
    phone: string
    product?: IProduct
  }): void
}>()

const fullName = ref<string>('')
const email = ref<string>('')
const phone = ref<string>('')

const submitForm = () => {
  const formData = {
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    product: props.product
  }
  emit('order-submitted', formData)
}
</script>

<style src="./HomeViewOrderForm.css" scoped />
