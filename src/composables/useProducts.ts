import { ref } from 'vue'
import { getProducts, getProductsCount } from '@/services/products'
import { PAGINATION } from '@/config/pagination'

import type { IProduct } from '@/interfaces'

/**
 * Composable для загрузки списка товаров и общего количества
 * @param initialPage - стартовая страница
 */
export function useProducts(initialPage = PAGINATION.initialPage) {
  const products = ref<IProduct[]>([])
  const totalCount = ref<number>(0)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  /**
   * Загрузить товары указанной страницы
   * @param page - номер страницы
   */
  async function loadPage(page: number = initialPage) {
    loading.value = true
    error.value = null
    try {
      products.value = await getProducts(page, PAGINATION.pageSize)
      totalCount.value = await getProductsCount()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Не удалось загрузить товары'
    } finally {
      loading.value = false
    }
  }

  // Автоматическая загрузка при инициализации
  loadPage(initialPage)

  return {
    products,
    totalCount,
    loading,
    error,
    loadPage,
  }
}
