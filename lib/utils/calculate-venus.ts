import { julian, planetposition } from 'astronomia';
import vsop87Dvenus from 'astronomia/data/vsop87Dvenus';
import { getUserTimeZoneOffset, getZodiacSign } from './calculate-rising';

/**
 * Calculate the Venus Sign based on birth time & location.
 *
 * @param birthDate - Date of birth in YYYY-MM-DD format
 * @param birthTime - Time of birth in HH:MM format
 * @param latitude - Latitude (decimal degrees)
 * @param longitude - Longitude (decimal degrees)
 * @param timeZone - UTC offset
 * @returns The Venus Sign
 */
export function calculateVenusSign(
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

  const venus = new planetposition.Planet(vsop87Dvenus);
  const venusCoords = venus.position(jd);

  return getZodiacSign(venusCoords.lon);
}
