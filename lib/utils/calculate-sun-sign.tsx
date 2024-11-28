const zodiacSigns = [
  'Capricorn',
  'Aquarius',
  'Pisces',
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
];

const zodiacDates = [
  { month: 1, day: 20 },
  { month: 2, day: 19 },
  { month: 3, day: 20 },
  { month: 4, day: 20 },
  { month: 5, day: 21 },
  { month: 6, day: 21 },
  { month: 7, day: 23 },
  { month: 8, day: 23 },
  { month: 9, day: 23 },
  { month: 10, day: 23 },
  { month: 11, day: 22 },
  { month: 12, day: 22 },
];

export const calculateSunSign = (birthDate: string, birthHour: string): string => {
  const date = new Date(birthDate);

  if (isNaN(date.getTime())) return 'Invalid birth date';

  const month = date.getMonth() + 1; // JavaScript months are 0-indexed
  const day = date.getDate();
  const hour = parseInt(birthHour.split(':')[0], 10);

  for (let i = 0; i < zodiacDates.length; i++) {
    if (
      (month === zodiacDates[i].month && day > zodiacDates[i].day) ||
      (month === zodiacDates[i].month && day === zodiacDates[i].day && hour >= 12) ||
      (month === zodiacDates[i].month + 1 && day < zodiacDates[i + 1 >= 12 ? 0 : i + 1].day) ||
      (month === zodiacDates[i].month + 1 && day === zodiacDates[i + 1 >= 12 ? 0 : i + 1].day && hour < 12)
    ) {
      return zodiacSigns[i];
    }
  }

  return zodiacSigns[0]; // Default to Capricorn if something goes wrong
};
