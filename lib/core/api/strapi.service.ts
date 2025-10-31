import { strapiClient } from './strapi.client';

export class StrapiService {
  
  static async getAboutPageData() {
    try {
      const [aboutHeroResponse, logoResponse, featuredResponse, visionMissionResponse] = await Promise.all([
        strapiClient.get<any>('/about?populate[AboutHero][populate]=*'),
        strapiClient.get<any>('/about?populate[Logo][populate]=*'),
        strapiClient.get<any>('/about?populate[Featured][populate]=*'),
        strapiClient.get<any>('/about?populate[VissionMission][populate]=*')
      ]);
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

      return mergedData;
      
    } catch (error) {
      throw new Error(`Failed to fetch about page data: ${error}`);
    }
  }

  static async getHomePageData() {
    try {
      const [homeHeroResponse, homeFeaturedResponse, testimonialsResponse, experienceResponse] = await Promise.all([
        strapiClient.get<any>('/home?populate[HomeHero][populate]=*'),
        strapiClient.get<any>('/home?populate[HomeFeatured][populate]=*'),
        strapiClient.get<any>('/home?populate[Testimonials][populate]=*'),
        strapiClient.get<any>('/home?populate[Experience][populate]=*')
      ]);
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

      return mergedData;
      
    } catch (error) {
      throw new Error(`Failed to fetch home page data: ${error}`);
    }
  }

  static async getTourPackages() {
    try {
      const response = await strapiClient.get<any>('/tour-packages?populate=*');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch tour packages data: ${error}`);
    }
  }

  static async getContactPageData() {
    try {
      const [contactHeroResponse, informationResponse] = await Promise.all([
        strapiClient.get<any>('/contact?populate[ContactHero][populate]=*'),
        strapiClient.get<any>('/contact?populate[Information][populate]=*')
      ]);
      const mergedData = {
        id: contactHeroResponse.data.id,
        documentId: contactHeroResponse.data.documentId,
        createdAt: contactHeroResponse.data.createdAt,
        updatedAt: contactHeroResponse.data.updatedAt,
        publishedAt: contactHeroResponse.data.publishedAt,
        ContactHero: contactHeroResponse.data.ContactHero,
        Information: informationResponse.data.Information
      };

      return mergedData;
      
    } catch (error) {
      throw new Error(`Failed to fetch contact page data: ${error}`);
    }
  }

  static async getPackagePageData() {
    try {
      const packageHeroResponse = await strapiClient.get<any>('/Package?populate[PackageHero][populate]=*');
      const mergedData = {
        id: packageHeroResponse.data.id,
        documentId: packageHeroResponse.data.documentId,
        createdAt: packageHeroResponse.data.createdAt,
        updatedAt: packageHeroResponse.data.updatedAt,
        publishedAt: packageHeroResponse.data.publishedAt,
        PackageHero: packageHeroResponse.data.PackageHero
      };

      return mergedData;
      
    } catch (error) {
      throw new Error(`Failed to fetch package page data: ${error}`);
    }
  }
}

export const strapiService = new StrapiService();
