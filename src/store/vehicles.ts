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
  url: string
}

type VehicleTitle = Pick<Vehicle, "name" | "url">;
type VehicleNameWithId = VehicleTitle & { id: string };

type VehiclesState = {
  count: number;
  vehicles: VehicleNameWithId[];
  vehicle: object;
  loading: boolean | null;
  getVehicleNameById: (ids: number[]) => void;
  getOneVehicle: (id: number) => void;
};

const useVehiclesStore = create<VehiclesState>((set) => ({
  count: 0,
  vehicles: [],
  vehicle: {},
  loading: null,
  getVehicleNameById: async (ids: number[]) => {

    try {
      set({
        loading: true
      });

      const vehicles = await Promise.all(
        ids?.map(async (id) => {
          const response = await fetch(
            `${BASE_API_URL}/${RESSOURCE.VEHICLES}/${id}`
          );

          const data = await response.json();

          const vehicleObj = {
            id: data.url.split("/").at(-2),
            name: data.name,
            url: data.url
          };

          return vehicleObj;
        })
      );

      set({
        vehicles,
        loading: false
      });
    } catch (error) {
      console.error(error);
    }
  },

  getOneVehicle: async (id: number) => {
    try {
      set({
        loading: true
      });

      const response = await fetch(`${BASE_API_URL}/${RESSOURCE.VEHICLES}/${id}`);

      const data = await response.json();

      set({
        vehicle: data,
        loading: false
      });
    } catch (error) {
      console.error(error);
    }
  }

}));

export default useVehiclesStore;
