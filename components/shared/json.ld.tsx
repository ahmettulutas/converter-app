import Script from 'next/script';

export function JsonSchema({ schema }: { schema: Record<string, any> }) {
  return (
    <Script
      id="application/ld+json"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      // strategy="afterInteractive"
    />
  );
}
