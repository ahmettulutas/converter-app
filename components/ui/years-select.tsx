import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';

type YearsSelectProps = {
  handleYearChange: (year: string) => void;
  year: number | undefined;
};

function YearsSelect({ handleYearChange, year }: YearsSelectProps) {
  const generateYears = () => {
    return Array.from({ length: 100 }, (_, i) => {
      const y = String(1954 + i);
      return { value: y, label: y };
    }).sort((a, b) => b.value.localeCompare(a.value));
  };

  return (
    <Select value={year ? String(year) : undefined} onValueChange={handleYearChange}>
      <SelectTrigger className="w-full bg-transparent border">
        <SelectValue placeholder="Yıl" />
      </SelectTrigger>
      <SelectContent>
        {generateYears().map((yearOption) => (
          <SelectItem key={yearOption.value} value={yearOption.value}>
            {yearOption.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default React.memo(YearsSelect);
