export type Vehicle = {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  vehicle_class: string
  pilots: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

type VehicleName = Pick<Vehicle, 'name' | 'url'> & { id: string }

export type VehiclesState = {
  count: number
  vehicles: Vehicle[]
  vehicle: Vehicle | Object
  loading: {
    page: 'filmPage' | null
    store: 'vehicle'
    status: boolean | null
  }
  filmVehicles: VehicleName[]
  getFilmVehicles?: (ids: number[] | string[]) => void
}
