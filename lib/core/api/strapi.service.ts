import { strapiClient } from './strapi.client';
import { fakeDbClient } from './fakedb.client';

// Check if we should use fake db (production/preview or no Strapi URL)
const shouldUseFakeDb = () => {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const isVercel = process.env.VERCEL === '1';
  
  // Use fake db if:
  // 1. We're in Vercel (preview/production)
  // 2. No Strapi URL is configured
  // 3. Strapi URL is localhost (not accessible in production)
  if (isVercel) return true;
  if (!strapiUrl) return true;
  if (strapiUrl.includes('localhost') || strapiUrl.includes('127.0.0.1')) return true;
  
  return false;
};

export class StrapiService {
  
  static async getAboutPageData() {
    try {
      if (shouldUseFakeDb()) {
        // Use fake db
        const [aboutHeroResponse, logoResponse, featuredResponse, visionMissionResponse] = await Promise.all([
          fakeDbClient.get('/about?populate[AboutHero][populate]=*'),
          fakeDbClient.get('/about?populate[Logo][populate]=*'),
          fakeDbClient.get('/about?populate[Featured][populate]=*'),
          fakeDbClient.get('/about?populate[VissionMission][populate]=*')
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
      }

      // Try to fetch from Strapi API
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
      // Fallback to fake db if API call fails
      console.warn('Failed to fetch from Strapi, falling back to fake db:', error);
      try {
        const [aboutHeroResponse, logoResponse, featuredResponse, visionMissionResponse] = await Promise.all([
          fakeDbClient.get('/about?populate[AboutHero][populate]=*'),
          fakeDbClient.get('/about?populate[Logo][populate]=*'),
          fakeDbClient.get('/about?populate[Featured][populate]=*'),
          fakeDbClient.get('/about?populate[VissionMission][populate]=*')
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
      } catch (fallbackError) {
        throw new Error(`Failed to fetch about page data: ${fallbackError}`);
      }
    }
  }

  static async getHomePageData() {
    try {
      if (shouldUseFakeDb()) {
        // Use fake db
        const [homeHeroResponse, homeFeaturedResponse, testimonialsResponse, experienceResponse] = await Promise.all([
          fakeDbClient.get('/home?populate[HomeHero][populate]=*'),
          fakeDbClient.get('/home?populate[HomeFeatured][populate]=*'),
          fakeDbClient.get('/home?populate[Testimonials][populate]=*'),
          fakeDbClient.get('/home?populate[Experience][populate]=*')
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
      }

      // Try to fetch from Strapi API
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
      // Fallback to fake db if API call fails
      console.warn('Failed to fetch from Strapi, falling back to fake db:', error);
      try {
        const [homeHeroResponse, homeFeaturedResponse, testimonialsResponse, experienceResponse] = await Promise.all([
          fakeDbClient.get('/home?populate[HomeHero][populate]=*'),
          fakeDbClient.get('/home?populate[HomeFeatured][populate]=*'),
          fakeDbClient.get('/home?populate[Testimonials][populate]=*'),
          fakeDbClient.get('/home?populate[Experience][populate]=*')
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
      } catch (fallbackError) {
        throw new Error(`Failed to fetch home page data: ${fallbackError}`);
      }
    }
  }

  static async getTourPackages() {
    try {
      if (shouldUseFakeDb()) {
        // Use fake db
        const response = await fakeDbClient.get('/tour-packages?populate=*');
        return response.data;
      }

      // Try to fetch from Strapi API
      const response = await strapiClient.get<any>('/tour-packages?populate=*');
      return response.data;
    } catch (error) {
      // Fallback to fake db if API call fails
      console.warn('Failed to fetch from Strapi, falling back to fake db:', error);
      try {
        const response = await fakeDbClient.get('/tour-packages?populate=*');
        return response.data;
      } catch (fallbackError) {
        throw new Error(`Failed to fetch tour packages data: ${fallbackError}`);
      }
    }
  }

  static async getContactPageData() {
    try {
      if (shouldUseFakeDb()) {
        // Use fake db
        const [contactHeroResponse, informationResponse] = await Promise.all([
          fakeDbClient.get('/contact?populate[ContactHero][populate]=*'),
          fakeDbClient.get('/contact?populate[Information][populate]=*')
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
      }

      // Try to fetch from Strapi API
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
      // Fallback to fake db if API call fails
      console.warn('Failed to fetch from Strapi, falling back to fake db:', error);
      try {
        const [contactHeroResponse, informationResponse] = await Promise.all([
          fakeDbClient.get('/contact?populate[ContactHero][populate]=*'),
          fakeDbClient.get('/contact?populate[Information][populate]=*')
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
      } catch (fallbackError) {
        throw new Error(`Failed to fetch contact page data: ${fallbackError}`);
      }
    }
  }

  static async getPackagePageData() {
    try {
      if (shouldUseFakeDb()) {
        // Use fake db
        const packageHeroResponse = await fakeDbClient.get('/Package?populate[PackageHero][populate]=*');
        const mergedData = {
          id: packageHeroResponse.data.id,
          documentId: packageHeroResponse.data.documentId,
          createdAt: packageHeroResponse.data.createdAt,
          updatedAt: packageHeroResponse.data.updatedAt,
          publishedAt: packageHeroResponse.data.publishedAt,
          PackageHero: packageHeroResponse.data.PackageHero
        };

        return mergedData;
      }

      // Try to fetch from Strapi API
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
      // Fallback to fake db if API call fails
      console.warn('Failed to fetch from Strapi, falling back to fake db:', error);
      try {
        const packageHeroResponse = await fakeDbClient.get('/Package?populate[PackageHero][populate]=*');
        const mergedData = {
          id: packageHeroResponse.data.id,
          documentId: packageHeroResponse.data.documentId,
          createdAt: packageHeroResponse.data.createdAt,
          updatedAt: packageHeroResponse.data.updatedAt,
          publishedAt: packageHeroResponse.data.publishedAt,
          PackageHero: packageHeroResponse.data.PackageHero
        };

        return mergedData;
      } catch (fallbackError) {
        throw new Error(`Failed to fetch package page data: ${fallbackError}`);
      }
    }
  }
}

export const strapiService = new StrapiService();
