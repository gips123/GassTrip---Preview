// Store untuk Paket Tour page state management

'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { packagePageService } from '../services/paket-tour.service';
import { 
  PackagePageState, 
  PackagePageActions, 
  PackagePageTransformed 
} from '../models/paket-tour.model';

// Combined store interface
interface PackagePageStore extends PackagePageState, PackagePageActions {}

// Create the store
export const usePackagePageStore = create<PackagePageStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      packagePage: null,
      loading: false,
      error: null,

      // Actions
      fetchPackagePage: async () => {
        try {
          set({ loading: true, error: null });
          console.log('[PackagePageStore] Fetching package page data...');
          
          const packagePage = await packagePageService.getPackagePage();
          
          console.log('[PackagePageStore] Package page data fetched successfully:', packagePage);
          set({ packagePage, loading: false });
        } catch (error) {
          console.error('[PackagePageStore] Error fetching package page:', error);
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

// Export individual selectors for better performance
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
