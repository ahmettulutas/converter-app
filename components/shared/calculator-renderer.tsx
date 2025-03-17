import { LocaleType } from '@/i18n/settings';
import { AvailableCalculatorType } from '@/lib/constants/available-calculators';
import RisingSignCalculator from '../pages/rising-sign-calculator';
import BMICalculator from '../pages/body-mass-calculator';
import PercentageCalculator from '../pages/percentage-calculator';
import SexualOrientationTest from '../pages/sexual-calculator';
import SquareCalculator from '../pages/square-meter-calculator';
import SunSignCalculator from '../pages/sun-sign-calculator';

export const CalculatorRenderer = ({
  calculator,
  locale,
}: {
  calculator: AvailableCalculatorType;
  locale: LocaleType;
}) => {
  const calculatorComponents: Record<Partial<AvailableCalculatorType>, JSX.Element> = {
    'rising-sign-calculator': <RisingSignCalculator currentLocale={locale} />,
    'body-mass-calculator': <BMICalculator currentLocale={locale} />,
    'percentage-calculator': <PercentageCalculator currentLocale={locale} />,
    'sexual-calculator': <SexualOrientationTest currentLocale={locale} />,
    'square-calculator': <SquareCalculator currentLocale={locale} />,
    'sun-sign-calculator': <SunSignCalculator currentLocale={locale} />,
  };
  return <>{calculatorComponents[calculator] ?? null}</>;
};
