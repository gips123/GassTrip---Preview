// Service untuk About page - Strapi API

import { StrapiService } from '@/lib/core/api';
import { transformImageUrl } from '@/lib/utils/image-url';
import { 
  AboutPageData, 
  AboutPageTransformed, 
  AboutHeroTransformed,
  AboutFeaturedTransformed,
  AboutVisionMissionTransformed,
  StrapiResponse 
} from './about-page.model';
import { 
  StrapiResponseSchema,
  AboutPageTransformedSchema,
  DirectDataSchema
} from './about-page.schemas';

export class AboutPageService {
  
  private debugResponse(_response: any): void {}
  
  async getAboutPage(): Promise<AboutPageTransformed> {
    try {
      const mergedData = await StrapiService.getAboutPageData();

      this.debugResponse({ data: mergedData });
      
      if (!mergedData || typeof mergedData !== 'object') {
        console.warn('[AboutPageService] Invalid response structure, using dummy data');
        return this.getDummyAboutPage();
      }
      
      try {
        const validatedData = DirectDataSchema.parse(mergedData);
        const transformedData = this.transformAboutPageData(validatedData);
        const validatedTransformedData = AboutPageTransformedSchema.parse(transformedData);
        return validatedTransformedData;
      } catch (validationError) {
        throw new Error(`About page merged data validation failed: ${validationError}`);
      }
      
    } catch (error) {
      throw new Error(`Failed to fetch about page data: ${error}`);
    }
  }
  
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
    let backgroundImage = undefined;
    if (hero.Background && hero.Background.length > 0) {
      const background = hero.Background[0];
      const imageUrl = transformImageUrl(background.url);
      
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
    return {
      id: logo.id,
      url: transformImageUrl(logo.url),
      alt: logo.alternativeText || logo.name,
      formats: {
        thumbnail: transformImageUrl(logo.formats.thumbnail.url),
        medium: transformImageUrl(logo.formats.medium.url),
        small: transformImageUrl(logo.formats.small.url),
        large: transformImageUrl(logo.formats.large.url)
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
      const imageUrl = transformImageUrl(background.url);
      
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
    throw new Error('About page data is not available from API');
  }
}

export const aboutPageService = new AboutPageService();
