<template>
  <div class="pagination">
    <UiButton :disabled="page === props.initialPage" @click="goTo(page - 1)">Назад</UiButton>
    <UiButton :disabled="page === totalPages" @click="goTo(page + 1)">Далее</UiButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { UiButton } from '@/components/ui'
import { PAGINATION } from '@/config/pagination'

const props = withDefaults(
  defineProps<{
    page: number
    totalItems: number
    initialPage?: number
    pageSize?: number
  }>(),
  {
    initialPage: PAGINATION.initialPage,
    pageSize: PAGINATION.pageSize,
  },
)

const emit = defineEmits<{
  (e: 'update:page', value: number): void
}>()

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize))
const lastPage = computed(() => Math.max(0, totalPages.value - 1))

function goTo(newPage: number) {
  if (newPage < PAGINATION.initialPage || newPage > lastPage.value) return
  emit('update:page', newPage)
}
</script>

<style src="./HomeViewPagination.css" scoped />
