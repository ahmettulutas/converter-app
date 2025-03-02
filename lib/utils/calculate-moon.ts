import { julian, planetposition } from 'astronomia';
import vsop87Dmoon from 'astronomia/data/elpMppDe';
import { getUserTimeZoneOffset, getZodiacSign } from './calculate-rising';

/**
 * Calculate the Moon Sign based on birth time & location.
 *
 * @param birthDate - Date of birth in YYYY-MM-DD format
 * @param birthTime - Time of birth in HH:MM format
 * @param latitude - Latitude (decimal degrees)
 * @param longitude - Longitude (decimal degrees)
 * @param timeZone - UTC offset
 * @returns The Moon Sign
 */
export function calculateMoonSign(
  birthDate: string,
  birthTime: string,
  latitude: number,
  longitude: number,
  timeZone: number = getUserTimeZoneOffset()
): string {
  const [year, month, day] = birthDate.split('-').map(Number);
  const [hour, minute] = birthTime.split(':').map(Number);

  const utHour = hour - timeZone;
  const utMinute = minute;
  const jd = julian.CalendarGregorianToJD(year, month, day) + (utHour + utMinute / 60) / 24;

  const moon = new planetposition.Planet(vsop87Dmoon);
  const moonCoords = moon.position(jd);

  return getZodiacSign(moonCoords.lon);
}
