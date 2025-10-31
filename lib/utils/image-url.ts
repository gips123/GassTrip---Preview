/**
 * Transform image URL from Strapi format to usable URL
 * - If URL starts with http/https, return as-is
 * - If URL starts with /uploads/, prepend Strapi base URL
 * - If URL starts with / (public folder path), return as-is (already transformed by fakedb)
 */
export function transformImageUrl(url: string, baseUrl?: string): string {
  // If URL is already a full URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If URL starts with /uploads/, it's a Strapi upload path, prepend base URL
  if (url.startsWith('/uploads/')) {
    const strapiBaseUrl = baseUrl || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    return `${strapiBaseUrl}${url}`;
  }
  
  // If URL starts with / but not /uploads/, it's a public folder path (from fakedb)
  // Return as-is - no need to prepend anything
  if (url.startsWith('/')) {
    return url;
  }
  
  // Fallback: if URL doesn't start with /, treat it as relative and add /
  return `/${url}`;
}

