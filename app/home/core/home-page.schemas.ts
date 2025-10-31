
import { z } from 'zod';

export const StrapiMediaFormatSchema = z.object({
  name: z.string(),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  path: z.string().nullable(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
  sizeInBytes: z.number(),
  url: z.string(),
});

// Strapi Media Schema
export const StrapiMediaSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  alternativeText: z.string().nullable(),
  caption: z.string().nullable(),
  width: z.number(),
  height: z.number(),
  formats: z.object({
    thumbnail: StrapiMediaFormatSchema,
    medium: StrapiMediaFormatSchema,
    small: StrapiMediaFormatSchema,
    large: StrapiMediaFormatSchema,
  }),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  size: z.number(),
  url: z.string(),
  previewUrl: z.string().nullable(),
  provider: z.string(),
  provider_metadata: z.any(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

// Home Hero Schema
export const HomeHeroSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
  Background: z.array(StrapiMediaSchema).optional(),
});

// Home Featured Schema
export const HomeFeaturedSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
});

// Home Testimonials Schema
export const HomeTestimonialsSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
  LogoName: z.string(),
  LogoText: z.string(),
  Logo: StrapiMediaSchema,
  Image: StrapiMediaSchema,
});

// Home Experience Schema
export const HomeExperienceSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
  Image: z.array(StrapiMediaSchema),
});

// Home Page Data Schema (Raw Strapi Response)
export const HomePageDataSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  HomeHero: HomeHeroSchema,
  HomeFeatured: z.array(HomeFeaturedSchema),
  Testimonials: HomeTestimonialsSchema,
  Experience: HomeExperienceSchema,
});

// Strapi Response Schema - More flexible
export const StrapiResponseSchema = z.object({
  data: HomePageDataSchema,
  meta: z.record(z.string(), z.any()).optional(),
});

// Alternative schema for direct data response
export const DirectDataSchema = HomePageDataSchema;

// Transformed Schemas untuk Frontend
export const HomeHeroTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  backgroundImages: z.array(z.object({
    url: z.string(),
    alt: z.string(),
  })).optional(),
});

export const HomeFeaturedTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const HomeTestimonialsTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  logoName: z.string(),
  logoText: z.string(),
  logo: z.object({
    url: z.string(),
    alt: z.string(),
    formats: z.object({
      thumbnail: z.string(),
      medium: z.string(),
      small: z.string(),
      large: z.string(),
    }),
  }),
  image: z.object({
    url: z.string(),
    alt: z.string(),
    formats: z.object({
      thumbnail: z.string(),
      medium: z.string(),
      small: z.string(),
      large: z.string(),
    }),
  }),
});

export const HomeExperienceTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  images: z.array(z.object({
    url: z.string(),
    alt: z.string(),
    formats: z.object({
      thumbnail: z.string(),
      medium: z.string(),
      small: z.string(),
      large: z.string(),
    }),
  })),
});

export const HomePageTransformedSchema = z.object({
  id: z.number(),
  hero: HomeHeroTransformedSchema,
  featured: z.array(HomeFeaturedTransformedSchema),
  testimonials: HomeTestimonialsTransformedSchema,
  experience: HomeExperienceTransformedSchema,
});

// Type exports
export type HomeHeroType = z.infer<typeof HomeHeroSchema>;
export type HomeFeaturedType = z.infer<typeof HomeFeaturedSchema>;
export type HomeTestimonialsType = z.infer<typeof HomeTestimonialsSchema>;
export type HomeExperienceType = z.infer<typeof HomeExperienceSchema>;
export type HomePageDataType = z.infer<typeof HomePageDataSchema>;
export type StrapiResponseType = z.infer<typeof StrapiResponseSchema>;

export type HomeHeroTransformedType = z.infer<typeof HomeHeroTransformedSchema>;
export type HomeFeaturedTransformedType = z.infer<typeof HomeFeaturedTransformedSchema>;
export type HomeTestimonialsTransformedType = z.infer<typeof HomeTestimonialsTransformedSchema>;
export type HomeExperienceTransformedType = z.infer<typeof HomeExperienceTransformedSchema>;
export type HomePageTransformedType = z.infer<typeof HomePageTransformedSchema>;


