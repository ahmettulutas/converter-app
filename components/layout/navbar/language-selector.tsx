'use client';
import React from 'react';

import { Button, ButtonProps } from '@/components/ui/button';

import { cn } from '@/lib/utils/styles';

import { LocaleType, availableLocales } from '@/i18n/settings';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n/client';
import { LanguagesIcon } from 'lucide-react';
import { omitLocaleFromPath } from '@/lib/helpers';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
export type SelectType = { value: string | number; label: string };
const languages = availableLocales.map((item) => ({
  value: item,
  label: item,
}));
export type ComboboxProps = {
  triggerProps?: ButtonProps;
};

export function LanguageSelector(props: Readonly<ComboboxProps>) {
  const params = useParams();
  const { t } = useTranslation(params.locale as LocaleType, 'translation');
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = React.useState<string | number>(String(params.locale));

  const selectedVal = languages?.find((item) => item.value === selected);

  const handleChange = (lng: string) => {
    if (!lng) return;
    setSelected(lng);
    router.push(`/${lng}/${omitLocaleFromPath(pathname)}`);
  };

  const title = t('msg.selectLang');
  const buttonContent = (
    <>
      <LanguagesIcon className="h-[1.2rem] w-[1.2rem]" />
      <p className={cn('max-w-[95%] overflow-hidden)')}>{selectedVal ? selectedVal.label : title}</p>
    </>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {buttonContent}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.value} onClick={() => handleChange(lang.value)}>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
