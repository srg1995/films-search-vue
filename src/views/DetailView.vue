<template>
  <div v-if="isLoading" class="flex justify-center items-center h-screen">
    <p class="text-xl font-semibold text-gray-700 animate-pulse">Cargando...</p>
  </div>
  <div v-else class="max-w-6xl mx-auto p-6 md:p-12">
    <Link to="/" class="flex items-center text-indigo-600 font-semibold mb-6 hover:text-indigo-800">
      <ArrowLeftIcon class="w-5 h-5 mr-2" /> Volver a la lista
    </Link>

    <div class="flex flex-col md:flex-row gap-8 bg-blue-50 shadow-xl rounded-2xl overflow-hidden">
      <div class="md:w-1/3 flex justify-center items-start">
        <img
          :src="`https://image.tmdb.org/t/p/w400${data.poster_path}`"
          :alt="data.title || data.name"
          class="shadow-lg transition-transform transform hover:scale-105"
        />
      </div>

      <div class="md:w-2/3 p-6 flex flex-col justify-between">
        <h1 class="text-4xl font-bold mb-4">{{ data.title || data.name }}</h1>
        <p class="text-gray-700 text-lg mb-4 line-clamp-8">
          {{ data.overview || 'No hay descripción disponible.' }}
        </p>

        <div class="flex flex-wrap gap-4 mt-4">
          <span
            class="px-3 py-1 bg-indigo-100 border-2 border-indigo-200 text-indigo-800 font-medium rounded-full"
          >
            ⭐ {{ data.vote_average }}
          </span>

          <span
            v-for="g in data.genres"
            :key="g.id"
            class="px-3 py-1 bg-green-100 border-2 border-green-200 text-green-800 font-medium rounded-full"
          >
            {{ g.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getFilmById } from '@/services/getFilmById'
import { useQuery } from '@tanstack/vue-query'
import { defineProps } from 'vue'

const props = defineProps({
  id: String,
})

console.log(props.id)

const { data, isLoading } = useQuery({
  queryKey: ['film', props.id],
  queryFn: () => getFilmById(props.id),
})
</script>
