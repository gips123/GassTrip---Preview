import React from 'react';
import Loading from './Loading';

interface PageLoadingProps {
  pageName?: string;
}
export default function PageLoading({ pageName }: PageLoadingProps) {
  const message = pageName 
    ? `Loading ${pageName}...` 
    : 'Memuat...';

  return <Loading message={message} size="lg" />;
}

