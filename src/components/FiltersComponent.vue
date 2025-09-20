<template>
  <div class="w-full flex flex-col px-8">
    <div class="w-64">
      <button
        type="button"
        @click="open = !open"
        class="w-full flex items-center justify-between px-4 py-2 border rounded-xl bg-white shadow hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <span class="truncate">Selecciona géneros...</span>
        <svg
          :class="['w-4 h-4 ml-2 transition-transform', open ? 'rotate-180' : '']"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-if="open" class="absolute z-20 mt-2 bg-white border rounded-xl shadow-lg">
        <div class="p-2">
          <input
            type="text"
            placeholder="Buscar..."
            v-model="query"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <ul class="max-h-60 overflow-y-auto">
          <li v-if="filtered.length === 0" class="px-3 py-2 text-gray-500">Sin resultados</li>
          <template v-else>
            <li
              v-for="filter in filtered"
              :key="filter.id"
              @click="toggleFilter(filter)"
              :class="[
                'cursor-pointer px-3 py-2 flex justify-between items-center hover:bg-gray-50',
                filtersStore.selectedFilters.some((f) => f.id === filter.id)
                  ? 'bg-indigo-50 font-medium'
                  : '',
              ]"
            >
              {{ filter.name }}
              <svg
                v-if="filtersStore.selectedFilters.some((f) => f.id === filter.id)"
                class="w-4 h-4 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="{2}"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="mt-2 flex">
      <button
        v-for="select in filtersStore.selectedFilters"
        :key="select.id"
        @click="toggleFilter(select)"
        class="flex justify-between items-center px-2 gap-1 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 m-1 hover:bg-red-200 hover:text-red-800 cursor-pointer"
      >
        {{ select.name }} <XCircleIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { useFiltersStore } from '@/stores/filtersStore'
import { computed, ref } from 'vue'
import { XCircleIcon } from '@heroicons/vue/24/solid'
import { useDebounce } from '@/composables/useDebounce'
const open = ref(false)
const query = ref('')
const debounceQuery = useDebounce(query, 400)
const props = defineProps({
  filters: {
    type: Array,
    required: true,
  },
})
const filtersStore = useFiltersStore()

const filtered = computed(() => {
  return debounceQuery.value
    ? props.filters.filter((f) => f.name.toLowerCase().includes(debounceQuery.value.toLowerCase()))
    : props.filters
})

const toggleFilter = (filter) => {
  const exists = filtersStore.selectedFilters.some((s) => s.id === filter.id)

  if (exists) {
    filtersStore.removeFilter(filter) // elimina el filtro del filtersStore
  } else {
    filtersStore.addFilter(filter) // añade el filtro al filtersStore
  }

  open.value = false
  console.log(filtersStore.selectedFilters)
}
</script>

<style></style>
