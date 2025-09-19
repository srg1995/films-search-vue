<template>
  <main>
    <h1 v-if="isLoading" class="text-3xl font-bold">Cargando películas...</h1>

    <div v-else class="flex flex-col items-center">
      <h1 class="text-3xl font-bold">Películas y Series Populares</h1>
      <FiltersComponent :filters="genres" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        <template v-for="film in films" :key="film.id">
          <CardComponent :film="film" />
        </template>
      </div>
      <PaginationComponent :page="page" :totalPages="totalPages" :setPage="setPage" />
    </div>
  </main>
</template>

<script setup>
import CardComponent from '@/components/CardComponent.vue'
import FiltersComponent from '@/components/FiltersComponent.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { getFilms } from '@/services/getFilms'
import { getGenre } from '@/services/getGenre'
import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'

const page = ref(1)

const { data: dataFilms, isLoading } = useQuery({
  queryKey: ['films', page],
  queryFn: () => getFilms(page.value),
  keepPreviousData: true,
})
const { data: dataGenres } = useQuery({
  queryKey: ['genre'],
  queryFn: getGenre,
})

const films = computed(() => dataFilms.value?.results ?? [])
const genres = computed(() => dataGenres.value?.genres ?? [])
const totalPages = computed(() => dataFilms.value?.total_pages ?? 1)
</script>
