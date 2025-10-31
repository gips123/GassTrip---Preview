
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path?: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    medium: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path?: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    small: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path?: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
    large: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      path?: string | null;
      width: number;
      height: number;
      size: number;
      sizeInBytes: number;
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Contact Hero (raw from Strapi)
export interface ContactHero {
  id: number;
  Title: string;
  Description: string;
  Background?: StrapiMedia[];
}

// Detail Information (raw from Strapi)
export interface DetailInformation {
  id: number;
  Title: string;
  Description: string;
}

// Information (raw from Strapi)
export interface Information {
  id: number;
  Title: string;
  Description: string;
  DetailInformation: DetailInformation[];
}

// Contact Page Data (raw from Strapi)
export interface ContactPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  ContactHero: ContactHero;
  Information: Information[];
}

// Strapi Response wrapper
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Transformed interfaces for frontend

// Contact Hero Transformed
export interface ContactHeroTransformed {
  id: number;
  title: string;
  description: string;
  backgroundImage?: {
    url: string;
    alt: string;
  };
}

// Detail Information Transformed
export interface DetailInformationTransformed {
  id: number;
  title: string;
  description: string;
}

// Information Transformed
export interface InformationTransformed {
  id: number;
  title: string;
  description: string;
  detailInformation: DetailInformationTransformed[];
}

// Contact Page Transformed (final data for frontend)
export interface ContactPageTransformed {
  id: number;
  hero: ContactHeroTransformed;
  information: InformationTransformed[];
  background: {
    url: string;
    alt: string;
  };
}
