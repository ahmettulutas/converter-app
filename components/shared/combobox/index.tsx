"use client";

import * as React from "react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, ButtonProps } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { ComboItems } from "./combo-items";
import { DownIcon } from "../../icons/down-icon";
import { useMediaQuery } from "@/hooks/use-media";

export type SelectType = { value: string | number; label: string };

export type ComboboxProps = {
  title: string;
  data?: readonly SelectType[];
  triggerProps?: ButtonProps;
  value: SelectType["value"];
  handleChange: (val: SelectType["value"]) => void;
  emptyMessage?: string;
  onChangeCallback?: () => void;
  icon?: React.ReactNode;
};

export function ComboBoxResponsive(props: Readonly<ComboboxProps>) {
  const { title, data, triggerProps, value, handleChange, emptyMessage, icon } =
    props;
  const selectedVal = data?.find((item) => item.value === value);
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onChange = (selected: SelectType | undefined) => {
    if (!selected) return;
    handleChange(selected?.value);
  };

  const buttonContent = (
    <>
      <p className={cn("max-w-[95%] overflow-hidden)")}>
        {selectedVal ? selectedVal.label : title}
      </p>
      {icon ? icon : <DownIcon className="shrink-0 bg-inherit" />}
    </>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button {...triggerProps}>{buttonContent}</Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="end">
          <ComboItems
            setSelected={onChange}
            setOpen={setOpen}
            data={data}
            emptyMessage={emptyMessage}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button {...triggerProps}>{buttonContent}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4">
          <ComboItems
            setSelected={onChange}
            setOpen={setOpen}
            data={data}
            emptyMessage={emptyMessage}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
