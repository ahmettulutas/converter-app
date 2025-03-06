'use client';
import { PortableText } from '@portabletext/react';
import React from 'react';
import { TypedObject } from 'sanity';
import Link from 'next/link';
import { Link2 } from 'lucide-react';

import Image from 'next/image';
import { urlForImage } from '@/lib/sanity/helpers/image-fns';
import { cn } from '@/lib/utils/styles';

const myPortableTextComponents = {
  types: {
    /* calculatorButton: ({ value }: any) => (
      <a
        href={value.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {value.label}
      </a>
    ), */
    image: ({ value }: any) => {
      const url = urlForImage(value.asset).height(400).width(300).url();
      if (!url) return <></>;
      return (
        <figure className="flex flex-col gap-1 overflow-hidden md:float-right ml-2">
          <div className="relative h-[400px] md:w-[300px]">
            <Image src={url} alt={value.alt} fill />
          </div>
          {value?.alt && <figcaption className="text-xs text-right p-1 pr-4">{value.alt}</figcaption>}
        </figure>
      );
    },
  },
  block: (props: any) => {
    const { node, children, index } = props;
    const style = node?.style || 'normal';

    if (/^h\d/.test(style)) {
      // set the heading tag (h1,h2,h3,etc)
      const HeadingTag = style;
      return (
        // use the node key as the id, it's guaranteed unique
        // one can also slugify the children spans if one want
        // nicer URLs
        <HeadingTag id={node._key} className="my-1 text-lg lg:text-xl font-bold">
          {children}
          <Link className="text-sm leading-8" href={`#${node._key}`}>
            #
          </Link>
        </HeadingTag>
      );
    }

    if (style === 'blockquote') return <blockquote>{children}</blockquote>;

    if (style === 'normal')
      return (
        <p className={cn('ml-2 lg:ml-4  text-base font-light', index === 0 ? 'indent-8' : 'indent-0')}>{children}</p>
      );
  },
  marks: {
    em: ({ children }: any) => <em className="font-semibold">{children}</em>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''}>
          <span className="inline-flex items-center text-primary underline">
            {children}
            <Link2 width={12} height={12} className="inline-block" />
          </span>
        </a>
      );
    },
    code: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return <code className="bg-accent p-2 rounded-md my-1 block">{children}</code>;
    },
    strong: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return <strong className="my-2 block">{children}</strong>;
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-4 ml-6 leading-8 text-lg">
        {children.map((child: any) => (
          <li key={child.key} className="leading-8 ml-2 list-disc">
            {child.props.children}
          </li>
        ))}
      </ul>
    ),
    number: ({ children }: any) => {
      return (
        <ol className="my-4 ml-6">
          {children.map((child: any) => (
            <li key={child.key} className="leading-8 ml-2">
              {child.props.children}
            </li>
          ))}
        </ol>
      );
    },
    checkmarks: ({ children }: any) => <ol className="m-auto">{children}</ol>,
    p: ({ children }: any) => <p className="my-2">{children}</p>,
  },
};

const RichTextContent = ({ content, className }: { content: TypedObject; className?: string }) => {
  // check the npm package for more details. https://www.npmjs.com/package/@portabletext/react
  return (
    <article className={cn('text-md md:text-lg', className)}>
      <PortableText value={content} components={myPortableTextComponents} />
    </article>
  );
};

export default RichTextContent;
