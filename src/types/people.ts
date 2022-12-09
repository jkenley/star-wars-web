// Types for People entity

export type People = {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

type PeopleName = Pick<People, 'name' | 'url'> & { id: string }

export type PeopleState = {
  people: PeopleName[]
  person: People | Object
  filmCharacters: PeopleName[]
  loading: {
    page: 'filmPage' | 'characterPage' | null
    store: 'people' | null
    status: boolean | null
  }
  getFilmCharacters: (ids: number[] | string[]) => void
  getCharacterById: (id: number | string) => void
}
