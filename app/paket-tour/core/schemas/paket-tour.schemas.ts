// Schemas untuk Paket Tour page validation

import { z } from 'zod';

// Strapi Image Format Schema
export const StrapiImageFormatSchema = z.object({
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

// Strapi Image Data Schema
export const StrapiImageDataSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  alternativeText: z.string().nullable(),
  caption: z.string().nullable(),
  width: z.number(),
  height: z.number(),
  formats: z.object({
    thumbnail: StrapiImageFormatSchema,
    medium: StrapiImageFormatSchema,
    small: StrapiImageFormatSchema,
    large: StrapiImageFormatSchema,
  }),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  size: z.number(),
  url: z.string(),
  previewUrl: z.string().nullable(),
  provider: z.string(),
  provider_metadata: z.any().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

// Package Hero Data Schema
export const PackageHeroDataSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
  Background: z.array(StrapiImageDataSchema),
});

// Package Page Data Schema
export const PackagePageDataSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  PackageHero: PackageHeroDataSchema,
});

// Strapi Response Schema
export const StrapiResponseSchema = z.object({
  data: PackagePageDataSchema,
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }).optional(),
  }),
});

// Direct Data Schema (for merged data)
export const DirectDataSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  PackageHero: PackageHeroDataSchema,
});

// Transformed Data Schemas
export const PackageImageTransformedSchema = z.object({
  url: z.string(),
  alt: z.string(),
  formats: z.object({
    thumbnail: z.string(),
    medium: z.string(),
    small: z.string(),
    large: z.string(),
  }),
});

export const PackageHeroTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  backgroundImages: z.array(PackageImageTransformedSchema),
});

export const PackagePageTransformedSchema = z.object({
  id: z.number(),
  hero: PackageHeroTransformedSchema,
});

// Store State Schema
export const PackagePageStateSchema = z.object({
  packagePage: PackagePageTransformedSchema.nullable(),
  loading: z.boolean(),
  error: z.string().nullable(),
});
