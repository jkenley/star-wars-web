// Types for Film entity

export type Film = {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
  created: string
  edited: string
  url: string
}

type FilmTitle = Pick<Film, 'title' | 'url'> & { id: string }

export type FilmState = {
  count: number
  films: Film[]
  starshipFilms: FilmTitle[]
  pilotFilms: FilmTitle[]
  getPilotFilms: (ids: number[] | string[]) => void
  getStarshipFilms: (ids: number[] | string[]) => void
  film: Film | Object
  loading: {
    page: 'starshipPage' | 'filmPage' | null
    store: 'film'
    status: boolean | null
  }
  getFilmById: (id: number | string) => void
}
