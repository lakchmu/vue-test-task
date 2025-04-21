import { ref } from 'vue'

const stack = ref<HTMLElement[]>([])

export function useFocusStack() {
  const push = (element: HTMLElement | null) => {
    if (element) stack.value.push(element)
  }
  const pop = () => {
    return stack.value.pop() || null
  }

  return { push, pop }
}
