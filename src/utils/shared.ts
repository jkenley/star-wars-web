import {
  FILM_COVER_URL,
  PILOT_PICTURE_URL,
  STARSHIP_PICTURE_URL,
  PLANET_PICTURE_URL,
  STARSHIP_PICTURE_2_URL,
  VEHICLE_PICTURE_URL,
  SPECIES_PICTURE_URL,
} from './constants'

export const toTitleCase = (str: string): string => {
  if (!str) {
    return ''
  }

  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

export const getFilmCover = (id: number | string): string => {
  return `${FILM_COVER_URL}/${id}.jpg`
}

export const getPeoplePicture = (id: number | string): string => {
  return `${PILOT_PICTURE_URL}/${id}.jpg`
}

export const getStarshipPicture = (id: number | string): string => {
  return `${STARSHIP_PICTURE_URL}/${id}.png`
}

export const getPlanetPicture = (id: number | string): string => {
  return `${PLANET_PICTURE_URL}/${id}.jpg`
}

export const getStarship2Picture = (id: number | string): string => {
  return `${STARSHIP_PICTURE_2_URL}/${id}.jpg`
}

export const getVehiclePicture = (id: number | string): string => {
  return `${VEHICLE_PICTURE_URL}/${id}.jpg`
}

export const getSpeciesPicture = (id: number | string): string => {
  return `${SPECIES_PICTURE_URL}/${id}.jpg`
}
