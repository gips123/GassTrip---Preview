import { create } from 'zustand';
import { micePageService } from './mice-page.service';
import { MicePageTransformed } from './mice-page.model';

interface MicePageState {
  micePage: MicePageTransformed | null;
  loading: boolean;
  error: string | null;
  fetchMicePage: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useMicePageStore = create<MicePageState>((set) => ({
  micePage: null,
  loading: false,
  error: null,

  fetchMicePage: async () => {
    set({ loading: true, error: null });

    try {
      const micePage = await micePageService.getMicePage();
      set({ micePage, loading: false, error: null });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch MICE page data',
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  reset: () => {
    set({ micePage: null, loading: false, error: null });
  },
}));
