// Service untuk About page - Strapi API

import { StrapiService } from '@/lib/core/api';
import { 
  AboutPageData, 
  AboutPageTransformed, 
  AboutHeroTransformed,
  AboutFeaturedTransformed,
  AboutVisionMissionTransformed,
  StrapiResponse 
} from '../models/about-page.model';
import { 
  StrapiResponseSchema,
  AboutPageTransformedSchema,
  DirectDataSchema
} from '../schemas/about-page.schemas';

export class AboutPageService {
  
  // Helper function untuk debug response structure
  private debugResponse(response: any): void {
    console.log('[AboutPageService] Response type:', typeof response);
    console.log('[AboutPageService] Response keys:', Object.keys(response || {}));
    console.log('[AboutPageService] Has data property:', 'data' in (response || {}));
    console.log('[AboutPageService] Has meta property:', 'meta' in (response || {}));
    console.log('[AboutPageService] Has id property:', 'id' in (response || {}));
    console.log('[AboutPageService] Has AboutHero property:', 'AboutHero' in (response || {}));
    
    if (response?.data) {
      console.log('[AboutPageService] Data keys:', Object.keys(response.data || {}));
      console.log('[AboutPageService] Data has AboutHero:', 'AboutHero' in (response.data || {}));
      console.log('[AboutPageService] Data has Logo:', 'Logo' in (response.data || {}));
      console.log('[AboutPageService] Data has Featured:', 'Featured' in (response.data || {}));
      console.log('[AboutPageService] Data has VissionMission:', 'VissionMission' in (response.data || {}));
    }
  }
  
  // Get About page data dari Strapi
  async getAboutPage(): Promise<AboutPageTransformed> {
    try {
      // Use StrapiService from lib/core/api
      const mergedData = await StrapiService.getAboutPageData();

      console.log('[AboutPageService] Merged response:', mergedData);
      this.debugResponse({ data: mergedData });
      
      // Check if response has the expected structure
      if (!mergedData || typeof mergedData !== 'object') {
        console.warn('[AboutPageService] Invalid response structure, using dummy data');
        return this.getDummyAboutPage();
      }
      
      // Process merged data directly (no data/meta wrapper)
      console.log('[AboutPageService] Processing merged data directly');
      try {
        const validatedData = DirectDataSchema.parse(mergedData);
        const transformedData = this.transformAboutPageData(validatedData);
        const validatedTransformedData = AboutPageTransformedSchema.parse(transformedData);
        return validatedTransformedData;
      } catch (validationError) {
        console.error('[AboutPageService] Merged data validation failed:', validationError);
        throw new Error(`About page merged data validation failed: ${validationError}`);
      }
      
    } catch (error) {
      console.error('[AboutPageService] Error fetching about page:', error);
      throw new Error(`Failed to fetch about page data: ${error}`);
    }
  }
  
  // Transform Strapi data ke format frontend
  private transformAboutPageData(data: AboutPageData): AboutPageTransformed {
    return {
      id: data.id,
      hero: this.transformHero(data.AboutHero),
      logo: this.transformLogo(data.Logo),
      featured: data.Featured.map(item => this.transformFeatured(item)),
      visionMission: this.transformVisionMission(data.VissionMission),
      background: this.transformBackgroundFromHero(data.AboutHero)
    };
  }
  
  private transformHero(hero: any): AboutHeroTransformed {
    // Transform background image from AboutHero.Background
    let backgroundImage = undefined;
    if (hero.Background && hero.Background.length > 0) {
      const background = hero.Background[0];
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      const imageUrl = background.url.startsWith('http') ? background.url : `${baseUrl}${background.url}`;
      
      backgroundImage = {
        url: imageUrl,
        alt: background.alternativeText || background.name || 'Background image'
      };
    }
    
    return {
      id: hero.id,
      title: hero.Title,
      description: hero.Description,
      backgroundImage
    };
  }
  
  private transformLogo(logo: any): any {
    // Add Strapi base URL prefix
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const imageUrl = logo.url.startsWith('http') ? logo.url : `${baseUrl}${logo.url}`;
    
    return {
      id: logo.id,
      url: imageUrl,
      alt: logo.alternativeText || logo.name,
      formats: {
        thumbnail: logo.formats.thumbnail.url.startsWith('http') ? logo.formats.thumbnail.url : `${baseUrl}${logo.formats.thumbnail.url}`,
        medium: logo.formats.medium.url.startsWith('http') ? logo.formats.medium.url : `${baseUrl}${logo.formats.medium.url}`,
        small: logo.formats.small.url.startsWith('http') ? logo.formats.small.url : `${baseUrl}${logo.formats.small.url}`,
        large: logo.formats.large.url.startsWith('http') ? logo.formats.large.url : `${baseUrl}${logo.formats.large.url}`
      }
    };
  }
  
  private transformFeatured(featured: any): AboutFeaturedTransformed {
    return {
      id: featured.id,
      title: featured.Title,
      description: featured.Description
    };
  }
  
  private transformVisionMission(visionMission: any): AboutVisionMissionTransformed {
    return {
      id: visionMission.id,
      title: visionMission.Title,
      vision: visionMission.Vission,
      missions: visionMission.Mission ? visionMission.Mission.map((mission: any) => ({
        id: mission.id,
        title: mission.Title,
        description: mission.Description
      })) : undefined
    };
  }
  
  private transformBackgroundFromHero(hero: any): { url: string; alt: string } {
    // Use background image from AboutHero.Background
    if (hero.Background && hero.Background.length > 0) {
      const background = hero.Background[0];
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      const imageUrl = background.url.startsWith('http') ? background.url : `${baseUrl}${background.url}`;
      
      return {
        url: imageUrl,
        alt: background.alternativeText || background.name || 'Background image'
      };
    }
    
    // Fallback to default
    return {
      url: '/mk.jpg',
      alt: 'Default background image'
    };
  }
  
  // No dummy data - force API usage
  private getDummyAboutPage(): AboutPageTransformed {
    console.error('[AboutPageService] CRITICAL: No dummy data available - API data is required!');
    throw new Error('About page data is not available from API');
  }
}

export const aboutPageService = new AboutPageService();
