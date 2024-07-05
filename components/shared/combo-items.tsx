"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SelectType } from "./combobox";
import { useCallback } from "react";

type ComboItems = {
  setOpen?: (open: boolean) => void;
  setSelected: (option: SelectType | undefined) => void;
  data?: Array<SelectType>;
  emptyMessage?: string;
};

export function ComboItems(props: ComboItems) {
  const { setOpen, setSelected, data, emptyMessage } = props;
  const handleSelect = useCallback(
    (selected: string) => {
      const value = data?.find(
        (option) =>
          option.label.trim().toLowerCase() === selected.trim().toLowerCase()
      );
      if (value) {
        setSelected(value);
      }
      setOpen?.(false);
    },
    [data, setOpen, setSelected]
  );

  return (
    <Command>
      <CommandInput placeholder="Ara..." />
      <CommandList>
        <CommandEmpty>{emptyMessage ?? "Hiçbir sonuç bulunamadı"}</CommandEmpty>
        <CommandGroup>
          {data?.map((option) => (
            <CommandItem
              key={option.value}
              value={option.label}
              onSelect={handleSelect}
            >
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
