import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  AuthState,
  AuthStateData,
  LoginResponseDto,
} from '@/features/auth/schemas';

const initialState = {
  accessTokenExpiresAtMs: null,
};

export const validateAuthIntegrity = (state: AuthStateData) =>
  !!(
    state.accessTokenExpiresAtMs &&
    Date.now() + 30 * 1000 < state.accessTokenExpiresAtMs
  );

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      hasHydrated: false,

      setHasHydrated: (v: boolean) => set({ hasHydrated: v }),

      login: (data: LoginResponseDto) =>
        set({
          accessTokenExpiresAtMs: data.accessTokenExpiresAtMs,
        }),

      logout: () => set(initialState),
    }),
    {
      name: 'auth-storage',

      partialize: (state) => ({
        accessTokenExpiresAtMs: state.accessTokenExpiresAtMs,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
