
import { StrapiService } from '@/lib/core/api';
import { transformImageUrl } from '@/lib/utils/image-url';
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
      backgroundImages = hero.Background.map((background: any) => ({
        url: transformImageUrl(background.url),
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
    return {
      id: testimonials.id,
      title: testimonials.Title,
      description: testimonials.Description,
      logoName: testimonials.LogoName,
      logoText: testimonials.LogoText,
      logo: {
        url: transformImageUrl(testimonials.Logo.url),
        alt: testimonials.Logo.alternativeText || testimonials.Logo.name,
        formats: {
          thumbnail: transformImageUrl(testimonials.Logo.formats.thumbnail.url),
          medium: transformImageUrl(testimonials.Logo.formats.medium.url),
          small: transformImageUrl(testimonials.Logo.formats.small.url),
          large: transformImageUrl(testimonials.Logo.formats.large.url)
        }
      },
      image: {
        url: transformImageUrl(testimonials.Image.url),
        alt: testimonials.Image.alternativeText || testimonials.Image.name,
        formats: {
          thumbnail: transformImageUrl(testimonials.Image.formats.thumbnail.url),
          medium: transformImageUrl(testimonials.Image.formats.medium.url),
          small: transformImageUrl(testimonials.Image.formats.small.url),
          large: transformImageUrl(testimonials.Image.formats.large.url)
        }
      }
    };
  }
  
  private transformExperience(experience: any): HomeExperienceTransformed {
    return {
      id: experience.id,
      title: experience.Title,
      description: experience.Description,
      images: experience.Image.map((image: any) => ({
        url: transformImageUrl(image.url),
        alt: image.alternativeText || image.name,
        formats: {
          thumbnail: transformImageUrl(image.formats.thumbnail.url),
          medium: transformImageUrl(image.formats.medium.url),
          small: transformImageUrl(image.formats.small.url),
          large: transformImageUrl(image.formats.large.url)
        }
      }))
    };
  }
  
  private getDummyHomePage(): HomePageTransformed {
    throw new Error('Home page data is not available from API');
  }
}

export const homePageService = new HomePageService();


