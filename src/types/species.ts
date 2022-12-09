export type Species = {
  name: string
  classification: string
  designation: string
  average_height: string
  skin_colors: string
  hair_colors: string
  eye_colors: string
  average_lifespan: string
  homeworld: string
  language: string
  people: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

type SpeciesName = Pick<Species, 'name' | 'url'> & { id: string }

export type SpeciesState = {
  count: number
  species: Species[]
  filmSpecies: SpeciesName[]
  loading: {
    page: 'filmPage' | null
    store: 'species'
    status: boolean | null
  }
  getFilmSpecies?: (ids: number[] | string[]) => void
}
