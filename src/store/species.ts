import create from 'zustand'
import { BASE_API_URL, RESSOURCE } from '@utils/constants'
import type { SpeciesState } from '../types/species'

const useSpeciesStore = create<SpeciesState>(set => ({
  count: 0,
  species: [],
  filmSpecies: [],
  loading: {
    page: null,
    store: null,
    status: null,
  },
  getFilmSpecies: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: 'filmPage',
          store: 'species',
          status: true,
        },
      })

      const species = await Promise.all(
        ids?.map(async (id: string | number) => {
          const response = await fetch(`${BASE_API_URL}/${RESSOURCE.SPECIES}/${id}`)

          const data = await response.json()
          const { url, name } = data

          return {
            id: url.split('/').at(-2),
            name,
            url,
          }
        }),
      )

      set({
        filmSpecies: species,
        loading: {
          page: 'filmPage',
          store: 'species',
          status: false,
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
}))

export default useSpeciesStore
