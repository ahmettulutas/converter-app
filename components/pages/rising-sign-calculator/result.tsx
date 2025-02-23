'use client';
import { SocialShareLinks } from '@/components/shared/share-social-media';
import { useTranslation } from '@/i18n/client';
import { LocaleType } from '@/i18n/settings';
import { baseUrl } from '@/lib/constants/common';
import { Check } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function SignResult({ risingSign }: { risingSign: string }) {
  const params = useParams();
  const { t } = useTranslation(params.locale as LocaleType, 'translation');
  return (
    <div className="p-4 bg-primary/10 rounded-md h-min w-full flex items-start gap-2 relative">
      <Check className="h-[1.2rem] w-[1.2rem]" />
      <div>
        <h3 className="mb-2">{t('labels.risingResult')}:</h3>
        <span className="text-primary text-lg font-semibold">{t(`labels.${risingSign}`)}</span>
      </div>
      <div className="absolute bottom-2 right-2">
        <SocialShareLinks shareUrl={`${baseUrl}/${params.locale}/rising-sign-calculator/result?sign=${risingSign}`} />
      </div>
    </div>
  );
}
