import create from "zustand";
import { BASE_API_URL, RESSOURCE } from "@utils/constants";

type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

type FilmTitle = Pick<Film, "title" | "url"> & { id: string };

type FilmState = {
  count: number;
  films: Film[];
  starshipFilms: FilmTitle[];
  pilotFilms: FilmTitle[];
  getPilotFilms: (ids: number[] | string[]) => void;
  getStarshipFilms: (ids: number[] | string[]) => void;
  film: Film | {};
  loading: {
    page: "starshipPage" | "filmPage" | null;
    store: "film";
    status: boolean | null;
  };
  getFilmById: (id: number | string) => void;
};

const useFilmStore = create<FilmState>((set) => ({
  count: 0,
  films: [],
  film: {},
  starshipFilms: [],
  pilotFilms: [],
  loading: {
    page: null,
    store: null,
    status: null
  },
  getStarshipFilms: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: "starshipPage",
          store: "film",
          status: true
        }
      });

      const films = await Promise.all(
        ids?.map(async (id: string | number) => {
          const response = await fetch(
            `${BASE_API_URL}/${RESSOURCE.FILMS}/${id}`
          );

          const data = await response.json();
          const { url, title } = data;

          return {
            id: url.split("/").at(-2),
            title,
            url
          };
        })
      );

      set({
        starshipFilms: films,
        loading: {
          page: "starshipPage",
          store: "film",
          status: false
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  getPilotFilms: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: "starshipPage",
          store: "film",
          status: true
        }
      });

      const films = await Promise.all(
        ids?.map(async (id: string | number) => {
          const response = await fetch(
            `${BASE_API_URL}/${RESSOURCE.FILMS}/${id}`
          );

          const data = await response.json();
          const { url, title } = data;

          return {
            id: url.split("/").at(-2),
            title,
            url
          };
        })
      );

      set({
        pilotFilms: films,
        loading: {
          page: "starshipPage",
          store: "film",
          status: false
        }
      });
    } catch (error) {
      console.error(error);
    }
  },
  getFilmById: async (id: number | string) => {
    try {
      set({
        loading: {
          page: "filmPage",
          store: "film",
          status: true
        }
      });

      const response = await fetch(`${BASE_API_URL}/${RESSOURCE.FILMS}/${id}`);

      const data = await response.json();

      set({
        film: data,
        loading: {
          page: "filmPage",
          store: "film",
          status: false
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}));

export default useFilmStore;
