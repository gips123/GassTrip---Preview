// Schemas untuk validasi Contact page data

import { z } from 'zod';

// Strapi Media Schema
export const StrapiMediaSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  alternativeText: z.string().nullable().optional(),
  caption: z.string().nullable().optional(),
  width: z.number(),
  height: z.number(),
  formats: z.object({
    thumbnail: z.object({
      name: z.string(),
      hash: z.string(),
      ext: z.string(),
      mime: z.string(),
      path: z.string().nullable().optional(),
      width: z.number(),
      height: z.number(),
      size: z.number(),
      sizeInBytes: z.number(),
      url: z.string(),
    }),
    medium: z.object({
      name: z.string(),
      hash: z.string(),
      ext: z.string(),
      mime: z.string(),
      path: z.string().nullable().optional(),
      width: z.number(),
      height: z.number(),
      size: z.number(),
      sizeInBytes: z.number(),
      url: z.string(),
    }),
    small: z.object({
      name: z.string(),
      hash: z.string(),
      ext: z.string(),
      mime: z.string(),
      path: z.string().nullable().optional(),
      width: z.number(),
      height: z.number(),
      size: z.number(),
      sizeInBytes: z.number(),
      url: z.string(),
    }),
    large: z.object({
      name: z.string(),
      hash: z.string(),
      ext: z.string(),
      mime: z.string(),
      path: z.string().nullable().optional(),
      width: z.number(),
      height: z.number(),
      size: z.number(),
      sizeInBytes: z.number(),
      url: z.string(),
    }),
  }),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  size: z.number(),
  url: z.string(),
  previewUrl: z.string().nullable().optional(),
  provider: z.string(),
  provider_metadata: z.any().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

// Contact Hero Schema
export const ContactHeroSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
  Background: z.array(StrapiMediaSchema).optional(),
});

// Detail Information Schema
export const DetailInformationSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
});

// Information Schema
export const InformationSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
  DetailInformation: z.array(DetailInformationSchema),
});

// Contact Page Data Schema
export const ContactPageDataSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  ContactHero: ContactHeroSchema,
  Information: z.array(InformationSchema),
});

// Strapi Response Schema
export const StrapiResponseSchema = z.object({
  data: ContactPageDataSchema,
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }).optional(),
  }).optional(),
});

// Direct Data Schema (for merged data)
export const DirectDataSchema = ContactPageDataSchema;

// Transformed Schemas

// Contact Hero Transformed Schema
export const ContactHeroTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  backgroundImage: z.object({
    url: z.string(),
    alt: z.string(),
  }).optional(),
});

// Detail Information Transformed Schema
export const DetailInformationTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});

// Information Transformed Schema
export const InformationTransformedSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  detailInformation: z.array(DetailInformationTransformedSchema),
});

// Contact Page Transformed Schema
export const ContactPageTransformedSchema = z.object({
  id: z.number(),
  hero: ContactHeroTransformedSchema,
  information: z.array(InformationTransformedSchema),
  background: z.object({
    url: z.string(),
    alt: z.string(),
  }),
});
