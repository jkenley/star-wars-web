import create from "zustand";
import { BASE_API_URL, RESSOURCE } from "@utils/constants";

type Pilot = {
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

type PilotName = Pick<Pilot, "name" | "url">;
type PilotNameWithId = PilotName & { id: string };

type PilotsState = {
  count: number;
  pilots: PilotNameWithId[];
  pilot: object;
  loading: boolean | null;
  getPilotNamesById: (ids: number[]) => void;
  getOnePilot: (id: number) => void;
};

const usePilotsStore = create<PilotsState>((set) => ({
  count: 0,
  pilots: [],
  pilot: {},
  loading: null,
  getPilotNamesById: async (ids: number[]) => {
    try {
      set({
        loading: true
      });

      const pilots = await Promise.all(
        ids?.map(async (id) => {
          const response = await fetch(
            `${BASE_API_URL}/${RESSOURCE.PEOPLE}/${id}`
          );

          const data = await response.json();

          const pilotObj = {
            id: data.url.split("/").at(-2),
            name: data.name,
            url: data.url
          };

          return pilotObj;
        })
      );

      set({
        pilots,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  },
  getOnePilot: async (id: number) => {
    try {
      set({
        loading: true
      });

      const response = await fetch(`${BASE_API_URL}/${RESSOURCE.PEOPLE}/${id}`);
      const data = await response.json();

      set({
        pilot: data,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  }
}));

export default usePilotsStore;
