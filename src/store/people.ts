import create from "zustand";
import { BASE_API_URL, RESSOURCE } from "@utils/constants";

type People = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

type PeopleName = Pick<People, "name" | "url"> & { id: string };

type PeopleState = {
  people: PeopleName[];
  person: PeopleName | {};
  filmCharacters: PeopleName[];
  loading: {
    page: "filmPage" | "characterPage" | null;
    store: "people" | null;
    status: boolean | null;
  };
  getFilmCharacters: (ids: number[] | string[]) => void;
  getCharacterById: (id: number | string) => void;
};

const usePeopleStore = create<PeopleState>((set) => ({
  people: [],
  filmCharacters: [],
  person: {},
  loading: {
    page: null,
    store: null,
    status: null
  },
  getFilmCharacters: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: "filmPage",
          store: "people",
          status: true
        }
      });

      const people = await Promise.all(
        ids?.map(async (id: string | number) => {
          const response = await fetch(
            `${BASE_API_URL}/${RESSOURCE.PEOPLE}/${id}`
          );

          const data = await response.json();
          const { name, url } = data;

          return {
            id: url.split("/").at(-2),
            name,
            url
          };
        })
      );

      set({
        filmCharacters: people,
        loading: {
          page: "filmPage",
          store: "people",
          status: false
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  getCharacterById: async (id: number | string) => {
    try {
      set({
        loading: {
          page: "characterPage",
          store: "people",
          status: true
        }
      });

      const response = await fetch(`${BASE_API_URL}/${RESSOURCE.PEOPLE}/${id}`);
      const data = await response.json();

      set({
        person: data,
        loading: {
          page: "characterPage",
          store: "people",
          status: false
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}));

export default usePeopleStore;
