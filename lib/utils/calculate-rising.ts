export const zodiacSigns: ZodiacSign[] = [
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

// Define zodiac sign type
export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

// Define interface for rising sign result
export interface RisingSignResult {
  risingSign: ZodiacSign;
  position: string;
  explanation: string;
  technicalDetails: {
    julianDate: string;
    ascendantLongitude: string;
    latitude: string;
    longitude: string;
    timezoneOffset: string;
    lst: string;
    gmst: string;
  };
}

// Format hours to HH:MM:SS.sss
export const formatHMS = (hours: number): string => {
  const h = Math.floor(hours);
  let remainder = (hours - h) * 60;
  const m = Math.floor(remainder);
  remainder = (remainder - m) * 60;
  const s = remainder.toFixed(3);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.padStart(6, '0')}`;
};

// Get zodiac sign from angle
export const getZodiacSign = (angle: number): ZodiacSign => {
  const signIndex = Math.floor(angle / 30);
  return zodiacSigns[signIndex % 12];
};

// Format zodiac position (sign and degrees)
export const formatZodiacPosition = (angle: number): string => {
  const signIndex = Math.floor(angle / 30);

  const sign = zodiacSigns[signIndex % 12];
  const degrees = angle % 30;
  return `${degrees.toFixed(1)}° ${sign}`;
};

// Calculate rising sign based on birth details
export const calculateAscendant = (
  birthDate: string,
  birthTime: string,
  latitude: string,
  longitude: string
): { result: RisingSignResult | null; error: string } => {
  let error = '';
  let result: RisingSignResult | null = null;

  if (!birthDate || !birthTime || !latitude || !longitude) {
    return { result: null, error: 'fillAllFields' };
  }

  try {
    // Parse input values
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      return { result: null, error: 'Latitude must be a number between -90 and 90' };
    }

    if (isNaN(lon) || lon < -180 || lon > 180) {
      return { result: null, error: 'Longitude must be a number between -180 and 180' };
    }

    // Combine date and time into a UTC datetime
    const localDateTimeStr = `${birthDate}T${birthTime}:00`;
    const localDateTime = new Date(localDateTimeStr);

    if (isNaN(localDateTime.getTime())) {
      return { result: null, error: 'Invalid date or time format' };
    }

    // Convert to UTC for calculations
    const utcDateTime = new Date(localDateTime);

    // Calculate days since J2000 epoch (Noon, 1 Jan 2000 UTC)
    const dayZero = new Date('2000-01-01T12:00:00Z');
    const d = (utcDateTime.getTime() - dayZero.getTime()) / (1000 * 86400);

    // Julian centuries
    const T = d / 36525;

    // Calculate obliquity of the ecliptic
    const oe =
      (((((-4.34e-8 * T - 5.76e-7) * T + 0.0020034) * T - 1.831e-4) * T - 46.836769) * T) / 3600 + 23.4392794444444;
    const oer = (oe * Math.PI) / 180; // Convert to radians

    // Calculate Greenwich Mean Sidereal Time
    let gmst =
      ((67310.548 + (3155760000 + 8640184.812866) * T + 0.093104 * Math.pow(T, 2) - 6.2e-6 * Math.pow(T, 3)) / 3600) %
      24;

    // Calculate Local Sidereal Time
    const lst = (gmst + lon / 15) % 24;

    // Convert Local Sidereal Time to radians
    const lstr = (lst * 15 * Math.PI) / 180;

    // Calculate Ascendant
    const ascr = Math.atan2(
      Math.cos(lstr),
      -(Math.sin(lstr) * Math.cos(oer) + Math.tan((lat * Math.PI) / 180) * Math.sin(oer))
    );
    const asc = ((ascr * 180) / Math.PI + 360) % 360;

    // Convert ascendant to zodiac sign and position
    const sign = getZodiacSign(asc);
    const position = formatZodiacPosition(asc);

    // Format technical details for display
    const technicalDetails = {
      julianDate: (d + 2451545).toFixed(5),
      ascendantLongitude: asc.toFixed(2) + '°',
      latitude: lat.toFixed(4) + '°',
      longitude: lon.toFixed(4) + '°',
      timezoneOffset: (localDateTime.getTimezoneOffset() / -60).toFixed(2) + ' hours',
      lst: formatHMS(lst),
      gmst: formatHMS(gmst),
    };

    // Set results
    result = {
      risingSign: sign,
      position,
      explanation: `risingSign.explanations.${sign.toLowerCase()}`,
      technicalDetails,
    };

    return { result, error: '' };
  } catch (err) {
    console.error(err);
    return { result: null, error: 'An error occurred during calculation. Please check your inputs.' };
  }
};
