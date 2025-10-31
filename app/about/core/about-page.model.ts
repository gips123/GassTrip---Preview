
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

export interface AboutHero {
  id: number;
  Title: string;
  Description: string;
  Background?: StrapiMedia[];
}

export interface AboutFeatured {
  id: number;
  Title: string;
  Description: string;
}

export interface AboutVisionMission {
  id: number;
  Title: string;
  Vission: string;
  Mission?: {
    id: number;
    Title: string;
    Description: string;
  }[];
}

export interface AboutPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  AboutHero: AboutHero;
  Logo: StrapiMedia;
  Featured: AboutFeatured[];
  VissionMission: AboutVisionMission;
}

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, any>;
}

export interface AboutHeroTransformed {
  id: number;
  title: string;
  description: string;
  backgroundImage?: {
    url: string;
    alt: string;
  };
}

export interface AboutLogoTransformed {
  id: number;
  url: string;
  alt: string;
  formats: {
    thumbnail: string;
    medium: string;
    small: string;
    large: string;
  };
}

export interface AboutFeaturedTransformed {
  id: number;
  title: string;
  description: string;
}

export interface AboutVisionMissionTransformed {
  id: number;
  title: string;
  vision: string;
  missions?: {
    id: number;
    title: string;
    description: string;
  }[];
}

export interface AboutPageTransformed {
  id: number;
  hero: AboutHeroTransformed;
  logo: AboutLogoTransformed;
  featured: AboutFeaturedTransformed[];
  visionMission: AboutVisionMissionTransformed;
  background: {
    url: string;
    alt: string;
  };
}
