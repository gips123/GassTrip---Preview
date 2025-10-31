// Service untuk Paket Tour page - Strapi API

import { StrapiService } from '@/lib/core/api';
import { 
  PackagePageData, 
  PackagePageTransformed, 
  PackageHeroTransformed,
  PackageImageTransformed,
  StrapiResponse 
} from '../models/paket-tour.model';
import { 
  StrapiResponseSchema,
  PackagePageTransformedSchema,
  DirectDataSchema
} from '../schemas/paket-tour.schemas';

export class PackagePageService {
  
  // Helper function untuk debug response structure
  private debugResponse(response: any): void {
    console.log('[PackagePageService] Response type:', typeof response);
    console.log('[PackagePageService] Response keys:', Object.keys(response || {}));
    console.log('[PackagePageService] Has data property:', 'data' in (response || {}));
    console.log('[PackagePageService] Has meta property:', 'meta' in (response || {}));
    console.log('[PackagePageService] Has id property:', 'id' in (response || {}));
    console.log('[PackagePageService] Has PackageHero property:', 'PackageHero' in (response || {}));
    
    if (response?.data) {
      console.log('[PackagePageService] Data keys:', Object.keys(response.data || {}));
      console.log('[PackagePageService] Data has PackageHero:', 'PackageHero' in (response.data || {}));
    }
  }
  
  // Get Package page data dari Strapi
  async getPackagePage(): Promise<PackagePageTransformed> {
    try {
      // Use StrapiService from lib/core/api
      const mergedData = await StrapiService.getPackagePageData();

      console.log('[PackagePageService] Merged response:', mergedData);
      this.debugResponse({ data: mergedData });
      
      // Check if response has the expected structure
      if (!mergedData || typeof mergedData !== 'object') {
        console.warn('[PackagePageService] Invalid response structure, using dummy data');
        return this.getDummyPackagePage();
      }
      
      // Process merged data directly (no data/meta wrapper)
      console.log('[PackagePageService] Processing merged data directly');
      try {
        const validatedData = DirectDataSchema.parse(mergedData);
        const transformedData = this.transformPackagePageData(validatedData);
        const validatedTransformedData = PackagePageTransformedSchema.parse(transformedData);
        return validatedTransformedData;
      } catch (validationError) {
        console.error('[PackagePageService] Merged data validation failed:', validationError);
        throw new Error(`Package page merged data validation failed: ${validationError}`);
      }
      
    } catch (error) {
      console.error('[PackagePageService] Error fetching package page:', error);
      throw new Error(`Failed to fetch package page data: ${error}`);
    }
  }
  
  // Transform Strapi data ke format frontend
  private transformPackagePageData(data: PackagePageData): PackagePageTransformed {
    return {
      id: data.id,
      hero: this.transformHero(data.PackageHero),
    };
  }
  
  private transformHero(hero: any): PackageHeroTransformed {
    // Transform background images from PackageHero.Background
    let backgroundImages: PackageImageTransformed[] = [];
    if (hero.Background && hero.Background.length > 0) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      
      backgroundImages = hero.Background.map((background: any) => ({
        url: background.url.startsWith('http') ? background.url : `${baseUrl}${background.url}`,
        alt: background.alternativeText || background.name || 'Background image',
        formats: {
          thumbnail: background.formats.thumbnail.url.startsWith('http') ? background.formats.thumbnail.url : `${baseUrl}${background.formats.thumbnail.url}`,
          medium: background.formats.medium.url.startsWith('http') ? background.formats.medium.url : `${baseUrl}${background.formats.medium.url}`,
          small: background.formats.small.url.startsWith('http') ? background.formats.small.url : `${baseUrl}${background.formats.small.url}`,
          large: background.formats.large.url.startsWith('http') ? background.formats.large.url : `${baseUrl}${background.formats.large.url}`,
        }
      }));
    }
    
    return {
      id: hero.id,
      title: hero.Title,
      description: hero.Description,
      backgroundImages
    };
  }
  
  // Dummy data fallback
  private getDummyPackagePage(): PackagePageTransformed {
    console.warn('[PackagePageService] Using dummy data for package page');
    return {
      id: 1,
      hero: {
        id: 1,
        title: 'Paket Tour',
        description: 'Jelajahi destinasi menakjubkan dengan paket wisata pilihan kami. Nikmati pengalaman perjalanan yang tak terlupakan dengan harga terbaik dan layanan berkualitas.',
        backgroundImages: [
          {
            url: '/pantai.jpg',
            alt: 'Tropical Island Paradise',
            formats: {
              thumbnail: '/pantai.jpg',
              medium: '/pantai.jpg',
              small: '/pantai.jpg',
              large: '/pantai.jpg',
            }
          }
        ]
      }
    };
  }
}

export const packagePageService = new PackagePageService();
