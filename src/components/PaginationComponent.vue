<template>
  <div class="flex justify-center items-center space-x-4 my-4">
    <button
      class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
      @click="prevPage"
      :disabled="page === 1"
    >
      Anterior
    </button>

    <span> Página {{ page }} de {{ totalPages }} </span>

    <button
      class="bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
      @click="nextPage"
      :disabled="page === totalPages"
    >
      Siguiente
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

const emit = defineEmits(['update:currentPage'])

const nextPage = () => {
  console.log('Next page clicked', props.page, props.totalPages)
  if (props.page < props.totalPages) {
    emit('update:currentPage', props.page + 1)
  }
}
const prevPage = () => {
  console.log('Next page clicked', props.page, props.totalPages)
  if (props.page > 1) {
    emit('update:currentPage', props.page - 1)
  }
}
</script>

<style></style>
