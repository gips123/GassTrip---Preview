import { StrapiService } from '@/lib/core/api';
import {
  MicePageData,
  MicePageTransformed,
} from './mice-page.model';
import { DirectDataSchema, MicePageTransformedSchema } from './mice-page.schemas';

export class MicePageService {
  async getMicePage(): Promise<MicePageTransformed> {
    try {
      const mergedData = await StrapiService.getMicePageData();

      if (!mergedData || typeof mergedData !== 'object') {
        throw new Error('MICE page data is not available');
      }

      const validatedData = DirectDataSchema.parse(mergedData);
      const transformedData = this.transformMicePageData(validatedData);
      return MicePageTransformedSchema.parse(transformedData);
    } catch (error) {
      throw new Error(`Failed to fetch MICE page data: ${error}`);
    }
  }

  private transformMicePageData(data: MicePageData): MicePageTransformed {
    return {
      id: data.id,
      hero: {
        id: data.MiceHero.id,
        badgeIcon: data.MiceHero.BadgeIcon,
        badge: data.MiceHero.Badge,
        titleLine1: data.MiceHero.TitleLine1,
        titleLine2: data.MiceHero.TitleLine2,
        titleHighlight: data.MiceHero.TitleHighlight,
        description: data.MiceHero.Description,
        primaryButtonLabel: data.MiceHero.PrimaryButtonLabel,
        primaryButtonHref: data.MiceHero.PrimaryButtonHref,
        secondaryButtonLabel: data.MiceHero.SecondaryButtonLabel,
        secondaryButtonHref: data.MiceHero.SecondaryButtonHref,
        stats: data.MiceHero.Stats.map((stat) => ({
          id: stat.id,
          value: stat.Value,
          label: stat.Label,
        })),
      },
      services: {
        id: data.MiceServices.id,
        sectionLabel: data.MiceServices.SectionLabel,
        title: data.MiceServices.Title,
        description: data.MiceServices.Description,
        services: data.MiceServices.Services.map((service) => ({
          id: service.id,
          icon: service.Icon,
          title: service.Title,
          description: service.Description,
          tag: service.Tag,
        })),
      },
      packages: {
        id: data.MicePackages.id,
        sectionLabel: data.MicePackages.SectionLabel,
        title: data.MicePackages.Title,
        description: data.MicePackages.Description,
        packages: data.MicePackages.Packages.map((pkg) => ({
          id: pkg.id,
          tier: pkg.Tier,
          name: pkg.Name,
          price: pkg.Price,
          priceSub: pkg.PriceSub,
          featured: pkg.Featured,
          popular: pkg.Popular,
          popularLabel: pkg.PopularLabel,
          buttonLabel: pkg.ButtonLabel,
          buttonVariant: pkg.ButtonVariant,
          features: pkg.Features,
        })),
      },
      whyUs: {
        id: data.MiceWhyUs.id,
        sectionLabel: data.MiceWhyUs.SectionLabel,
        title: data.MiceWhyUs.Title,
        description: data.MiceWhyUs.Description,
        items: data.MiceWhyUs.Items.map((item) => ({
          id: item.id,
          icon: item.Icon,
          title: item.Title,
          description: item.Description,
        })),
      },
      register: {
        id: data.MiceRegister.id,
        sectionLabel: data.MiceRegister.SectionLabel,
        title: data.MiceRegister.Title,
        description: data.MiceRegister.Description,
        formTitle: data.MiceRegister.FormTitle,
        formSubtitle: data.MiceRegister.FormSubtitle,
        badges: data.MiceRegister.Badges.map((badge) => ({
          id: badge.id,
          icon: badge.Icon,
          label: badge.Label,
        })),
        companySectionTitle: data.MiceRegister.CompanySectionTitle,
        eventSectionTitle: data.MiceRegister.EventSectionTitle,
        submitButtonLabel: data.MiceRegister.SubmitButtonLabel,
        privacyNote: data.MiceRegister.PrivacyNote,
        agreementText: data.MiceRegister.AgreementText,
        modalTitle: data.MiceRegister.ModalTitle,
        modalDescription: data.MiceRegister.ModalDescription,
        modalRefNote: data.MiceRegister.ModalRefNote,
        modalFollowUp: data.MiceRegister.ModalFollowUp,
        modalCloseLabel: data.MiceRegister.ModalCloseLabel,
        validationMessage: data.MiceRegister.ValidationMessage,
        industryOptions: data.MiceRegister.IndustryOptions,
        eventTypes: data.MiceRegister.EventTypes.map((type) => ({
          id: type.id,
          value: type.Value,
          label: type.Label,
          icon: type.Icon,
        })),
        participantOptions: data.MiceRegister.ParticipantOptions,
        packageOptions: data.MiceRegister.PackageOptions,
        durationOptions: data.MiceRegister.DurationOptions,
        budgetOptions: data.MiceRegister.BudgetOptions,
      },
      testimonials: {
        id: data.MiceTestimonials.id,
        sectionLabel: data.MiceTestimonials.SectionLabel,
        title: data.MiceTestimonials.Title,
        items: data.MiceTestimonials.Items.map((item) => ({
          id: item.id,
          initials: item.Initials,
          text: item.Text,
          name: item.Name,
          role: item.Role,
        })),
      },
      faq: {
        id: data.MiceFaq.id,
        sectionLabel: data.MiceFaq.SectionLabel,
        title: data.MiceFaq.Title,
        items: data.MiceFaq.Items.map((item) => ({
          id: item.id,
          question: item.Question,
          answer: item.Answer,
        })),
      },
      footerCta: {
        id: data.MiceFooterCta.id,
        title: data.MiceFooterCta.Title,
        description: data.MiceFooterCta.Description,
        primaryButtonLabel: data.MiceFooterCta.PrimaryButtonLabel,
        primaryButtonHref: data.MiceFooterCta.PrimaryButtonHref,
        secondaryButtonLabel: data.MiceFooterCta.SecondaryButtonLabel,
        secondaryButtonIcon: data.MiceFooterCta.SecondaryButtonIcon,
        secondaryButtonHref: data.MiceFooterCta.SecondaryButtonHref,
      },
    };
  }
}

export const micePageService = new MicePageService();
