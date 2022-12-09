import create from 'zustand'
import { BASE_API_URL, RESSOURCE } from '@utils/constants'
import type { PeopleState } from '../types/people'

const usePeopleStore = create<PeopleState>(set => ({
  people: [],
  filmCharacters: [],
  person: {},
  loading: {
    page: null,
    store: null,
    status: null,
  },
  getFilmCharacters: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: 'filmPage',
          store: 'people',
          status: true,
        },
      })

      const people = await Promise.all(
        ids?.map(async (id: string | number) => {
          const response = await fetch(`${BASE_API_URL}/${RESSOURCE.PEOPLE}/${id}`)

          const data = await response.json()
          const { name, url } = data

          return {
            id: url.split('/').at(-2),
            name,
            url,
          }
        }),
      )

      set({
        filmCharacters: people,
        loading: {
          page: 'filmPage',
          store: 'people',
          status: false,
        },
      })
    } catch (error) {
      console.log(error)
    }
  },
  getCharacterById: async (id: number | string) => {
    try {
      set({
        loading: {
          page: 'characterPage',
          store: 'people',
          status: true,
        },
      })

      const response = await fetch(`${BASE_API_URL}/${RESSOURCE.PEOPLE}/${id}`)
      const data = await response.json()

      set({
        person: data,
        loading: {
          page: 'characterPage',
          store: 'people',
          status: false,
        },
      })
    } catch (error) {
      console.log(error)
    }
  },
}))

export default usePeopleStore
