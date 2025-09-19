<template>
  <div ref="imgRef" class="relative overflow-hidden" :class="customClass">
    <img
      v-if="isVisible"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover transition duration-500 ease-in-out"
      :class="loaded ? 'blur-0 scale-100' : 'blur-md scale-105'"
      @load="loaded = true"
    />
    <div v-if="!loaded" class="absolute inset-0 bg-gray-300 animate-pulse" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  customClass: { type: String, default: '' },
})

const isVisible = ref(false)
const loaded = ref(false)
const imgRef = ref(null)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      })
    },
    { threshold: 0.1 },
  )

  if (imgRef.value) observer.observe(imgRef.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>
