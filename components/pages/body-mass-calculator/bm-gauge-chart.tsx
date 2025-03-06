'use client';

import { useState, useEffect, memo } from 'react';
import GaugeChart from 'react-gauge-chart';
import type { BMIResult } from '@/lib/utils/calculate-bmi';
import { LocaleType } from '@/i18n/settings';
import { useTranslation } from '@/i18n/client';

interface BMIGaugeChartProps {
  result: BMIResult;
  currentLocale: LocaleType;
}

export function BMIGaugeChart({ result, currentLocale }: BMIGaugeChartProps) {
  const { bmi } = result;
  const [mounted, setMounted] = useState(false);
  const [chartKey, setChartKey] = useState(0);
  const { t } = useTranslation(currentLocale, 'translation');
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setChartKey((prevKey) => prevKey + 1);
  }, [bmi]);

  if (!mounted) return <div className="h-[250px] w-full" />;

  const minBMI = 10;
  const maxBMI = 40;
  const normalizedBMI = Math.max(minBMI, Math.min(bmi, maxBMI));
  const bmiPercentage = (normalizedBMI - minBMI) / (maxBMI - minBMI);

  const arcLengths = [
    (18.5 - minBMI) / (maxBMI - minBMI), // Thin: 10-18.5
    (24.9 - 18.5) / (maxBMI - minBMI), // Normal: 18.5-24.9
    (29.9 - 25) / (maxBMI - minBMI), // Overweight: 25-29.9
    (maxBMI - 30) / (maxBMI - minBMI), // Obese: 30-40
  ];

  const categoryColors = ['#3b82f6', '#22c55e', '#f97316', '#ef4444']; // Blue, Green, Orange, Red

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <GaugeChart
          key={chartKey} // Forces reanimation on new input
          id="bmi-gauge"
          nrOfLevels={4} // Only 4 categories now
          arcsLength={arcLengths} // Segment proportions based on actual BMI ranges
          colors={categoryColors} // Category colors
          percent={bmiPercentage} // Normalize BMI to 0-1 range
          arcPadding={0.02} // Space between segments
          textColor="#333"
          formatTextValue={() => ''} // Hide default text
          needleColor="#333"
          needleBaseColor="#333"
          animate={true}
          cornerRadius={0} // Flat segments for clear boundaries
        />

        <div className="flex justify-between w-full text-center px-2 md:px-4 py-2">
          <div className="text-xs md:text-sm font-medium flex-1" style={{ color: '#3b82f6' }}>
            <div>{t('labels.bmi.gauge.thin')}</div>
            <div>{t('labels.bmi.gauge.thinRange')}</div>
          </div>
          <div className="text-xs md:text-sm font-medium flex-1" style={{ color: '#22c55e' }}>
            <div>{t('labels.bmi.gauge.normal')}</div>
            <div>{t('labels.bmi.gauge.normalRange')}</div>
          </div>
          <div className="text-xs md:text-sm font-medium flex-1" style={{ color: '#f97316' }}>
            <div>{t('labels.bmi.gauge.overweight')}</div>
            <div>{t('labels.bmi.gauge.overweightRange')}</div>
          </div>
          <div className="text-xs md:text-sm font-medium flex-1" style={{ color: '#ef4444' }}>
            <div>{t('labels.bmi.gauge.obese')}</div>
            <div>{t('labels.bmi.gauge.obeseRange')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(BMIGaugeChart);
