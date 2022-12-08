import create from "zustand";
import { BASE_API_URL, RESSOURCE } from "@utils/constants";

type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

type PlanetName = Pick<Planet, "name" | "url"> & { id: string };

type PlanetsState = {
  planets: PlanetName[];
  filmPlanets: PlanetName[];
  loading: {
    page: "filmPage" | null;
    store: 'planet' | null;
    status: boolean | null;
  };
  getFilmPlanets: (ids: number[] | string[]) => void;
};

const usePlanetStore = create<PlanetsState>((set) => ({
  planets: [],
  filmPlanets: [],
  loading: {
    page: null,
    store: null,
    status: null
  },
  getFilmPlanets: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: "filmPage",
          store: 'planet',
          status: true
        }
      });

      const planets = await Promise.all(
        ids?.map(async (id: string | number) => {
          const response = await fetch(
            `${BASE_API_URL}/${RESSOURCE.PLANETS}/${id}`
          );

          const data = await response.json();
          const { name, url } = data;

          return {
            id: id.toString(),
            name,
            url
          };
        })
      );

      set({
        filmPlanets: planets,
        loading: {
          page: 'filmPage',
          store: 'planet',
          status: false
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}));

export default usePlanetStore;
