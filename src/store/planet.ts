import create from 'zustand'
import { BASE_API_URL, RESSOURCE } from '@utils/constants'
import type { PlanetsState } from '../types/planet'

const usePlanetStore = create<PlanetsState>(set => ({
  planets: [],
  filmPlanets: [],
  loading: {
    page: null,
    store: null,
    status: null,
  },
  getFilmPlanets: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: 'filmPage',
          store: 'planet',
          status: true,
        },
      })

      const planets = await Promise.all(
        ids?.map(async (id: string | number) => {
          const response = await fetch(`${BASE_API_URL}/${RESSOURCE.PLANETS}/${id}`)

          const data = await response.json()
          const { name, url } = data

          return {
            id: id.toString(),
            name,
            url,
          }
        }),
      )

      set({
        filmPlanets: planets,
        loading: {
          page: 'filmPage',
          store: 'planet',
          status: false,
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
}))

export default usePlanetStore
