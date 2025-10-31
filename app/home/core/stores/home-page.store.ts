// Zustand store untuk Home page

import { create } from 'zustand';
import { homePageService } from '../services/home-page.service';
import { HomePageTransformed } from '../models/home-page.model';

interface HomePageState {
  // Data
  homePage: HomePageTransformed | null;
  
  // Loading states
  loading: boolean;
  
  // Error states
  error: string | null;
  
  // Actions
  fetchHomePage: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useHomePageStore = create<HomePageState>((set, get) => ({
  // Initial state
  homePage: null,
  loading: false,
  error: null,
  
  // Actions
  fetchHomePage: async () => {
    set({ loading: true, error: null });
    
    try {
      const homePage = await homePageService.getHomePage();
      set({ 
        homePage, 
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('[HomePageStore] Error fetching home page:', error);
      set({ 
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch home page data'
      });
    }
  },
  
  clearError: () => {
    set({ error: null });
  },
  
  reset: () => {
    set({ 
      homePage: null,
      loading: false,
      error: null
    });
  },
}));


