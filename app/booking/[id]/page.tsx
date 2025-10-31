import PackageDetailPageContent from '../PackageDetailPageContent';

interface PackageDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PackageDetailPage({ params }: PackageDetailPageProps) {
  const { id } = await params;
  return <PackageDetailPageContent packageId={id} />;
}
