import DualBirthMapCalculator from '@/components/pages/birth-map-calculator';
import { SharedPageProps } from '../layout';

export default function Page(props: Readonly<SharedPageProps>) {
  const { params } = props;
  return <DualBirthMapCalculator currentLocale={params.locale} />;
}
