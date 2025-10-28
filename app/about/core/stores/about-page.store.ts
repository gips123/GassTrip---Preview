// Zustand store untuk About page

import { create } from 'zustand';
import { aboutPageService } from '../services/about-page.service';
import { AboutPageTransformed } from '../models/about-page.model';

interface AboutPageState {
  // Data
  aboutPage: AboutPageTransformed | null;
  
  // Loading states
  loading: boolean;
  
  // Error states
  error: string | null;
  
  // Actions
  fetchAboutPage: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useAboutPageStore = create<AboutPageState>((set, get) => ({
  // Initial state
  aboutPage: null,
  loading: false,
  error: null,
  
  // Actions
  fetchAboutPage: async () => {
    set({ loading: true, error: null });
    
    try {
      const aboutPage = await aboutPageService.getAboutPage();
      set({ 
        aboutPage, 
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('[AboutPageStore] Error fetching about page:', error);
      set({ 
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch about page data'
      });
    }
  },
  
  clearError: () => {
    set({ error: null });
  },
  
  reset: () => {
    set({ 
      aboutPage: null,
      loading: false,
      error: null
    });
  },
}));
