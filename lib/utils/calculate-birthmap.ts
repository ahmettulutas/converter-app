// Import required modules from astronomia
import julian from 'astronomia/julian';
import solar from 'astronomia/solar';
import lunar from 'astronomia/moonposition';
import planetposition from 'astronomia/planetposition';

// Import dedicated VSOP87 data sets using correct paths:
import vsop87Bmercury from 'astronomia/data/vsop87Bmercury';
import vsop87Bvenus from 'astronomia/data/vsop87Bvenus';
import vsop87Bmars from 'astronomia/data/vsop87Bmars';
import vsop87Bjupiter from 'astronomia/data/vsop87Bjupiter';
import vsop87Bsaturn from 'astronomia/data/vsop87Bsaturn';

// Helper functions
export function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}
export function radToDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

export function normalizeAngle(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

/**
 * Convert a Gregorian date/time to a Julian Day.
 * Uses astronomia/julian.
 */
export function toJulianDay(year: number, month: number, day: number, hour = 0, minute = 0, second = 0): number {
  const dayFraction = (hour + minute / 60 + second / 3600) / 24;
  return julian.CalendarGregorianToJD(year, month, day + dayFraction);
}

/**
 * Calculate GMST (Greenwich Mean Sidereal Time) in degrees.
 */
export function calcGMST(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  let GMST = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000;
  return normalizeAngle(GMST);
}

/**
 * Calculate the Ascendant.
 * This computes local sidereal time then converts to an ecliptic angle.
 */
export function calcAscendant(jd: number, lat: number, lon: number): number {
  const GMST = calcGMST(jd);
  const LST = normalizeAngle(GMST + lon);
  const obliquity = 23.4397; // approximate obliquity of the ecliptic
  const ascRad = Math.atan2(-Math.cos(degToRad(obliquity)) * Math.sin(degToRad(LST)), Math.cos(degToRad(LST)));
  let ascDeg = radToDeg(ascRad);
  if (ascDeg < 0) ascDeg += 360;
  return normalizeAngle(ascDeg);
}

/**
 * Compute chart data using astronomia routines and VSOP87 data.
 * Calculates accurate positions for Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn.
 * Houses are computed as 12 equal divisions starting at the Ascendant.
 */
type ChartData = {
  planets: { [key: string]: number[] };
  cusps: number[];
};

export function computeChartData(date: string, time: string, lat: number, lon: number): ChartData {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const jd = toJulianDay(year, month, day, hour, minute, 0);

  const sunLon = normalizeAngle(radToDeg(solar.apparentLongitude(jd)));
  const moonLon = normalizeAngle(radToDeg(lunar.position(jd).lon));

  const mercury = new planetposition.Planet(vsop87Bmercury);
  const mercuryLon = normalizeAngle(radToDeg(mercury.position(jd).lon));

  const venus = new planetposition.Planet(vsop87Bvenus);
  const venusLon = normalizeAngle(radToDeg(venus.position(jd).lon));

  const mars = new planetposition.Planet(vsop87Bmars);
  const marsLon = normalizeAngle(radToDeg(mars.position(jd).lon));

  const jupiter = new planetposition.Planet(vsop87Bjupiter);
  const jupiterLon = normalizeAngle(radToDeg(jupiter.position(jd).lon));

  const saturn = new planetposition.Planet(vsop87Bsaturn);
  const saturnLon = normalizeAngle(radToDeg(saturn.position(jd).lon));

  const asc = calcAscendant(jd, lat, lon);
  const cusps = Array.from({ length: 12 }, (_, i) => normalizeAngle(asc + i * 30));

  return {
    planets: {
      Sun: [sunLon],
      Moon: [moonLon],
      Mercury: [mercuryLon],
      Venus: [venusLon],
      Mars: [marsLon],
      Jupiter: [jupiterLon],
      Saturn: [saturnLon],
    },
    cusps,
  };
}
