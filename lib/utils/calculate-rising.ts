export const zodiacSigns = [
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
export type RisingSignProps = {
  birthDate: string;
  birthTime: string;
  longitude: number;
  latitude: number;
  country: string;
  city: string;
};

// Rising sign calculation logic
export const calculateRisingSign = ({ birthDate, birthTime, latitude, longitude }: RisingSignProps): string => {
  const date = new Date(`${birthDate}T${birthTime}`);

  // Ensure valid birth date and time
  if (isNaN(date.getTime())) return 'Invalid birth date or time';

  const julianDate = date.getTime() / 86400000 + 2440587.5; // Julian date

  // Calculate Julian centuries since J2000.0
  const century = (julianDate - 2451545) / 36525;

  // Calculate Greenwich Sidereal Time (GST) in degrees
  let siderealTime =
    (100.46061837 +
      36000.770053608 * century +
      0.000387933 * century * century -
      (century * century * century) / 38710000) %
    360;

  // Adjust sidereal time for observer's longitude (in degrees)
  siderealTime = (siderealTime + longitude) % 360;

  // Calculate Local Sidereal Time (LST)
  const lstHours = (siderealTime / 15 + date.getUTCHours() + date.getUTCMinutes() / 60) % 24;

  // Calculate the ascendant in degrees (360 degrees divided into 12 zodiac signs)
  const ascendant = (lstHours * 15 + latitude) % 360;

  // Each zodiac sign covers 30 degrees, so divide ascendant by 30 to get sign index
  const signIndex = Math.floor(ascendant / 30);

  // Return corresponding zodiac sign
  return zodiacSigns[signIndex];
};
