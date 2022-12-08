import create from "zustand";
import { BASE_API_URL, RESSOURCE } from "@utils/constants";

type Vehicle = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

type VehicleName = Pick<Vehicle, "name" | "url"> & { id: string };

type VehiclesState = {
  count: number;
  vehicles: Vehicle[];
  vehicle: Vehicle | {};
  loading: {
    page: "filmPage" | null;
    store: "vehicle";
    status: boolean | null;
  };
  filmVehicles: VehicleName[];
  getFilmVehicles?: (ids: number[] | string[]) => void;
};

const useVehiclesStore = create<VehiclesState>((set) => ({
  count: 0,
  vehicles: [],
  vehicle: {},
  loading: {
    page: null,
    store: null,
    status: null
  },
  filmVehicles: [],
  getFilmVehicles: async (ids: number[] | string[]) => {
    try {
      set({
        loading: {
          page: "filmPage",
          store: "vehicle",
          status: true
        }
      });

      const vehicles = await Promise.all(
        ids?.map(async (id: number | string) => {
          const response = await fetch(
            `${BASE_API_URL}/${RESSOURCE.VEHICLES}/${id}`
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
        filmVehicles: vehicles,
        loading: {
          page: "filmPage",
          store: "vehicle",
          status: false
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}));

export default useVehiclesStore;
