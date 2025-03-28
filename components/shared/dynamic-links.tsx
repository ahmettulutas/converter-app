import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export type RelatedLink = { url: string; title: string };

type RelatedLinksProps = {
  links: RelatedLink[];
  title: ReactNode;
};
const RelatedLinks = ({ links, title }: RelatedLinksProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link key={link.url} href={link.url} title={link.title}>
            <Button size="sm" variant="outline">
              {link.title}
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default RelatedLinks;
