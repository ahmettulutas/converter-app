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

// Convert local time to UT
export const convertToUT = (localHour: number, timezoneOffset: number): number => {
  return localHour - timezoneOffset;
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

  const JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  return JD + (hours + minutes / 60) / 24;
};

// Calculate Greenwich Mean Sidereal Time (GMST) correctly
export const calculateGMST = (UT: number): number => {
  return (UT * 1.002738) % 24;
};

// Apply longitude correction to GMST to compute Local Sidereal Time (LST)
export const calculateLST = (GMST: number, longitude: number): number => {
  const longitudeOffset = longitude / 15; // Convert degrees to hours
  return (GMST + longitudeOffset) % 24;
};

// Add sidereal time for the date (e.g., 9 Dec 1993: 5h 10m 60s)
export const addSiderealTime = (LST: number, year: number, month: number, day: number): number => {
  // Calculate days since J2000.0
  const JD = calculateJulianDate(year, month, day, 0, 0); // Midnight Julian Date
  const D = JD - 2451545.0;

  // Sidereal time correction based on Earth's rotation (formula)
  const siderealCorrection = (D * 0.06570982441908) % 24;

  return (LST + siderealCorrection) % 24;
};
export const calculateAscendant = (
  UTCHours: number,
  UTCMinutes: number,
  latitude: number,
  longitude: number,
  julianDate: number
): number => {
  const degToRad = (deg: number) => (deg * Math.PI) / 180;
  const radToDeg = (rad: number) => (rad * 180) / Math.PI;

  // ✅ Step 1: Compute Julian Centuries from J2000.0
  const T = (julianDate - 2451545.0) / 36525;

  // ✅ Step 2: Compute Obliquity of the Ecliptic (JPL Horizons Formula)
  const obliquity =
    (((((-4.34e-8 * T - 5.76e-7) * T + 0.0020034) * T - 1.831e-4) * T - 46.836769) * T) / 3600 + 23.4392794444444;
  const obliquityRad = degToRad(obliquity);

  // ✅ Step 3: Compute Greenwich Mean Sidereal Time (GMST)
  let GMST = (67310.548 + (3155760000 + 8640184.812866) * T + 0.093104 * T ** 2 - 6.2e-6 * T ** 3) / 3600;
  GMST = GMST % 24; // Normalize to 0-24 hours

  // ✅ Step 4: Compute Local Sidereal Time (LST)
  const LSTHours = (GMST + longitude / 15) % 24; // Convert longitude to time (1° = 4 min)
  const LSTDegrees = LSTHours * 15; // Convert LST from hours to degrees
  const LSTRad = degToRad(LSTDegrees);

  // ✅ Step 5: Compute Ascendant Using Correct Formula
  let ascRad = Math.atan2(
    Math.cos(LSTRad),
    -(Math.sin(LSTRad) * Math.cos(obliquityRad) + Math.tan(degToRad(latitude)) * Math.sin(obliquityRad))
  );

  let ascendant = radToDeg(ascRad) % 360; // Convert to degrees and normalize
  if (ascendant < 0) ascendant += 360;

  return ascendant;
};

// Determine zodiac sign and its position within the sign
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

// Explanation for each zodiac sign
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
