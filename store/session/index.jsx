"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "SES-SESSION";

// -------------------- STORE --------------------
export const useSessionStore = create(
  persist(
    (set) => ({
      token: null,
      id: null,
      user: null,
      isAuthenticated: false,

      setSession: ({ token, id, user }) => {
        set({ token, id, user, isAuthenticated: true })
      },

      setUserId: (id) => set({ id }),

      setIsAuthenticated: (value) => set({ isAuthenticated: value }),

      setUser: (user) => set((state) => ({ ...state, user })),

      clearSession: () =>
        set({
          token: null,
          id: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: STORAGE_KEY,
      getStorage: () => localStorage,
    }
  )
);

// -------------------- HOOK (COMPONENTS ONLY) --------------------
export const useSession = () => ({
  token: useSessionStore((state) => state.token),
  id: useSessionStore((state) => state.id),
  user: useSessionStore((state) => state.user),
  isAuthenticated: useSessionStore((state) => state.isAuthenticated),

  setSession: useSessionStore((state) => state.setSession),
  setUserId: useSessionStore((state) => state.setUserId),
  setUser: useSessionStore((state) => state.setUser),
  setIsAuthenticated: useSessionStore((state) => state.setIsAuthenticated),
  clearSession: useSessionStore((state) => state.clearSession),
});

// -------------------- ACTIONS (SAFE ANYWHERE) --------------------
const actions = {
  setSession: (data) => useSessionStore.getState().setSession(data),
  setUserId: (id) => useSessionStore.getState().setUserId(id),
  setIsAuthenticated: (v) => useSessionStore.getState().setIsAuthenticated(v),
  clearSession: () => useSessionStore.getState().clearSession(),
  setUser: (user) => useSessionStore.getState().setUser(user),
};

// -------------------- EXPORT --------------------
const $session = {
  actions,
};

export default $session;
