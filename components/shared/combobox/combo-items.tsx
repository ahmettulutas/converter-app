'use client';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { SelectType } from '.';
import { useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/i18n/client';

type ComboItems = {
  setOpen?: (open: boolean) => void;
  setSelected: (option: SelectType | undefined) => void;
  data?: readonly SelectType[];
  emptyMessage?: string;
};

export function ComboItems(props: Readonly<ComboItems>) {
  const params = useParams();
  const { t } = useTranslation(params.locale as string, 'translation');
  const { setOpen, setSelected, data, emptyMessage } = props;
  const handleSelect = useCallback(
    (selected: string) => {
      const value = data?.find((option) => option.label.trim().toLowerCase() === selected.trim().toLowerCase());
      if (value) {
        setSelected(value);
      }
      setOpen?.(false);
    },
    [data, setOpen, setSelected]
  );

  return (
    <Command>
      <CommandInput placeholder={t('labels.search')} />
      <CommandList>
        <CommandEmpty>{emptyMessage ?? t('msg.noResult')}</CommandEmpty>
        <CommandGroup>
          {data?.map((option) => (
            <CommandItem key={option.value} value={option.label} onSelect={handleSelect}>
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
