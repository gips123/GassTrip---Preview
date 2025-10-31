import { create } from 'zustand';
import { homePageService } from './home-page.service';
import { HomePageTransformed } from './home-page.model';

interface HomePageState {
  homePage: HomePageTransformed | null;
  loading: boolean;
  error: string | null;
  fetchHomePage: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useHomePageStore = create<HomePageState>((set, get) => ({
  homePage: null,
  loading: false,
  error: null,
  
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


