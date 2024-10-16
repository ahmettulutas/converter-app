'use client';
import { useTranslation } from '@/i18n/client';
import { LocaleType } from '@/i18n/settings';
import { useParams } from 'next/navigation';
import { HTMLAttributes } from 'react';

type TranslatedProps = HTMLAttributes<HTMLHeadingElement> & {
  translation: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};
export function TranslatedTitle(props: Readonly<TranslatedProps>) {
  const { level = 'h2', translation, ...rest } = props;
  const params = useParams();
  const { t } = useTranslation(params.locale as LocaleType, 'translation');
  const Title = level;
  return <Title {...rest}>{t(translation)}</Title>;
}
