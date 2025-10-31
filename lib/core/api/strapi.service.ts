// Strapi API Service Methods
// Business logic layer untuk Strapi API calls

import { strapiClient } from './strapi.client';

export class StrapiService {
  
  // About Page API Methods
  static async getAboutPageData() {
    try {
      // Multiple API calls for Strapi v5 - each component needs specific populate
      const [aboutHeroResponse, logoResponse, featuredResponse, visionMissionResponse] = await Promise.all([
        strapiClient.get<any>('/about?populate[AboutHero][populate]=*'),
        strapiClient.get<any>('/about?populate[Logo][populate]=*'),
        strapiClient.get<any>('/about?populate[Featured][populate]=*'),
        strapiClient.get<any>('/about?populate[VissionMission][populate]=*')
      ]);

      // Merge all responses into one data object
      const mergedData = {
        id: aboutHeroResponse.data.id,
        documentId: aboutHeroResponse.data.documentId,
        createdAt: aboutHeroResponse.data.createdAt,
        updatedAt: aboutHeroResponse.data.updatedAt,
        publishedAt: aboutHeroResponse.data.publishedAt,
        AboutHero: aboutHeroResponse.data.AboutHero,
        Logo: logoResponse.data.Logo,
        Featured: featuredResponse.data.Featured,
        VissionMission: visionMissionResponse.data.VissionMission
      };

      console.log('[StrapiService] About page data merged successfully');
      return mergedData;
      
    } catch (error) {
      console.error('[StrapiService] Error fetching about page data:', error);
      throw new Error(`Failed to fetch about page data: ${error}`);
    }
  }

  // Home Page API Methods
  static async getHomePageData() {
    try {
      // Multiple API calls for Strapi v5 - each component needs specific populate
      const [homeHeroResponse, homeFeaturedResponse, testimonialsResponse, experienceResponse] = await Promise.all([
        strapiClient.get<any>('/home?populate[HomeHero][populate]=*'),
        strapiClient.get<any>('/home?populate[HomeFeatured][populate]=*'),
        strapiClient.get<any>('/home?populate[Testimonials][populate]=*'),
        strapiClient.get<any>('/home?populate[Experience][populate]=*')
      ]);

      // Merge all responses into one data object
      const mergedData = {
        id: homeHeroResponse.data.id,
        documentId: homeHeroResponse.data.documentId,
        createdAt: homeHeroResponse.data.createdAt,
        updatedAt: homeHeroResponse.data.updatedAt,
        publishedAt: homeHeroResponse.data.publishedAt,
        HomeHero: homeHeroResponse.data.HomeHero,
        HomeFeatured: homeFeaturedResponse.data.HomeFeatured,
        Testimonials: testimonialsResponse.data.Testimonials,
        Experience: experienceResponse.data.Experience
      };

      console.log('[StrapiService] Home page data merged successfully');
      return mergedData;
      
    } catch (error) {
      console.error('[StrapiService] Error fetching home page data:', error);
      throw new Error(`Failed to fetch home page data: ${error}`);
    }
  }

  // Tour Packages API Methods
  static async getTourPackages() {
    try {
      const response = await strapiClient.get<any>('/tour-packages?populate=*');
      console.log('[StrapiService] Tour packages data fetched successfully');
      return response.data;
    } catch (error) {
      console.error('[StrapiService] Error fetching tour packages data:', error);
      throw new Error(`Failed to fetch tour packages data: ${error}`);
    }
  }

  // Contact Page API Methods
  static async getContactPageData() {
    try {
      // Multiple API calls for Strapi v5 - each component needs specific populate
      const [contactHeroResponse, informationResponse] = await Promise.all([
        strapiClient.get<any>('/contact?populate[ContactHero][populate]=*'),
        strapiClient.get<any>('/contact?populate[Information][populate]=*')
      ]);

      // Merge all responses into one data object
      const mergedData = {
        id: contactHeroResponse.data.id,
        documentId: contactHeroResponse.data.documentId,
        createdAt: contactHeroResponse.data.createdAt,
        updatedAt: contactHeroResponse.data.updatedAt,
        publishedAt: contactHeroResponse.data.publishedAt,
        ContactHero: contactHeroResponse.data.ContactHero,
        Information: informationResponse.data.Information
      };

      console.log('[StrapiService] Contact page data merged successfully');
      return mergedData;
      
    } catch (error) {
      console.error('[StrapiService] Error fetching contact page data:', error);
      throw new Error(`Failed to fetch contact page data: ${error}`);
    }
  }

  // Package Page API Methods
  static async getPackagePageData() {
    try {
      // Single API call for Package page
      const packageHeroResponse = await strapiClient.get<any>('/Package?populate[PackageHero][populate]=*');

      // Return the data directly (no merging needed for single call)
      const mergedData = {
        id: packageHeroResponse.data.id,
        documentId: packageHeroResponse.data.documentId,
        createdAt: packageHeroResponse.data.createdAt,
        updatedAt: packageHeroResponse.data.updatedAt,
        publishedAt: packageHeroResponse.data.publishedAt,
        PackageHero: packageHeroResponse.data.PackageHero
      };

      console.log('[StrapiService] Package page data fetched successfully');
      return mergedData;
      
    } catch (error) {
      console.error('[StrapiService] Error fetching package page data:', error);
      throw new Error(`Failed to fetch package page data: ${error}`);
    }
  }
}

// Export service instance
export const strapiService = new StrapiService();
