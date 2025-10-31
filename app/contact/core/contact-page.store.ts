import { create } from 'zustand';
import { contactPageService } from './contact-page.service';
import { ContactPageTransformed } from './contact-page.model';

interface ContactPageState {
  contactPage: ContactPageTransformed | null;
  loading: boolean;
  error: string | null;
  fetchContactPage: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useContactPageStore = create<ContactPageState>((set, get) => ({
  contactPage: null,
  loading: false,
  error: null,

  fetchContactPage: async () => {
    set({ loading: true, error: null });

    try {
      const contactPage = await contactPageService.getContactPage();
      set({
        contactPage,
        loading: false,
        error: null
      });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch contact page data'
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },

  reset: () => {
    set({
      contactPage: null,
      loading: false,
      error: null
    });
  }
}));
