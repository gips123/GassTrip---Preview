import fs from 'fs';
import path from 'path';

class FakeDbClient {
  private basePath: string;

  constructor() {
    // Use path.join with process.cwd() for server-side, or relative path as fallback
    if (typeof process !== 'undefined' && process.cwd) {
      this.basePath = path.join(process.cwd(), 'fakedb');
    } else {
      this.basePath = path.resolve(__dirname, '../../../../fakedb');
    }
  }

  /**
   * Get public path based on filename
   */
  private getPublicPath(filename: string): string | null {
    const name = filename.toLowerCase();
    
    if (name.includes('bromo')) {
      return '/bromo.jpg';
    } else if (name.includes('bali')) {
      return '/bali.jpg';
    } else if (name.includes('pantai')) {
      return '/pantai.jpg';
    } else if (name.includes('gasstrip-logo') || name.includes('gasstrip_logo')) {
      return '/gasstrip-logo.png';
    } else if (name.includes('about')) {
      return '/about.jpg';
    } else if (name.includes('contact')) {
      return '/contact.jpg';
    } else if (name.includes('package')) {
      return '/package.jpg';
    }
    
    return null;
  }

  /**
   * Transform image URLs from Strapi uploads path to public folder path
   * Based on filename mapping
   */
  private transformImageUrls(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.transformImageUrls(item));
    }

    if (typeof obj === 'object') {
      // First, recursively transform all nested objects
      const transformed: any = {};
      for (const [key, value] of Object.entries(obj)) {
        transformed[key] = this.transformImageUrls(value);
      }
      
      // Then, if this object has both 'name' and 'url' fields, transform URL based on name
      if (transformed.name && typeof transformed.name === 'string' && 
          transformed.url && typeof transformed.url === 'string' && 
          transformed.url.startsWith('/uploads/')) {
        const publicPath = this.getPublicPath(transformed.name);
        if (publicPath) {
          transformed.url = publicPath;
        } else {
          // If no mapping found, try to use a fallback or keep original (will likely fail in production)
          // For unknown images, we can use a placeholder or one of the existing images
          // For now, we'll use bali.jpg as fallback for unknown images
          console.warn(`No public path mapping found for image: ${transformed.name}, using fallback`);
          transformed.url = '/bali.jpg'; // Fallback to bali.jpg for unknown images
        }
      }
      
      // Also handle formats object (thumbnail, medium, small, large)
      if (transformed.formats && typeof transformed.formats === 'object' && transformed.name) {
        const publicPath = this.getPublicPath(transformed.name) || '/bali.jpg'; // Use fallback if no mapping
        // For formats, we use the same main image (formats are usually generated)
        // But for simplicity, we'll use the main image for all formats
        if (transformed.formats.thumbnail && transformed.formats.thumbnail.url) {
          transformed.formats.thumbnail.url = publicPath;
        }
        if (transformed.formats.medium && transformed.formats.medium.url) {
          transformed.formats.medium.url = publicPath;
        }
        if (transformed.formats.small && transformed.formats.small.url) {
          transformed.formats.small.url = publicPath;
        }
        if (transformed.formats.large && transformed.formats.large.url) {
          transformed.formats.large.url = publicPath;
        }
      }
      
      return transformed;
    }

    return obj;
  }

  private readFile(filename: string): any {
    try {
      const filePath = path.join(this.basePath, filename);
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(`Fakedb file not found: ${filePath}`);
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(fileContent);
      
      // Check if response contains error (like 404 from Strapi)
      if (parsed.error) {
        console.warn(`Fakedb file ${filename} contains error:`, parsed.error);
        // Return empty data structure to prevent app crash
        return { data: null };
      }
      
      // Transform image URLs to public folder paths
      const transformed = this.transformImageUrls(parsed);
      return transformed;
    } catch (error) {
      console.error(`Error reading fakedb file ${filename}:`, error);
      throw error;
    }
  }

  async get(endpoint: string): Promise<any> {
    // Map endpoints to fakedb files
    const endpointMap: Record<string, string> = {
      '/about?populate[AboutHero][populate]=*': 'about-hero.json',
      '/about?populate[Logo][populate]=*': 'about-logo.json',
      '/about?populate[Featured][populate]=*': 'about-featured.json',
      '/about?populate[VissionMission][populate]=*': 'about-vision-mission.json',
      '/home?populate[HomeHero][populate]=*': 'home-hero.json',
      '/home?populate[HomeFeatured][populate]=*': 'home-featured.json',
      '/home?populate[Testimonials][populate]=*': 'home-testimonials.json',
      '/home?populate[Experience][populate]=*': 'home-experience.json',
      '/tour-packages?populate=*': 'tour-packages.json',
      '/contact?populate[ContactHero][populate]=*': 'contact-hero.json',
      '/contact?populate[Information][populate]=*': 'contact-information.json',
      '/Package?populate[PackageHero][populate]=*': 'package-hero.json'
    };

    const filename = endpointMap[endpoint];
    if (!filename) {
      throw new Error(`No fakedb file mapped for endpoint: ${endpoint}`);
    }

    return this.readFile(filename);
  }
}

export const fakeDbClient = new FakeDbClient();

