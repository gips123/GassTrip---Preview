import { homePageService } from './core/home-page.service';
import { metadata } from './metadata';
import HomePageContent from './HomePageContent';

export { metadata };

export default async function HomePage() {
  const data = await homePageService.getHomePage();
  return <HomePageContent data={data} />;
}
