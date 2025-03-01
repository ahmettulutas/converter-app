// Helper function to format degrees as degrees, minutes, seconds
export const formatDMS = (degrees: number): string => {
  const totalSeconds = Math.abs(degrees * 3600);
  const degs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.round(totalSeconds % 60);
  return `${degs}°${mins}'${secs}"`;
};

// Helper function to format hours as HH:MM:SS
export const formatHMS = (hours: number): string => {
  hours = hours % 24;
  if (hours < 0) hours += 24;

  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  const s = Math.round(((hours - h) * 60 - m) * 60);

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// Calculate Julian Date from Gregorian date
export const calculateJulianDate = (
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number
): number => {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }

  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);

  const JDN = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  return JDN + (hours + minutes / 60) / 24;
};

// Calculate Greenwich Mean Sidereal Time (GMST)
export const calculateGMST = (UT: number): number => {
  // Convert UT to Sidereal Time
  const GMST = UT * 1.00273790935; // Corrected factor for UT to GMST conversion
  return GMST;
};

// Calculate Local Sidereal Time (LST)
export const calculateLST = (GMST: number, longitude: number): number => {
  // Convert longitude to time (1° = 4 minutes)
  const longitudeTime = longitude * 4; // in minutes
  const longitudeHours = longitudeTime / 60; // in hours

  // Add longitude adjustment to GMST
  let LST = GMST + longitudeHours;
  return LST;
};

// Add sidereal time for a specific date (e.g., 9 Dec 1993)
export const addSiderealTime = (LST: number): number => {
  const siderealTime = 5 + 10 / 60 + 60 / 3600; // 05:10:60 in hours
  return LST + siderealTime;
};

// Calculate the Ascendant (Rising Sign)
export const calculateAscendant = (LST: number, latitude: number): number => {
  // Convert LST to radians
  const LSTRad = (LST * 15 * Math.PI) / 180; // LST is in hours, so multiply by 15 to get degrees

  // Convert latitude to radians
  const latRad = (latitude * Math.PI) / 180;

  // Obliquity of the ecliptic (approx. 23.4393 degrees for J2000.0)
  const obliquityRad = (23.4393 * Math.PI) / 180;

  // Calculate the ascendant
  const ascRad = Math.atan2(
    Math.cos(LSTRad),
    Math.sin(LSTRad) * Math.cos(obliquityRad) + Math.tan(latRad) * Math.sin(obliquityRad)
  );

  // Convert the ascendant to degrees
  let ascendant = (ascRad * 180) / Math.PI;

  // Normalize to [0, 360)
  if (ascendant < 0) ascendant += 360;

  return ascendant;
};

// Determine which zodiac sign a given ecliptic longitude falls in
export const getZodiacSignAndDegrees = (longitude: number) => {
  const signs = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces',
  ];

  const signIndex = Math.floor(longitude / 30) % 12;
  const sign = signs[signIndex];

  const posInSign = longitude % 30;
  const degrees = Math.floor(posInSign);
  const minutesFloat = (posInSign - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Math.round((minutesFloat - minutes) * 60);

  return { sign, degrees, minutes, seconds };
};

// Get explanation for each sign
export const getSignExplanation = (sign: string): string => {
  const explanations: { [key: string]: string } = {
    Aries: 'With Aries rising, you come across as energetic, direct, and assertive.',
    Taurus: 'With Taurus rising, you appear steady, reliable, and practical.',
    Gemini: 'With Gemini rising, you come across as quick-witted, versatile, and communicative.',
    Cancer: 'With Cancer rising, you appear nurturing, sensitive, and protective.',
    Leo: 'With Leo rising, you come across as confident, dramatic, and warm-hearted.',
    Virgo: 'With Virgo rising, you appear analytical, precise, and helpful.',
    Libra: 'With Libra rising, you come across as diplomatic, charming, and balanced.',
    Scorpio: 'With Scorpio rising, you appear intense, mysterious, and perceptive.',
    Sagittarius: 'With Sagittarius rising, you come across as optimistic, adventurous, and straightforward.',
    Capricorn: 'With Capricorn rising, you appear responsible, disciplined, and ambitious.',
    Aquarius: 'With Aquarius rising, you come across as progressive, intellectual, and unique.',
    Pisces: 'With Pisces rising, you appear dreamy, compassionate, and intuitive.',
  };

  return explanations[sign] || 'No explanation available.';
};
