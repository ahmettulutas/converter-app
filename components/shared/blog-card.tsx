'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BlogPostForList } from '@/actions/blog';

import { format, parseISO } from 'date-fns';
import { LocaleType } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';

export default function BlogDate({ date }: { date?: string }) {
  if (!date) return null;

  const parsedDate = parseISO(date);
  return (
    <time className="text-xs text-muted-foreground px-3 flex-1 inline-block" dateTime={date}>
      {format(parsedDate, 'MM.dd.yyyy')}
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
  const { t } = useTranslation(locale, 'translation');
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="line-clamp-2 text-md lg:text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between gap-y-2 items-center flex-col md:flex-row">
        <BlogDate date={date} />
        <Button variant="ghost" size="sm" asChild>
          <Link
            href={`/${locale}/blog/${slug}`}
            className="flex items-center gap-2"
            title={t('labels.continueReading')}
          >
            {t('labels.continueReading')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
