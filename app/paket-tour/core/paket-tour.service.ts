import { StrapiService } from '@/lib/core/api';
import { 
  PackagePageData, 
  PackagePageTransformed, 
  PackageHeroTransformed,
  PackageImageTransformed,
  StrapiResponse 
} from './paket-tour.model';
import { 
  StrapiResponseSchema,
  PackagePageTransformedSchema,
  DirectDataSchema
} from './paket-tour.schemas';

export class PackagePageService {
  
  private debugResponse(_response: any): void {}
  
  async getPackagePage(): Promise<PackagePageTransformed> {
    try {
      const mergedData = await StrapiService.getPackagePageData();

      this.debugResponse({ data: mergedData });
      
      if (!mergedData || typeof mergedData !== 'object') {
        console.warn('[PackagePageService] Invalid response structure, using dummy data');
        return this.getDummyPackagePage();
      }
      
      try {
        const validatedData = DirectDataSchema.parse(mergedData);
        const transformedData = this.transformPackagePageData(validatedData);
        const validatedTransformedData = PackagePageTransformedSchema.parse(transformedData);
        return validatedTransformedData;
      } catch (validationError) {
        throw new Error(`Package page merged data validation failed: ${validationError}`);
      }
      
    } catch (error) {
      throw new Error(`Failed to fetch package page data: ${error}`);
    }
  }
  
  private transformPackagePageData(data: PackagePageData): PackagePageTransformed {
    return {
      id: data.id,
      hero: this.transformHero(data.PackageHero),
    };
  }
  
  private transformHero(hero: any): PackageHeroTransformed {
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
