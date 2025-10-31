import { contactPageService } from './core/contact-page.service';
import { metadata } from './metadata';
import ContactPageContent from './ContactPageContent';

export { metadata };

export default async function ContactPage() {
  const data = await contactPageService.getContactPage();
  return <ContactPageContent data={data} />;
}
