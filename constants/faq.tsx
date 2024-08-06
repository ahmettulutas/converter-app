import { LocaleType } from '@/i18n/settings';

export const weightFaqs: Record<LocaleType, Array<{ question: string; answer: string }>> = {
  tr: [
    {
      question: '1 kilo kaç gram eder?',
      answer: '1 kilo 1000 gram eder.',
    },
    {
      question: '1 ton kaç kilogramdır?',
      answer: '1 ton 1000 kilogramdır.',
    },
    {
      question: '1 pound kaç kilogram eder?',
      answer: '1 pound yaklaşık olarak 0,453592 kilogram eder.',
    },
    {
      question: '1 ons kaç gramdır?',
      answer: '1 ons yaklaşık olarak 28,35 gramdır.',
    },
    {
      question: 'Kilogramı pounda nasıl çeviririm?',
      answer: 'Kilogramı pounda çevirmek için kilogram değerini 2,20462 ile çarpın.',
    },
    {
      question: '1 taş kaç kilogramdır?',
      answer: '1 taş yaklaşık olarak 6,35029 kilogramdır.',
    },
    {
      question: '1 kilogram kaç ons eder?',
      answer: '1 kilogram yaklaşık olarak 35,274 ons eder.',
    },
    {
      question: 'Kilogramı gram cinsinden nasıl hesaplarım?',
      answer: 'Kilogram değerini 1000 ile çarparak gram değerini bulabilirsiniz.',
    },
  ],
  en: [
    {
      question: 'How many pounds in a kilogram?',
      answer: 'There are approximately 2.20462 pounds in a kilogram.',
    },
    {
      question: 'How many grams in an ounce?',
      answer: 'There are approximately 28.35 grams in an ounce.',
    },
    {
      question: 'How to convert pounds to kilograms?',
      answer: 'To convert pounds to kilograms, multiply the pound value by 0.453592.',
    },
    {
      question: 'How many kilograms in a ton?',
      answer: 'There are 1000 kilograms in a ton.',
    },
    {
      question: 'How to convert kilograms to pounds?',
      answer: 'To convert kilograms to pounds, multiply the kilogram value by 2.20462.',
    },
    {
      question: 'How many stones in a kilogram?',
      answer: 'There are approximately 0.157473 stones in a kilogram.',
    },
    {
      question: 'How many ounces in a kilogram?',
      answer: 'There are approximately 35.274 ounces in a kilogram.',
    },
    {
      question: 'How to convert grams to kilograms?',
      answer: 'To convert grams to kilograms, divide the gram value by 1000.',
    },
  ],
  de: [
    {
      question: 'Wie viele Pfund sind ein Kilogramm?',
      answer: 'Ein Kilogramm entspricht ungefähr 2,20462 Pfund.',
    },
    {
      question: 'Wie viele Gramm sind eine Unze?',
      answer: 'Eine Unze entspricht ungefähr 28,35 Gramm.',
    },
    {
      question: 'Wie rechne ich Pfund in Kilogramm um?',
      answer: 'Um Pfund in Kilogramm umzuwandeln, multiplizieren Sie den Pfundwert mit 0,453592.',
    },
    {
      question: 'Wie viele Kilogramm sind eine Tonne?',
      answer: 'Eine Tonne entspricht 1000 Kilogramm.',
    },
    {
      question: 'Wie rechne ich Kilogramm in Pfund um?',
      answer: 'Um Kilogramm in Pfund umzuwandeln, multiplizieren Sie den Kilogrammwert mit 2,20462.',
    },
    {
      question: 'Wie viele Steine sind ein Kilogramm?',
      answer: 'Ein Kilogramm entspricht ungefähr 0,157473 Steinen.',
    },
    {
      question: 'Wie viele Unzen sind ein Kilogramm?',
      answer: 'Ein Kilogramm entspricht ungefähr 35,274 Unzen.',
    },
    {
      question: 'Wie rechne ich Gramm in Kilogramm um?',
      answer: 'Um Gramm in Kilogramm umzuwandeln, teilen Sie den Grammwert durch 1000.',
    },
  ],
};

