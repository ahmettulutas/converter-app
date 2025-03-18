'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Loader2, MapPin, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import type { PlaceResult } from '@/app/api/places/route';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils/styles';
import { Alert, AlertDescription } from '../ui/alert';
import { LocaleType } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';

interface LocationSelectProps {
  onChange?: (city: PlaceResult | null) => void;
  value?: PlaceResult | null;
  label: string;
  placeholder: string;
  currentLocale: LocaleType;
}

export function LocationSelect({ onChange, value, label, placeholder, currentLocale }: LocationSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [cities, setCities] = React.useState<PlaceResult[]>([]);
  const [selectedCity, setSelectedCity] = React.useState<PlaceResult | null>(value || null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { t } = useTranslation(currentLocale, 'translation');
  // Debounced search function
  const searchCities = React.useCallback(async (query: string) => {
    if (!query || query.length < 2) {
      setCities([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/places?query=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setCities(data.cities || []);
    } catch (err) {
      console.error('Failed to fetch cities:', err);
      setError('Failed to load cities. Please try again.');
      setCities([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        searchCities(searchTerm);
      } else {
        setCities([]);
      }
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, searchCities]);

  const handleSelectCity = (city: PlaceResult) => {
    setSelectedCity(city);
    if (onChange) {
      onChange(city);
    }
    setOpen(false);
    setSearchTerm('');
  };

  // Handle clearing selection
  const handleClearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCity(null);
    if (onChange) {
      onChange(null);
    }
    setSearchTerm('');
    setOpen(true);
  };

  // Update internal state when external value changes
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedCity(value);
    }
  }, [value]);

  return (
    <div className="relative space-y-1">
      <Label htmlFor="location-selector">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a location"
            className={cn('w-full justify-between', !selectedCity && 'text-muted-foreground')}
            id="location-selector"
          >
            {selectedCity ? (
              <div className="flex items-center gap-2 w-full">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">{`${selectedCity.name}, ${selectedCity.country}`}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSelection}
                  className="ml-auto h-6 w-6 p-0"
                  aria-label="Clear selection"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <span>{t(placeholder)}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
          <Command shouldFilter={false}>
            <CommandInput placeholder={placeholder} value={searchTerm} onValueChange={setSearchTerm} className="h-9" />
            <CommandList>
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : error ? (
                <div className="p-2">
                  <Alert variant="destructive" className="text-sm py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </div>
              ) : searchTerm.length > 0 ? (
                <>
                  <CommandEmpty>{t('msg.noCity')}</CommandEmpty>
                  <CommandGroup>
                    {cities.map((city) => (
                      <CommandItem
                        key={city.id}
                        value={city.id}
                        onSelect={() => handleSelectCity(city)}
                        className="flex items-center justify-between"
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2 truncate">
                                <MapPin className="h-4 w-4 shrink-0" />
                                <span className="truncate">{`${city.name}, ${city.country}`}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-xs">
                              <div className="space-y-1 text-xs">
                                <p>{city.fullAddress}</p>
                                <p className="text-muted-foreground">
                                  Lat: {city.latitude.toFixed(6)}, Lng: {city.longitude.toFixed(6)}
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <Check
                          className={cn('ml-auto h-4 w-4', selectedCity?.id === city.id ? 'opacity-100' : 'opacity-0')}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              ) : (
                <div className="py-6 text-center text-sm text-muted-foreground">{t('msg.atLeastTwo')}</div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
