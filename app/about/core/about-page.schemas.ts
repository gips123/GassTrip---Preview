
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

export const AboutHeroSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
  Background: z.array(StrapiMediaSchema).optional(),
});

export const AboutFeaturedSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
});

export const AboutVisionMissionSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Vission: z.string(),
  Mission: z.array(z.object({
    id: z.number(),
    Title: z.string(),
    Description: z.string(),
  })).optional(),
});

export const AboutPageDataSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  AboutHero: AboutHeroSchema,
  Logo: StrapiMediaSchema,
  Featured: z.array(AboutFeaturedSchema),
  VissionMission: AboutVisionMissionSchema,
});

export const StrapiResponseSchema = z.object({
  data: AboutPageDataSchema,
  meta: z.record(z.string(), z.any()).optional(),
});

export const DirectDataSchema = AboutPageDataSchema;

export const AboutHeroTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  backgroundImage: z.object({
    url: z.string(),
    alt: z.string(),
  }).optional(),
});

export const AboutFeaturedTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

export const AboutVisionMissionTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  vision: z.string(),
  missions: z.array(z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
  })).optional(),
});

export const AboutLogoTransformedSchema = z.object({
  id: z.number(),
  url: z.string(),
  alt: z.string(),
  formats: z.object({
    thumbnail: z.string(),
    medium: z.string(),
    small: z.string(),
    large: z.string(),
  }),
});

export const AboutPageTransformedSchema = z.object({
  id: z.number(),
  hero: AboutHeroTransformedSchema,
  logo: AboutLogoTransformedSchema,
  featured: z.array(AboutFeaturedTransformedSchema),
  visionMission: AboutVisionMissionTransformedSchema,
  background: z.object({
    url: z.string(),
    alt: z.string(),
  }),
});

export type AboutHeroType = z.infer<typeof AboutHeroSchema>;
export type AboutFeaturedType = z.infer<typeof AboutFeaturedSchema>;
export type AboutVisionMissionType = z.infer<typeof AboutVisionMissionSchema>;
export type AboutPageDataType = z.infer<typeof AboutPageDataSchema>;
export type StrapiResponseType = z.infer<typeof StrapiResponseSchema>;

export type AboutHeroTransformedType = z.infer<typeof AboutHeroTransformedSchema>;
export type AboutFeaturedTransformedType = z.infer<typeof AboutFeaturedTransformedSchema>;
export type AboutVisionMissionTransformedType = z.infer<typeof AboutVisionMissionTransformedSchema>;
export type AboutLogoTransformedType = z.infer<typeof AboutLogoTransformedSchema>;
export type AboutPageTransformedType = z.infer<typeof AboutPageTransformedSchema>;
