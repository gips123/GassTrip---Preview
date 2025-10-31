import { aboutPageService } from './core/about-page.service';
import { metadata } from './metadata';
import AboutPageContent from './AboutPageContent';

export { metadata };

export default async function AboutPage() {
  const data = await aboutPageService.getAboutPage();
  return <AboutPageContent data={data} />;
}
