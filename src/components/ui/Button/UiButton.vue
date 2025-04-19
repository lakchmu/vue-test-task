<template>
  <button :type="nativeType" :disabled="disabled" class="base-button"><slot /></button>
</template>

<script setup lang="ts">
interface IButton {
  disabled?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
}
const { nativeType, disabled } = defineProps<IButton>()
</script>

<style src="./UiButton.css" scoped></style>