export const lengthFaqs: Record<LocaleType, Array<{ question: string; answer: string }>> = {
  tr: [
    {
      question: '1 metre kaç santimetre eder?',
      answer: '1 metre 100 santimetre eder.',
    },
    {
      question: '1 kilometre kaç metredir?',
      answer: '1 kilometre 1000 metredir.',
    },
    {
      question: '1 mil kaç kilometredir?',
      answer: '1 mil yaklaşık olarak 1,60934 kilometredir.',
    },
    {
      question: '1 inç kaç santimetre eder?',
      answer: '1 inç yaklaşık olarak 2,54 santimetre eder.',
    },
    {
      question: 'Metreyi inç olarak nasıl çeviririm?',
      answer: 'Metreyi inç olarak çevirmek için metre değerini 39,3701 ile çarpın.',
    },
    {
      question: '1 fit kaç santimetredir?',
      answer: '1 fit yaklaşık olarak 30,48 santimetredir.',
    },
    {
      question: '1 yard kaç metredir?',
      answer: '1 yard yaklaşık olarak 0,9144 metredir.',
    },
    {
      question: 'İnç ile santimetre nasıl çevrilir?',
      answer: 'İnç değerini 2.54 ile çarparak santimetreye dönüştürebilirsiniz.',
    },
    {
      question: 'Feet ve metre arasındaki fark nedir?',
      answer: 'Bir metre bir fitten biraz daha uzundur. Yaklaşık olarak 3.28 feet bir metreye eşittir.',
    },
    {
      question: 'Mil ile kilometre nasıl çevrilir?',
      answer: 'Mil değerini 1.609 ile çarparak kilometreye dönüştürebilirsiniz.',
    },
  ],
  en: [
    {
      question: 'How to convert inches to centimeters?',
      answer: 'Multiply the number of inches by 2.54 to get the equivalent in centimeters.',
    },
    {
      question: 'What is the difference between feet and meters?',
      answer: 'A meter is slightly longer than a foot. There are approximately 3.28 feet in a meter.',
    },
    {
      question: 'How to convert miles to kilometers?',
      answer: 'Multiply the number of miles by 1.609 to get the equivalent in kilometers.',
    },
    {
      question: 'How many centimeters in a meter?',
      answer: 'There are 100 centimeters in a meter.',
    },
    {
      question: 'How many meters in a kilometer?',
      answer: 'There are 1000 meters in a kilometer.',
    },
    {
      question: 'How many kilometers in a mile?',
      answer: 'There are approximately 1.60934 kilometers in a mile.',
    },
    {
      question: 'How many centimeters in an inch?',
      answer: 'There are approximately 2.54 centimeters in an inch.',
    },
    {
      question: 'How to convert meters to inches?',
      answer: 'To convert meters to inches, multiply the meter value by 39.3701.',
    },
    {
      question: 'How many centimeters in a foot?',
      answer: 'There are approximately 30.48 centimeters in a foot.',
    },
    {
      question: 'How many meters in a yard?',
      answer: 'There are approximately 0.9144 meters in a yard.',
    },
  ],
  de: [
    {
      question: 'Wie viele Zentimeter sind ein Meter?',
      answer: 'Ein Meter entspricht 100 Zentimetern.',
    },
    {
      question: 'Wie viele Meter sind ein Kilometer?',
      answer: 'Ein Kilometer entspricht 1000 Metern.',
    },
    {
      question: 'Wie viele Kilometer sind eine Meile?',
      answer: 'Eine Meile entspricht ungefähr 1,60934 Kilometern.',
    },
    {
      question: 'Wie viele Zentimeter sind ein Zoll?',
      answer: 'Ein Zoll entspricht ungefähr 2,54 Zentimetern.',
    },
    {
      question: 'Wie rechne ich Meter in Zoll um?',
      answer: 'Um Meter in Zoll umzuwandeln, multiplizieren Sie den Meterwert mit 39,3701.',
    },
    {
      question: 'Wie viele Zentimeter sind ein Fuß?',
      answer: 'Ein Fuß entspricht ungefähr 30,48 Zentimetern.',
    },
    {
      question: 'Wie viele Meter sind ein Yard?',
      answer: 'Ein Yard entspricht ungefähr 0,9144 Metern.',
    },
    {
      question: 'Wie wandelt man Zoll in Zentimeter um?',
      answer: 'Multiplizieren Sie die Anzahl der Zoll mit 2,54, um den Wert in Zentimeter zu erhalten.',
    },
    {
      question: 'Was ist der Unterschied zwischen Fuß und Meter?',
      answer: 'Ein Meter ist etwas länger als ein Fuß. Etwa 3,28 Fuß entsprechen einem Meter.',
    },
    {
      question: 'Wie wandelt man Meilen in Kilometer um?',
      answer: 'Multiplizieren Sie die Anzahl der Meilen mit 1,609, um den Wert in Kilometer zu erhalten.',
    },
  ],
};
