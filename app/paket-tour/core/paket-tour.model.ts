
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

// Direct Data Types (when data is already unwrapped)
export interface DirectData<T> {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  [key: string]: any;
}

// Raw Strapi Data Types
export interface PackageHeroData {
  id: number;
  Title: string;
  Description: string;
  Background: StrapiImageData[];
}

export interface StrapiImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: StrapiImageFormat;
    medium: StrapiImageFormat;
    small: StrapiImageFormat;
    large: StrapiImageFormat;
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

export interface StrapiImageFormat {
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

// Raw API Response
export interface PackagePageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  PackageHero: PackageHeroData;
}

// Transformed Types for Frontend
export interface PackageHeroTransformed {
  id: number;
  title: string;
  description: string;
  backgroundImages: PackageImageTransformed[];
}

export interface PackageImageTransformed {
  url: string;
  alt: string;
  formats: {
    thumbnail: string;
    medium: string;
    small: string;
    large: string;
  };
}

export interface PackagePageTransformed {
  id: number;
  hero: PackageHeroTransformed;
}

// Store State Types
export interface PackagePageState {
  packagePage: PackagePageTransformed | null;
  loading: boolean;
  error: string | null;
}

// Store Actions
export interface PackagePageActions {
  fetchPackagePage: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setPackagePage: (packagePage: PackagePageTransformed | null) => void;
  setError: (error: string | null) => void;
}
