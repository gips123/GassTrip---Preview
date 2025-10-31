'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { packagePageService } from './paket-tour.service';
import { 
  PackagePageState, 
  PackagePageActions, 
  PackagePageTransformed 
} from './paket-tour.model';

interface PackagePageStore extends PackagePageState, PackagePageActions {}

export const usePackagePageStore = create<PackagePageStore>()(
  devtools(
    (set, get) => ({
      packagePage: null,
      loading: false,
      error: null,

      fetchPackagePage: async () => {
        try {
          set({ loading: true, error: null });
          const packagePage = await packagePageService.getPackagePage();
          set({ packagePage, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch package page data',
            loading: false 
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      setPackagePage: (packagePage: PackagePageTransformed | null) => {
        set({ packagePage });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'package-page-store',
    }
  )
);

export const usePackagePage = () => usePackagePageStore((state) => state.packagePage);
export const usePackagePageLoading = () => usePackagePageStore((state) => state.loading);
export const usePackagePageError = () => usePackagePageStore((state) => state.error);
export const usePackagePageActions = () => usePackagePageStore((state) => ({
  fetchPackagePage: state.fetchPackagePage,
  clearError: state.clearError,
  setLoading: state.setLoading,
  setPackagePage: state.setPackagePage,
  setError: state.setError,
}));
