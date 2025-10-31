import { packagePageService } from './core/paket-tour.service';
import { metadata } from './metadata';
import PaketTourPageContent from './PaketTourPageContent';

export { metadata };

export default async function PaketTourPage() {
  const data = await packagePageService.getPackagePage();
  return <PaketTourPageContent data={data} />;
}
