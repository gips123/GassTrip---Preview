// Zustand store untuk Contact page

import { create } from 'zustand';
import { contactPageService } from '../services/contact-page.service';
import { ContactPageTransformed } from '../models/contact-page.model';

interface ContactPageState {
  // Data
  contactPage: ContactPageTransformed | null;

  // Loading states
  loading: boolean;

  // Error states
  error: string | null;

  // Actions
  fetchContactPage: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

export const useContactPageStore = create<ContactPageState>((set, get) => ({
  // Initial state
  contactPage: null,
  loading: false,
  error: null,

  // Actions
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
      console.error('[ContactPageStore] Error fetching contact page:', error);
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
