import create from "zustand";
import { BASE_API_URL, RESSOURCE } from "@utils/constants";

type Species = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

type SpeciesName = Pick<Species, "name" | "url"> & { id: string };

type SpeciesState = {
  count: number;
  species: Species[];
  filmSpecies: SpeciesName[];
  loading: {
    page: "filmPage" | null;
    store: "species";
    status: boolean | null;
  };
  getFilmSpecies?: (ids: number[] | string[]) => void;
};

const useSpeciesStore = create<SpeciesState>((set) => ({
  count: 0,
  species: [],
  filmSpecies: [],
  loading: {
    page: null,
    store: null,
    status: null
  },
  getFilmSpecies: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: "filmPage",
          store: "species",
          status: true
        }
      });

      const species = await Promise.all(
        ids?.map(async (id: string | number) => {
          const response = await fetch(
            `${BASE_API_URL}/${RESSOURCE.SPECIES}/${id}`
          );

          const data = await response.json();
          const { url, name } = data;

          return {
            id: url.split("/").at(-2),
            name,
            url
          };
        })
      );

      set({
        filmSpecies: species,
        loading: {
          page: "filmPage",
          store: "species",
          status: false
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}));

export default useSpeciesStore;
