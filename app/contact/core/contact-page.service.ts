import { StrapiService } from '@/lib/core/api';
import { 
  ContactPageData, 
  ContactPageTransformed, 
  ContactHeroTransformed,
  InformationTransformed,
  StrapiResponse 
} from './contact-page.model';
import { 
  StrapiResponseSchema,
  ContactPageTransformedSchema,
  DirectDataSchema
} from './contact-page.schemas';

export class ContactPageService {
  
  private debugResponse(_response: any): void {}
  
  async getContactPage(): Promise<ContactPageTransformed> {
    try {
      const mergedData = await StrapiService.getContactPageData();

      this.debugResponse({ data: mergedData });
      
      if (!mergedData || typeof mergedData !== 'object') {
        console.warn('[ContactPageService] Invalid response structure, using dummy data');
        return this.getDummyContactPage();
      }
      
      try {
        const validatedData = DirectDataSchema.parse(mergedData as any);
        const transformedData = this.transformContactPageData(validatedData);
        const validatedTransformedData = ContactPageTransformedSchema.parse(transformedData);
        return validatedTransformedData;
      } catch (validationError) {
        throw new Error(`Contact page merged data validation failed: ${validationError}`);
      }
      
    } catch (error) {
      throw new Error(`Failed to fetch contact page data: ${error}`);
    }
  }
  
  private transformContactPageData(data: ContactPageData): ContactPageTransformed {
    return {
      id: data.id,
      hero: this.transformHero(data.ContactHero),
      information: data.Information.map(item => this.transformInformation(item)),
      background: this.transformBackgroundFromHero(data.ContactHero)
    };
  }
  
  private transformHero(hero: any): ContactHeroTransformed {
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
    if (hero.Background && hero.Background.length > 0) {
      const background = hero.Background[0];
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      const imageUrl = background.url.startsWith('http') ? background.url : `${baseUrl}${background.url}`;
      
      return {
        url: imageUrl,
        alt: background.alternativeText || background.name || 'Background image'
      };
    }
    
    return {
      url: '/bromo.jpg',
      alt: 'Default background image'
    };
  }
  
  private getDummyContactPage(): ContactPageTransformed {
    throw new Error('Contact page data is not available from API');
  }
}

export const contactPageService = new ContactPageService();
