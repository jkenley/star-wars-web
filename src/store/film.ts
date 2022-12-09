import create from 'zustand'
import { BASE_API_URL, RESSOURCE } from '@utils/constants'
import type { FilmState } from '../types/film'

const useFilmStore = create<FilmState>(set => ({
  count: 0,
  films: [],
  film: {},
  starshipFilms: [],
  pilotFilms: [],
  loading: {
    page: null,
    store: null,
    status: null,
  },
  getStarshipFilms: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: 'starshipPage',
          store: 'film',
          status: true,
        },
      })

      const films = await Promise.all(
        ids?.map(async (id: string | number) => {
          const response = await fetch(`${BASE_API_URL}/${RESSOURCE.FILMS}/${id}`)

          const data = await response.json()
          const { url, title } = data

          return {
            id: url.split('/').at(-2),
            title,
            url,
          }
        }),
      )

      set({
        starshipFilms: films,
        loading: {
          page: 'starshipPage',
          store: 'film',
          status: false,
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  getPilotFilms: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: 'starshipPage',
          store: 'film',
          status: true,
        },
      })

      const films = await Promise.all(
        ids?.map(async (id: string | number) => {
          const response = await fetch(`${BASE_API_URL}/${RESSOURCE.FILMS}/${id}`)

          const data = await response.json()
          const { url, title } = data

          return {
            id: url.split('/').at(-2),
            title,
            url,
          }
        }),
      )

      set({
        pilotFilms: films,
        loading: {
          page: 'starshipPage',
          store: 'film',
          status: false,
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
  getFilmById: async (id: number | string) => {
    try {
      set({
        loading: {
          page: 'filmPage',
          store: 'film',
          status: true,
        },
      })

      const response = await fetch(`${BASE_API_URL}/${RESSOURCE.FILMS}/${id}`)

      const data = await response.json()

      set({
        film: data,
        loading: {
          page: 'filmPage',
          store: 'film',
          status: false,
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
}))

export default useFilmStore
