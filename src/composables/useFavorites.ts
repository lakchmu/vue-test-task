import { ref, computed, watch } from 'vue'

/**
 * Composable для сохранения товаров в избранное
 */

const favorites = ref<Set<string>>(new Set())

watch(
  favorites,
  (set) => {
    console.log('Избранное: ', JSON.stringify(Array.from(set), null, 2))
  },
  { deep: true },
)

export function useFavorites() {
  function toggleFavorite(id: string) {
    if (favorites.value.has(id)) {
      favorites.value.delete(id)
    } else {
      favorites.value.add(id)
    }
  }
  function isFavorite(id: string) {
    return computed(() => favorites.value.has(id))
  }

  return { toggleFavorite, isFavorite }
}
