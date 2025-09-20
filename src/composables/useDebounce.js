import { ref, watch } from 'vue'

export function useDebounce(valueRef, delay = 500) {
  const debounced = ref(valueRef.value)

  let timeout
  watch(valueRef, (val) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      debounced.value = val
    }, delay)
  })

  return debounced
}
