// Service untuk Contact page - Strapi API

import { StrapiService } from '@/lib/core/api';
import { 
  ContactPageData, 
  ContactPageTransformed, 
  ContactHeroTransformed,
  InformationTransformed,
  StrapiResponse 
} from '../models/contact-page.model';
import { 
  StrapiResponseSchema,
  ContactPageTransformedSchema,
  DirectDataSchema
} from '../schemas/contact-page.schemas';

export class ContactPageService {
  
  // Helper function untuk debug response structure
  private debugResponse(response: any): void {
    console.log('[ContactPageService] Response type:', typeof response);
    console.log('[ContactPageService] Response keys:', Object.keys(response || {}));
    console.log('[ContactPageService] Has data property:', 'data' in (response || {}));
    console.log('[ContactPageService] Has meta property:', 'meta' in (response || {}));
    console.log('[ContactPageService] Has id property:', 'id' in (response || {}));
    console.log('[ContactPageService] Has ContactHero property:', 'ContactHero' in (response || {}));
    
    if (response?.data) {
      console.log('[ContactPageService] Data keys:', Object.keys(response.data || {}));
      console.log('[ContactPageService] Data has ContactHero:', 'ContactHero' in (response.data || {}));
      console.log('[ContactPageService] Data has Information:', 'Information' in (response.data || {}));
    }
  }
  
  // Get Contact page data dari Strapi
  async getContactPage(): Promise<ContactPageTransformed> {
    try {
      // Use StrapiService from lib/core/api
      const mergedData = await StrapiService.getContactPageData();

      console.log('[ContactPageService] Merged response:', mergedData);
      this.debugResponse({ data: mergedData });
      
      // Check if response has the expected structure
      if (!mergedData || typeof mergedData !== 'object') {
        console.warn('[ContactPageService] Invalid response structure, using dummy data');
        return this.getDummyContactPage();
      }
      
      // Process merged data directly (no data/meta wrapper)
      console.log('[ContactPageService] Processing merged data directly');
      try {
        const validatedData = DirectDataSchema.parse(mergedData as any);
        const transformedData = this.transformContactPageData(validatedData);
        const validatedTransformedData = ContactPageTransformedSchema.parse(transformedData);
        return validatedTransformedData;
      } catch (validationError) {
        console.error('[ContactPageService] Merged data validation failed:', validationError);
        throw new Error(`Contact page merged data validation failed: ${validationError}`);
      }
      
    } catch (error) {
      console.error('[ContactPageService] Error fetching contact page:', error);
      throw new Error(`Failed to fetch contact page data: ${error}`);
    }
  }
  
  // Transform Strapi data ke format frontend
  private transformContactPageData(data: ContactPageData): ContactPageTransformed {
    return {
      id: data.id,
      hero: this.transformHero(data.ContactHero),
      information: data.Information.map(item => this.transformInformation(item)),
      background: this.transformBackgroundFromHero(data.ContactHero)
    };
  }
  
  private transformHero(hero: any): ContactHeroTransformed {
    // Transform background image from ContactHero.Background
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
  
  private transformInformation(info: any): InformationTransformed {
    return {
      id: info.id,
      title: info.Title,
      description: info.Description,
      detailInformation: info.DetailInformation.map((detail: any) => this.transformDetailInformation(detail))
    };
  }
  
  private transformDetailInformation(detail: any): any {
    return {
      id: detail.id,
      title: detail.Title,
      description: detail.Description
    };
  }
  
  private transformBackgroundFromHero(hero: any): { url: string; alt: string } {
    // Use background image from ContactHero.Background
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
      url: '/bromo.jpg',
      alt: 'Default background image'
    };
  }
  
  // No dummy data - force API usage
  private getDummyContactPage(): ContactPageTransformed {
    console.error('[ContactPageService] CRITICAL: No dummy data available - API data is required!');
    throw new Error('Contact page data is not available from API');
  }
}

export const contactPageService = new ContactPageService();
