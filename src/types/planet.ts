// Types for Planet entity

export type Planet = {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

type PlanetName = Pick<Planet, 'name' | 'url'> & { id: string }

export type PlanetsState = {
  planets: PlanetName[]
  filmPlanets: PlanetName[]
  loading: {
    page: 'filmPage' | null
    store: 'planet' | null
    status: boolean | null
  }
  getFilmPlanets: (ids: number[] | string[]) => void
}
