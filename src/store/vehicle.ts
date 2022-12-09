import create from 'zustand'
import { BASE_API_URL, RESSOURCE } from '@utils/constants'
import type { VehiclesState } from '../types/vehicle'

const useVehiclesStore = create<VehiclesState>(set => ({
  count: 0,
  vehicles: [],
  vehicle: {},
  loading: {
    page: null,
    store: null,
    status: null,
  },
  filmVehicles: [],
  getFilmVehicles: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: 'filmPage',
          store: 'vehicle',
          status: true,
        },
      })

      const vehicles = await Promise.all(
        ids?.map(async (id: number | string) => {
          const response = await fetch(`${BASE_API_URL}/${RESSOURCE.VEHICLES}/${id}`)

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
        filmVehicles: vehicles,
        loading: {
          page: 'filmPage',
          store: 'vehicle',
          status: false,
        },
      })
    } catch (error) {
      console.error(error)
    }
  },
}))

export default useVehiclesStore
