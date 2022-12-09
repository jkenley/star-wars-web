// Types for Starship entity

export type Starship = {
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
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilots: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

type StarshipName = Pick<Starship, 'name' | 'url'> & { id: string }

export type StarshipState = {
  count: number
  starships: Starship[]
  starship: Starship | Object
  pilotStarships: StarshipName[]
  filmStarships: StarshipName[]
  loading: {
    page: 'homePage' | 'starshipPage' | 'filmPage' | null
    store: 'starship'
    status: boolean | null
  }
  getStarships?: () => void
  getStarshipById?: (id: string | number) => void
  getPilotStarships?: (ids: number[] | string[]) => void
  getFilmStarships?: (ids: number[] | string[]) => void
}
