<template>
  <button class="favorite-toggle" :aria-pressed="pressed" @click="$emit('toggle')">
    <IconHeartFilled v-if="pressed" />
    <IconHeartOutline v-else />
  </button>
</template>

<script setup lang="ts">
import { IconHeartFilled, IconHeartOutline } from '@/components/icon';

defineProps<{ pressed: boolean }>()
defineEmits<{ (e: 'toggle'): void }>()
</script>

<style src="./UiFavoriteToggle.css" scoped />
