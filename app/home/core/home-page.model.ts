
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: StrapiMediaFormat;
    medium: StrapiMediaFormat;
    small: StrapiMediaFormat;
    large: StrapiMediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface HomeHero {
  id: number;
  Title: string;
  Description: string;
  Background?: StrapiMedia[];
}

export interface HomeFeatured {
  id: number;
  Title: string;
  Description: string;
}

export interface HomeTestimonials {
  id: number;
  Title: string;
  Description: string;
  LogoName: string;
  LogoText: string;
  Logo: StrapiMedia;
  Image: StrapiMedia;
}

export interface HomeExperience {
  id: number;
  Title: string;
  Description: string;
  Image: StrapiMedia[];
}

export interface HomePageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  HomeHero: HomeHero;
  HomeFeatured: HomeFeatured[];
  Testimonials: HomeTestimonials;
  Experience: HomeExperience;
}

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, any>;
}

// Transformed models untuk frontend
export interface HomeHeroTransformed {
  id: number;
  title: string;
  description: string;
  backgroundImages?: {
    url: string;
    alt: string;
  }[];
}

export interface HomeFeaturedTransformed {
  id: number;
  title: string;
  description: string;
}

export interface HomeTestimonialsTransformed {
  id: number;
  title: string;
  description: string;
  logoName: string;
  logoText: string;
  logo: {
    url: string;
    alt: string;
    formats: {
      thumbnail: string;
      medium: string;
      small: string;
      large: string;
    };
  };
  image: {
    url: string;
    alt: string;
    formats: {
      thumbnail: string;
      medium: string;
      small: string;
      large: string;
    };
  };
}

export interface HomeExperienceTransformed {
  id: number;
  title: string;
  description: string;
  images: {
    url: string;
    alt: string;
    formats: {
      thumbnail: string;
      medium: string;
      small: string;
      large: string;
    };
  }[];
}

export interface HomePageTransformed {
  id: number;
  hero: HomeHeroTransformed;
  featured: HomeFeaturedTransformed[];
  testimonials: HomeTestimonialsTransformed;
  experience: HomeExperienceTransformed;
}


