import { micePageService } from './core/mice-page.service';
import { metadata } from './metadata';
import MicePageContent from './MicePageContent';

export { metadata };

export default async function MicePage() {
  const data = await micePageService.getMicePage();
  return <MicePageContent data={data} />;
}
