import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogPostForList } from '@/actions/blog';

import { format, parseISO } from 'date-fns';
import { LocaleType } from '@/i18n/settings';

export default function BlogDate({ date }: { date?: string }) {
  if (!date) return null;

  const parsedDate = parseISO(date);
  return (
    <time className="text-sm text-muted-foreground" dateTime={date}>
      {format(parsedDate, 'LLLL	d, yyyy')}
    </time>
  );
}
type BlogCardProps = {
  blog: BlogPostForList;
  locale: LocaleType;
};
export function BlogCard(props: BlogCardProps) {
  const { blog, locale } = props;
  const { title, description, slug, date } = blog;
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <BlogDate date={date} />
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/${locale}/blog/${slug}`} className="flex items-center gap-2">
            Read more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
