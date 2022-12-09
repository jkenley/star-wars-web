import create from 'zustand'
import { BASE_API_URL, RESSOURCE } from '@utils/constants'
import type { StarshipState } from '../types/starship'

const useStarshipStore = create<StarshipState>(set => ({
  count: 0,
  loading: {
    page: null,
    store: null,
    status: null,
  },
  starships: [],
  starship: {},
  pilotStarships: [],
  filmStarships: [],
  getStarships: async () => {
    try {
      set({
        loading: {
          page: 'homePage',
          store: 'starship',
          status: true,
        },
      })
      const pageIds: Array<number> = [1, 2, 3, 4]

      const promises = await Promise.all(
        pageIds.map(async id => {
          const response = await fetch(`${BASE_API_URL}/${RESSOURCE.STARSHIPS}/?page=${id}`)

          const data = await response.json()

          return data.results
        }),
      )

      const starships: any = [...promises[0], ...promises[1], ...promises[2], ...promises[3]]

      set({
        count: starships.length,
        starships,
        loading: {
          page: 'homePage',
          store: 'starship',
          status: false,
        },
      })
    } catch (error) {
      console.log(error)
    }
  },
  getStarshipById: async (id: string | number) => {
    try {
      set({
        loading: {
          page: 'starshipPage',
          store: 'starship',
          status: true,
        },
      })

      const response = await fetch(`${BASE_API_URL}/${RESSOURCE.STARSHIPS}/${id}`)

      const data = await response.json()

      set({
        starship: data,
        loading: {
          page: 'starshipPage',
          store: 'starship',
          status: false,
        },
      })
    } catch (error) {
      console.log(error)
    }
  },
  getPilotStarships: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: 'starshipPage',
          store: 'starship',
          status: true,
        },
      })

      const starships = await Promise.all(
        ids?.map(async (id: string | number) => {
          const response = await fetch(`${BASE_API_URL}/${RESSOURCE.STARSHIPS}/${id}`)

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
        pilotStarships: starships,
        loading: {
          page: 'starshipPage',
          store: 'starship',
          status: false,
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  getFilmStarships: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: 'filmPage',
          store: 'starship',
          status: true,
        },
      })

      const starships = await Promise.all(
        ids?.map(async (id: string | number) => {
          const response = await fetch(`${BASE_API_URL}/${RESSOURCE.STARSHIPS}/${id}`)

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
        filmStarships: starships,
        loading: {
          page: 'filmPage',
          store: 'starship',
          status: false,
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
}))

export default useStarshipStore
