
import { StrapiService } from '@/lib/core/api';
import { 
  HomePageData, 
  HomePageTransformed, 
  HomeHeroTransformed,
  HomeFeaturedTransformed,
  HomeTestimonialsTransformed,
  HomeExperienceTransformed,
  StrapiResponse 
} from './home-page.model';
import { 
  StrapiResponseSchema,
  HomePageTransformedSchema,
  DirectDataSchema
} from './home-page.schemas';

export class HomePageService {
  
  private debugResponse(_response: any): void {}
  
  async getHomePage(): Promise<HomePageTransformed> {
    try {
      const mergedData = await StrapiService.getHomePageData();

      this.debugResponse({ data: mergedData });
      
      if (!mergedData || typeof mergedData !== 'object') {
        console.warn('[HomePageService] Invalid response structure, using dummy data');
        return this.getDummyHomePage();
      }
      
      try {
        const validatedData = DirectDataSchema.parse(mergedData);
        const transformedData = this.transformHomePageData(validatedData);
        const validatedTransformedData = HomePageTransformedSchema.parse(transformedData);
        return validatedTransformedData;
      } catch (validationError) {
        throw new Error(`Home page merged data validation failed: ${validationError}`);
      }
      
    } catch (error) {
      throw new Error(`Failed to fetch home page data: ${error}`);
    }
  }
  
  private transformHomePageData(data: HomePageData): HomePageTransformed {
    return {
      id: data.id,
      hero: this.transformHero(data.HomeHero),
      featured: data.HomeFeatured.map(item => this.transformFeatured(item)),
      testimonials: this.transformTestimonials(data.Testimonials),
      experience: this.transformExperience(data.Experience)
    };
  }
  
  private transformHero(hero: any): HomeHeroTransformed {
    let backgroundImages = undefined;
    if (hero.Background && hero.Background.length > 0) {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      
      backgroundImages = hero.Background.map((background: any) => ({
        url: background.url.startsWith('http') ? background.url : `${baseUrl}${background.url}`,
        alt: background.alternativeText || background.name || 'Background image'
      }));
    }
    
    return {
      id: hero.id,
      title: hero.Title,
      description: hero.Description,
      backgroundImages
    };
  }
  
  private transformFeatured(featured: any): HomeFeaturedTransformed {
    return {
      id: featured.id,
      title: featured.Title,
      description: featured.Description
    };
  }
  
  private transformTestimonials(testimonials: any): HomeTestimonialsTransformed {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    
    return {
      id: testimonials.id,
      title: testimonials.Title,
      description: testimonials.Description,
      logoName: testimonials.LogoName,
      logoText: testimonials.LogoText,
      logo: {
        url: testimonials.Logo.url.startsWith('http') ? testimonials.Logo.url : `${baseUrl}${testimonials.Logo.url}`,
        alt: testimonials.Logo.alternativeText || testimonials.Logo.name,
        formats: {
          thumbnail: testimonials.Logo.formats.thumbnail.url.startsWith('http') ? testimonials.Logo.formats.thumbnail.url : `${baseUrl}${testimonials.Logo.formats.thumbnail.url}`,
          medium: testimonials.Logo.formats.medium.url.startsWith('http') ? testimonials.Logo.formats.medium.url : `${baseUrl}${testimonials.Logo.formats.medium.url}`,
          small: testimonials.Logo.formats.small.url.startsWith('http') ? testimonials.Logo.formats.small.url : `${baseUrl}${testimonials.Logo.formats.small.url}`,
          large: testimonials.Logo.formats.large.url.startsWith('http') ? testimonials.Logo.formats.large.url : `${baseUrl}${testimonials.Logo.formats.large.url}`
        }
      },
      image: {
        url: testimonials.Image.url.startsWith('http') ? testimonials.Image.url : `${baseUrl}${testimonials.Image.url}`,
        alt: testimonials.Image.alternativeText || testimonials.Image.name,
        formats: {
          thumbnail: testimonials.Image.formats.thumbnail.url.startsWith('http') ? testimonials.Image.formats.thumbnail.url : `${baseUrl}${testimonials.Image.formats.thumbnail.url}`,
          medium: testimonials.Image.formats.medium.url.startsWith('http') ? testimonials.Image.formats.medium.url : `${baseUrl}${testimonials.Image.formats.medium.url}`,
          small: testimonials.Image.formats.small.url.startsWith('http') ? testimonials.Image.formats.small.url : `${baseUrl}${testimonials.Image.formats.small.url}`,
          large: testimonials.Image.formats.large.url.startsWith('http') ? testimonials.Image.formats.large.url : `${baseUrl}${testimonials.Image.formats.large.url}`
        }
      }
    };
  }
  
  private transformExperience(experience: any): HomeExperienceTransformed {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    
    return {
      id: experience.id,
      title: experience.Title,
      description: experience.Description,
      images: experience.Image.map((image: any) => ({
        url: image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`,
        alt: image.alternativeText || image.name,
        formats: {
          thumbnail: image.formats.thumbnail.url.startsWith('http') ? image.formats.thumbnail.url : `${baseUrl}${image.formats.thumbnail.url}`,
          medium: image.formats.medium.url.startsWith('http') ? image.formats.medium.url : `${baseUrl}${image.formats.medium.url}`,
          small: image.formats.small.url.startsWith('http') ? image.formats.small.url : `${baseUrl}${image.formats.small.url}`,
          large: image.formats.large.url.startsWith('http') ? image.formats.large.url : `${baseUrl}${image.formats.large.url}`
        }
      }))
    };
  }
  
  private getDummyHomePage(): HomePageTransformed {
    throw new Error('Home page data is not available from API');
  }
}

export const homePageService = new HomePageService();


