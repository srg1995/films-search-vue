<template>
  <router-link :to="`/detail/${film.id}`">
    <div
      class="bg-white shadow-lg rounded-2xl overflow-hidden m-4 hover:scale-105 transition-transform duration-300"
    >
      <LazyImageComponent
        :src="'https://image.tmdb.org/t/p/w200' + film.poster_path"
        :alt="film.title || film.name"
        customClass="w-full h-96"
      />

      <div class="p-4 flex flex-col justify-between h-48">
        <h2 class="text-lg font-bold mb-2">{{ film.title || film.name }}</h2>
        <p class="text-gray-600 text-sm mb-2 line-clamp-3">
          {{ film.overview || 'Sin descripción disponible.' }}
        </p>
        <div class="flex justify-between items-center">
          <span class="text-yellow-500 font-semibold"> ⭐ {{ film.vote_average }} </span>
          <span class="text-gray-400 text-sm">
            {{ film.media_type === 'movie' ? film.release_date : film.first_air_date }}
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import LazyImageComponent from './LazyImageComponent.vue'

const props = defineProps({
  film: {
    type: Object,
    required: true,
  },
})
</script>

<style></style>
