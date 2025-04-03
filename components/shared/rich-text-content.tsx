'use client';

import { urlForImage } from '@/lib/sanity/helpers/image-fns';
import { PortableText as PortableTextComponent } from '@portabletext/react';

import Image from 'next/image';
import Link from 'next/link';

const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlForImage(value)?.url();

      if (!imageUrl) {
        return null;
      }

      return (
        <figure className="my-8 relative">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt={value.alt || ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }: any) => {
      return (
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
          {value.filename && <div className="text-sm text-muted-foreground mb-2">{value.filename}</div>}
          <code className="text-sm font-mono">{value.code}</code>
        </pre>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;

      return (
        <Link href={value.href} rel={rel} className="text-primary hover:underline">
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-6 mb-2">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
    ),
    normal: ({ children }: any) => <p className="my-4">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
  },
};

export function PortableText({ value }: { value: any }) {
  return <PortableTextComponent value={value} components={components} />;
}
