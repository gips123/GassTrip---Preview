import PackageDetailPageContent from '../PackageDetailPageContent';

interface PackageDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function PackageDetailPage({ params }: PackageDetailPageProps) {
  const { id } = await params;
  return <PackageDetailPageContent packageId={id} />;
}
