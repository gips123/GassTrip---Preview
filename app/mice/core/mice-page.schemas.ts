import { z } from 'zod';

const MiceStatSchema = z.object({
  id: z.number(),
  Value: z.string(),
  Label: z.string(),
});

const MiceHeroSchema = z.object({
  id: z.number(),
  BadgeIcon: z.string(),
  Badge: z.string(),
  TitleLine1: z.string(),
  TitleLine2: z.string(),
  TitleHighlight: z.string(),
  Description: z.string(),
  PrimaryButtonLabel: z.string(),
  PrimaryButtonHref: z.string(),
  SecondaryButtonLabel: z.string(),
  SecondaryButtonHref: z.string(),
  Stats: z.array(MiceStatSchema),
});

const MiceServiceItemSchema = z.object({
  id: z.number(),
  Icon: z.string(),
  Title: z.string(),
  Description: z.string(),
  Tag: z.string(),
});

const MiceServicesSchema = z.object({
  id: z.number(),
  SectionLabel: z.string(),
  Title: z.string(),
  Description: z.string(),
  Services: z.array(MiceServiceItemSchema),
});

const MicePackageItemSchema = z.object({
  id: z.number(),
  Tier: z.string(),
  Name: z.string(),
  Price: z.string(),
  PriceSub: z.string(),
  Featured: z.boolean(),
  Popular: z.boolean(),
  PopularLabel: z.string().optional(),
  ButtonLabel: z.string(),
  ButtonVariant: z.enum(['outline', 'gold']),
  Features: z.array(z.string()),
});

const MicePackagesSchema = z.object({
  id: z.number(),
  SectionLabel: z.string(),
  Title: z.string(),
  Description: z.string(),
  Packages: z.array(MicePackageItemSchema),
});

const MiceWhyUsItemSchema = z.object({
  id: z.number(),
  Icon: z.string(),
  Title: z.string(),
  Description: z.string(),
});

const MiceWhyUsSchema = z.object({
  id: z.number(),
  SectionLabel: z.string(),
  Title: z.string(),
  Description: z.string(),
  Items: z.array(MiceWhyUsItemSchema),
});

const MiceRegisterBadgeSchema = z.object({
  id: z.number(),
  Icon: z.string(),
  Label: z.string(),
});

const MiceEventTypeSchema = z.object({
  id: z.string(),
  Value: z.string(),
  Label: z.string(),
  Icon: z.string(),
});

const MiceRegisterSchema = z.object({
  id: z.number(),
  SectionLabel: z.string(),
  Title: z.string(),
  Description: z.string(),
  FormTitle: z.string(),
  FormSubtitle: z.string(),
  Badges: z.array(MiceRegisterBadgeSchema),
  CompanySectionTitle: z.string(),
  EventSectionTitle: z.string(),
  SubmitButtonLabel: z.string(),
  PrivacyNote: z.string(),
  AgreementText: z.string(),
  ModalTitle: z.string(),
  ModalDescription: z.string(),
  ModalRefNote: z.string(),
  ModalFollowUp: z.string(),
  ModalCloseLabel: z.string(),
  ValidationMessage: z.string(),
  IndustryOptions: z.array(z.string()),
  EventTypes: z.array(MiceEventTypeSchema),
  ParticipantOptions: z.array(z.string()),
  PackageOptions: z.array(z.string()),
  DurationOptions: z.array(z.string()),
  BudgetOptions: z.array(z.string()),
});

const MiceTestimonialItemSchema = z.object({
  id: z.number(),
  Initials: z.string(),
  Text: z.string(),
  Name: z.string(),
  Role: z.string(),
});

const MiceTestimonialsSchema = z.object({
  id: z.number(),
  SectionLabel: z.string(),
  Title: z.string(),
  Items: z.array(MiceTestimonialItemSchema),
});

const MiceFaqItemSchema = z.object({
  id: z.number(),
  Question: z.string(),
  Answer: z.string(),
});

const MiceFaqSchema = z.object({
  id: z.number(),
  SectionLabel: z.string(),
  Title: z.string(),
  Items: z.array(MiceFaqItemSchema),
});

