"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const MENU_KEY = "SES-MENU";

export const useMenuStore = create(
  persist(
    (set) => ({
      categories: [],
      subCategories: [],
      brands: [],

      // SETTERS
      setCategories: (categories) => set({ categories }),
      setSubCategories: (subCategories) => set({ subCategories }),
      setBrands: (brands) => set({ brands }),

      // CLEAR ONLY MENU DATA
      clearMenu: () =>
        set({
          categories: [],
          subCategories: [],
          brands: [],
        }),
    }),
    {
      name: MENU_KEY,
      getStorage: () => localStorage,
    }
  )
);

// HOOK (For Components Only)
export const useMenu = () => ({
  categories: useMenuStore((state) => state.categories),
  subCategories: useMenuStore((state) => state.subCategories),
  brands: useMenuStore((state) => state.brands),

  setCategories: useMenuStore((state) => state.setCategories),
  setSubCategories: useMenuStore((state) => state.setSubCategories),
  setBrands: useMenuStore((state) => state.setBrands),
  clearMenu: useMenuStore((state) => state.clearMenu),
});

// SAFE ACTIONS (Usable Anywhere)
const actions = {
  setCategories: (c) => useMenuStore.getState().setCategories(c),
  setSubCategories: (s) => useMenuStore.getState().setSubCategories(s),
  setBrands: (b) => useMenuStore.getState().setBrands(b),
  clearMenu: () => useMenuStore.getState().clearMenu(),
};

const $menu = { actions };
export default $menu;
