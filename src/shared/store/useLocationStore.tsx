import { create } from "zustand";
import { Location } from "@/shared/types/location";
import { addLocation } from "@/features/add-location/api";
import { updateLocation } from "@/features/edit-location/api";
import { deleteLocation } from "@/features/delete-location/api";

interface LocationState {
  locations: Location[];
  setLocations: (locations: Location[]) => void;
  addLocation: (payload: Location) => void;
  updateLocation: (id: string, payload: Partial<Omit<Location, "id">>) => void;
  deleteLocation: (id: string) => void;
  getLocationById: (id: string) => Location | undefined;
}

export const useLocationStore = create<LocationState>()((set, get) => ({
  locations: [],

  // SetInitial Location
  setLocations: async (locations) => {
    set(() => ({ locations }));
  },

  // Add Location - API ile veri ekleme
  addLocation: async (payload) => {
    const res = await addLocation({ payload });

    if (res.success) {
      const newLocation = await res.data;
      set((state) => ({
        locations: [...state.locations, newLocation],
      }));
    } else {
      console.error("Failed to add location");
    }
  },

  // Update Location - API ile veri güncelleme
  updateLocation: async (id, payload) => {
    const res = await updateLocation({ id, payload });

    if (res.success) {
      const updated = await res.data;
      set((state) => ({
        locations: state.locations.map((location) =>
          location.id === id ? updated : location
        ),
      }));
    } else {
      console.error("Failed to update location");
    }
  },

  // Delete Location - API ile veri silme
  deleteLocation: async (id) => {
    const res = await deleteLocation({ id });

    if (res.success) {
      set((state) => ({
        locations: state.locations.filter((location) => location.id !== id),
      }));
    } else {
      console.error("Failed to delete location");
    }
  },

  // Get Location By Id
  getLocationById: (id) => {
    return get().locations.find((location) => location.id === id);
  },
}));