const MiceFooterCtaSchema = z.object({
  id: z.number(),
  Title: z.string(),
  Description: z.string(),
  PrimaryButtonLabel: z.string(),
  PrimaryButtonHref: z.string(),
  SecondaryButtonLabel: z.string(),
  SecondaryButtonIcon: z.string(),
  SecondaryButtonHref: z.string(),
});

export const MicePageDataSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  MiceHero: MiceHeroSchema,
  MiceServices: MiceServicesSchema,
  MicePackages: MicePackagesSchema,
  MiceWhyUs: MiceWhyUsSchema,
  MiceRegister: MiceRegisterSchema,
  MiceTestimonials: MiceTestimonialsSchema,
  MiceFaq: MiceFaqSchema,
  MiceFooterCta: MiceFooterCtaSchema,
});

export const DirectDataSchema = MicePageDataSchema;

export const MicePageTransformedSchema = z.object({
  id: z.number(),
  hero: z.object({
    id: z.number(),
    badgeIcon: z.string(),
    badge: z.string(),
    titleLine1: z.string(),
    titleLine2: z.string(),
    titleHighlight: z.string(),
    description: z.string(),
    primaryButtonLabel: z.string(),
    primaryButtonHref: z.string(),
    secondaryButtonLabel: z.string(),
    secondaryButtonHref: z.string(),
    stats: z.array(z.object({ id: z.number(), value: z.string(), label: z.string() })),
  }),
  services: z.object({
    id: z.number(),
    sectionLabel: z.string(),
    title: z.string(),
    description: z.string(),
    services: z.array(
      z.object({
        id: z.number(),
        icon: z.string(),
        title: z.string(),
        description: z.string(),
        tag: z.string(),
      })
    ),
  }),
  packages: z.object({
    id: z.number(),
    sectionLabel: z.string(),
    title: z.string(),
    description: z.string(),
    packages: z.array(
      z.object({
        id: z.number(),
        tier: z.string(),
        name: z.string(),
        price: z.string(),
        priceSub: z.string(),
        featured: z.boolean(),
        popular: z.boolean(),
        popularLabel: z.string().optional(),
        buttonLabel: z.string(),
        buttonVariant: z.enum(['outline', 'gold']),
        features: z.array(z.string()),
      })
    ),
  }),
  whyUs: z.object({
    id: z.number(),
    sectionLabel: z.string(),
    title: z.string(),
    description: z.string(),
    items: z.array(
      z.object({
        id: z.number(),
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
  register: z.object({
    id: z.number(),
    sectionLabel: z.string(),
    title: z.string(),
    description: z.string(),
    formTitle: z.string(),
    formSubtitle: z.string(),
    badges: z.array(z.object({ id: z.number(), icon: z.string(), label: z.string() })),
    companySectionTitle: z.string(),
    eventSectionTitle: z.string(),
    submitButtonLabel: z.string(),
    privacyNote: z.string(),
    agreementText: z.string(),
    modalTitle: z.string(),
    modalDescription: z.string(),
    modalRefNote: z.string(),
    modalFollowUp: z.string(),
    modalCloseLabel: z.string(),
    validationMessage: z.string(),
    industryOptions: z.array(z.string()),
    eventTypes: z.array(z.object({ id: z.string(), value: z.string(), label: z.string(), icon: z.string() })),
    participantOptions: z.array(z.string()),
    packageOptions: z.array(z.string()),
    durationOptions: z.array(z.string()),
    budgetOptions: z.array(z.string()),
  }),
  testimonials: z.object({
    id: z.number(),
    sectionLabel: z.string(),
    title: z.string(),
    items: z.array(
      z.object({
        id: z.number(),
        initials: z.string(),
        text: z.string(),
        name: z.string(),
        role: z.string(),
      })
    ),
  }),
  faq: z.object({
    id: z.number(),
    sectionLabel: z.string(),
    title: z.string(),
    items: z.array(z.object({ id: z.number(), question: z.string(), answer: z.string() })),
  }),
  footerCta: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    primaryButtonLabel: z.string(),
    primaryButtonHref: z.string(),
    secondaryButtonLabel: z.string(),
    secondaryButtonIcon: z.string(),
    secondaryButtonHref: z.string(),
  }),
});
