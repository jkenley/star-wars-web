export const BASE_API_URL: string = 'https://swapi.dev/api'

export const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'https://star-wars-beta-opal.vercel.app' : 'http://localhost:3000'

export const ROUTE = {
  HOME: '/',
  FILMS: '/films',
  STARSHIPS: '/starships',
  PEOPLE: '/characters',
}

export const RESSOURCE = Object.freeze({
  STARSHIPS: '/starships',
  PEOPLE: '/people',
  PLANETS: '/planets',
  FILMS: '/films',
  SPECIES: '/species',
  VEHICLES: '/vehicles',
})

export const FILM_COVER_URL = 'https://starwars-visualguide.com/assets/img/films'

export const PILOT_PICTURE_URL = 'https://starwars-visualguide.com/assets/img/characters'

export const STARSHIP_PICTURE_URL = 'https://ik.imagekit.io/p4ls2huzsz/belifkutlu/starships'

export const PLANET_PICTURE_URL = 'https://starwars-visualguide.com/assets/img/planets'

export const STARSHIP_PICTURE_2_URL = 'https://starwars-visualguide.com/assets/img/starships'

export const VEHICLE_PICTURE_URL = 'https://starwars-visualguide.com/assets/img/vehicles'

export const SPECIES_PICTURE_URL = 'https://starwars-visualguide.com/assets/img/species'
