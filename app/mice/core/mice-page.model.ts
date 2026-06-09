export interface MiceStat {
  id: number;
  Value: string;
  Label: string;
}

export interface MiceHero {
  id: number;
  BadgeIcon: string;
  Badge: string;
  TitleLine1: string;
  TitleLine2: string;
  TitleHighlight: string;
  Description: string;
  PrimaryButtonLabel: string;
  PrimaryButtonHref: string;
  SecondaryButtonLabel: string;
  SecondaryButtonHref: string;
  Stats: MiceStat[];
}

export interface MiceServiceItem {
  id: number;
  Icon: string;
  Title: string;
  Description: string;
  Tag: string;
}

export interface MiceServices {
  id: number;
  SectionLabel: string;
  Title: string;
  Description: string;
  Services: MiceServiceItem[];
}

export interface MicePackageItem {
  id: number;
  Tier: string;
  Name: string;
  Price: string;
  PriceSub: string;
  Featured: boolean;
  Popular: boolean;
  PopularLabel?: string;
  ButtonLabel: string;
  ButtonVariant: 'outline' | 'gold';
  Features: string[];
}

export interface MicePackages {
  id: number;
  SectionLabel: string;
  Title: string;
  Description: string;
  Packages: MicePackageItem[];
}

export interface MiceWhyUsItem {
  id: number;
  Icon: string;
  Title: string;
  Description: string;
}

export interface MiceWhyUs {
  id: number;
  SectionLabel: string;
  Title: string;
  Description: string;
  Items: MiceWhyUsItem[];
}

export interface MiceRegisterBadge {
  id: number;
  Icon: string;
  Label: string;
}

export interface MiceEventType {
  id: string;
  Value: string;
  Label: string;
  Icon: string;
}

export interface MiceRegister {
  id: number;
  SectionLabel: string;
  Title: string;
  Description: string;
  FormTitle: string;
  FormSubtitle: string;
  Badges: MiceRegisterBadge[];
  CompanySectionTitle: string;
  EventSectionTitle: string;
  SubmitButtonLabel: string;
  PrivacyNote: string;
  AgreementText: string;
  ModalTitle: string;
  ModalDescription: string;
  ModalRefNote: string;
  ModalFollowUp: string;
  ModalCloseLabel: string;
  ValidationMessage: string;
  IndustryOptions: string[];
  EventTypes: MiceEventType[];
  ParticipantOptions: string[];
  PackageOptions: string[];
  DurationOptions: string[];
  BudgetOptions: string[];
}

export interface MiceTestimonialItem {
  id: number;
  Initials: string;
  Text: string;
  Name: string;
  Role: string;
}

export interface MiceTestimonials {
  id: number;
  SectionLabel: string;
  Title: string;
  Items: MiceTestimonialItem[];
}

export interface MiceFaqItem {
  id: number;
  Question: string;
  Answer: string;
}

export interface MiceFaq {
  id: number;
  SectionLabel: string;
  Title: string;
  Items: MiceFaqItem[];
}

export interface MiceFooterCta {
  id: number;
  Title: string;
  Description: string;
  PrimaryButtonLabel: string;
  PrimaryButtonHref: string;
  SecondaryButtonLabel: string;
  SecondaryButtonIcon: string;
  SecondaryButtonHref: string;
}

export interface MicePageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  MiceHero: MiceHero;
  MiceServices: MiceServices;
  MicePackages: MicePackages;
  MiceWhyUs: MiceWhyUs;
  MiceRegister: MiceRegister;
  MiceTestimonials: MiceTestimonials;
  MiceFaq: MiceFaq;
  MiceFooterCta: MiceFooterCta;
}

export interface MiceStatTransformed {
  id: number;
  value: string;
  label: string;
}

export interface MiceRegisterBadgeTransformed {
  id: number;
  icon: string;
  label: string;
}

export interface MiceHeroTransformed {
  id: number;
  badgeIcon: string;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
  stats: MiceStatTransformed[];
}

export interface MiceServiceItemTransformed {
  id: number;
  icon: string;
  title: string;
  description: string;
  tag: string;
}

export interface MiceServicesTransformed {
  id: number;
  sectionLabel: string;
  title: string;
  description: string;
  services: MiceServiceItemTransformed[];
}

export interface MicePackageItemTransformed {
  id: number;
  tier: string;
  name: string;
  price: string;
  priceSub: string;
  featured: boolean;
  popular: boolean;
  popularLabel?: string;
  buttonLabel: string;
  buttonVariant: 'outline' | 'gold';
  features: string[];
}

export interface MicePackagesTransformed {
  id: number;
  sectionLabel: string;
  title: string;
  description: string;
  packages: MicePackageItemTransformed[];
}

export interface MiceWhyUsItemTransformed {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface MiceWhyUsTransformed {
  id: number;
  sectionLabel: string;
  title: string;
  description: string;
  items: MiceWhyUsItemTransformed[];
}

export interface MiceEventTypeTransformed {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface MiceRegisterTransformed {
  id: number;
  sectionLabel: string;
  title: string;
  description: string;
  formTitle: string;
  formSubtitle: string;
  badges: MiceRegisterBadgeTransformed[];
  companySectionTitle: string;
  eventSectionTitle: string;
  submitButtonLabel: string;
  privacyNote: string;
  agreementText: string;
  modalTitle: string;
  modalDescription: string;
  modalRefNote: string;
  modalFollowUp: string;
  modalCloseLabel: string;
  validationMessage: string;
  industryOptions: string[];
  eventTypes: MiceEventTypeTransformed[];
  participantOptions: string[];
  packageOptions: string[];
  durationOptions: string[];
  budgetOptions: string[];
}

export interface MiceTestimonialItemTransformed {
  id: number;
  initials: string;
  text: string;
  name: string;
  role: string;
}

export interface MiceTestimonialsTransformed {
  id: number;
  sectionLabel: string;
  title: string;
  items: MiceTestimonialItemTransformed[];
}

export interface MiceFaqItemTransformed {
  id: number;
  question: string;
  answer: string;
}

export interface MiceFaqTransformed {
  id: number;
  sectionLabel: string;
  title: string;
  items: MiceFaqItemTransformed[];
}

export interface MiceFooterCtaTransformed {
  id: number;
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonIcon: string;
  secondaryButtonHref: string;
}

export interface MicePageTransformed {
  id: number;
  hero: MiceHeroTransformed;
  services: MiceServicesTransformed;
  packages: MicePackagesTransformed;
  whyUs: MiceWhyUsTransformed;
  register: MiceRegisterTransformed;
  testimonials: MiceTestimonialsTransformed;
  faq: MiceFaqTransformed;
  footerCta: MiceFooterCtaTransformed;
}
