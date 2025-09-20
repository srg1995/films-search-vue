import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    selectedFilters: [],
  }),

  actions: {
    addFilter(filter) {
      if (!this.selectedFilters.some((f) => f.id === filter.id)) {
        this.selectedFilters.push(filter)
      }
    },
    removeFilter(filter) {
      this.selectedFilters = this.selectedFilters.filter((f) => f.id !== filter.id)
    },
    clearFilters() {
      this.selectedFilters = []
    },
  },
})
