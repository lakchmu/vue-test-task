import { ref, watch } from 'vue'

/**
 * Composable для сохранения товаров в избранное
 */

const favorites = ref<Set<string>>(new Set())

export function initFavorites(initialIds: string[]) {
  favorites.value = new Set(initialIds)
}

watch(
  favorites,
  (set) => {
    console.log('Избранное: ', JSON.stringify(Array.from(set), null, 2))
  },
  { deep: true },
)

export function useFavorites() {
  const toggle = (id: string) => {
    if (favorites.value.has(id)) {
      favorites.value.delete(id)
    } else {
      favorites.value.add(id)
    }
  }

  const isFavorite = (id: string) => favorites.value.has(id);

  return { toggle, isFavorite }
}
