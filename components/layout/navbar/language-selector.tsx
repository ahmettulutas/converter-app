'use client';
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button, ButtonProps } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { ComboItems } from '@/components/shared/combobox/combo-items';
import { LocaleType, availableLocales } from '@/i18n/settings';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useTranslation } from '@/i18n/client';
import { LanguagesIcon } from 'lucide-react';
import { omitLocaleFromPath } from '@/lib/helpers';

export type SelectType = { value: string | number; label: string };
const languages = availableLocales.map((item) => ({
  value: item,
  label: item,
}));
export type ComboboxProps = {
  triggerProps?: ButtonProps;
};

export function LanguageSelector(props: Readonly<ComboboxProps>) {
  const { triggerProps } = props;
  const params = useParams();
  const { t } = useTranslation(params.locale as LocaleType, 'translation');
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = React.useState<string | number>(String(params.locale));
  const [open, setOpen] = React.useState(false);
  const selectedVal = languages?.find((item) => item.value === selected);

  const handleChange = (opt: SelectType | undefined) => {
    if (!opt) return;
    setSelected(opt?.value);
    router.push(`/${opt.value}/${omitLocaleFromPath(pathname)}`);
  };

  const emptyMessage = t('msg.noLangSelected');
  const title = t('msg.selectLang');
  const buttonContent = (
    <>
      <LanguagesIcon height={18} width={18} />
      <p className={cn('max-w-[95%] overflow-hidden)')}>{selectedVal ? selectedVal.label : title}</p>
    </>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button {...triggerProps}>{buttonContent}</Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <ComboItems setSelected={handleChange} setOpen={setOpen} data={languages} emptyMessage={emptyMessage} />
      </PopoverContent>
    </Popover>
  );
}
