<template>
  <transition name="ui-popup-fade">
    <div
      v-if="open"
      class="ui-popup-backdrop"
      @click="onBackdropClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
    >
      <div
        class="ui-popup-content"
        ref="content"
        tabindex="-1"
        @click.stop
        @keydown="onKeydown"
      >
        <header class="ui-popup-header">
          <div class="ui-popup-title">{{ title }}</div>
          <IconClose
            v-if="hasClose"
            class="ui-popup-close"
            type="button"
            @click="close"
            @keydown.enter.prevent="close"
            @keydown.space.prevent="close"
            aria-label="Закрыть"
            tabindex="0"
          />
        </header>
        <section>
          <slot />
        </section>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick, defineProps, defineEmits } from 'vue'

import { IconClose } from '@/components/icon'
import { useFocusStack } from '@/composables/useFocusStack'

type Props = {
  title: string
  open: boolean
  hasClose?: boolean
}
const props = withDefaults(defineProps<Props>(), { hasClose: true })
const emit = defineEmits<{ (e: 'update:open', value: boolean): void }>()

const { push, pop } = useFocusStack()
const content = ref<HTMLElement | null>(null)

function close() {
  emit('update:open', false)
}

function onBackdropClick() {
  close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.stopPropagation()
    close()
    return
  }
  if (e.key !== 'Tab') return

  const el = content.value
  if (!el) return
  const focusable = el.querySelectorAll<HTMLElement>(
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"])'
  )
  if (focusable.length === 0) {
    e.preventDefault()
    return
  }
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault()
      last.focus()
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(
  () => props.open,
  async (visible) => {
    if (visible) {
      push(document.activeElement as HTMLElement)
      document.body.style.overflow = 'hidden'
      await nextTick()
      content.value?.focus()
    } else {
      document.body.style.overflow = ''
      const previouslyFocused = pop()
      previouslyFocused?.focus()
    }
  }
)

onMounted(() => {
  window.addEventListener('keydown', onKeydown as EventListener)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown as EventListener)
})
</script>

<style src="./UiPopup.css" scoped />
