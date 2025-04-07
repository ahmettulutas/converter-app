'use client';

import * as React from 'react';
import { format, parseISO, setYear } from 'date-fns';

import { Button, ButtonProps } from '@/components/ui/button';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

import { tr } from 'date-fns/locale';

import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils/styles';
import YearsSelect from './years-select';
import { Calendar, CalendarProps } from './calendar';

export type DatePickerProps = {
  title: string;
  buttonProps?: ButtonProps;
  icon?: React.ReactNode;
  initialValue?: string | Date | undefined;
  calendarProps?: Omit<CalendarProps, 'mode' | 'onSelect' | 'selected'>;
  onChange?: (date: Date | undefined) => void;
};

export function DatePicker(props: DatePickerProps) {
  const { initialValue, title, buttonProps, calendarProps, onChange } = props;
  const initialDate = typeof initialValue === 'string' ? parseISO(initialValue) : initialValue;
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const [manualDate, setManualDate] = React.useState(initialDate ? format(initialDate, 'yyyy-MM-dd') : '');

  // Handles manual date input
  const handleManualDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : undefined;
    setManualDate(e.target.value);
    setDate(newDate);
    onChange?.(newDate);
  };

  // Handles year change
  const handleYearChange = (year: string) => {
    if (date) {
      const updatedDate = setYear(date, parseInt(year, 10));
      setDate(updatedDate);
      setManualDate(format(updatedDate, 'yyyy-MM-dd'));
      onChange?.(updatedDate);
    }
  };

  return (
    <div className="flex sm:space-x-2 flex-col sm:flex-row gap-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('w-full justify-start text-left font-normal rounded-xl', !date && 'text-muted-foreground')}
            {...buttonProps}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP', { locale: tr }) : <span>{title}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 space-y-2" align="start">
          <Calendar
            locale={tr}
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate);
              setManualDate(newDate ? format(newDate, 'yyyy-MM-dd') : '');
              onChange?.(newDate);
            }}
            initialFocus
            className="bg-popover"
            components={{
              HeadRow: () => <YearsSelect handleYearChange={handleYearChange} year={date?.getFullYear()} />,
            }}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
      <Input id="date" type="date" value={manualDate} onChange={handleManualDateChange} className="rounded-xl" />
    </div>
  );
}
