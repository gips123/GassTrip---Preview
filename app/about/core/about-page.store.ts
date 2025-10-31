// Zustand store untuk About page

import { create } from 'zustand';
import { aboutPageService } from './about-page.service';
import { AboutPageTransformed } from './about-page.model';

interface AboutPageState {
  aboutPage: AboutPageTransformed | null;
  
  loading: boolean;
  
  error: string | null;
  
  fetchAboutPage: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useAboutPageStore = create<AboutPageState>((set, get) => ({
  aboutPage: null,
  loading: false,
  error: null,
  
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
