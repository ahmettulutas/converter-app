'use client';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

// import { JsonSchema } from './json.ld';
import { cn } from '@/lib/utils/styles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useTranslation } from '@/i18n/client';
import { useParams } from 'next/navigation';
import { LocaleType } from '@/i18n/settings';
export type FaqProps = {
  faqList: Array<{ question: string; answer: string }>;
  containerClasses?: string;
};

export default function Faq(props: Readonly<FaqProps>) {
  const { faqList, containerClasses } = props;
  const params = useParams();
  const { t } = useTranslation(params.lng as LocaleType, 'translation');
  return (
    <Card className={cn(containerClasses)}>
      <CardHeader>
        <CardTitle>{t('labels.faq')}</CardTitle>
      </CardHeader>

      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqList.map(({ question, answer }) => (
            <AccordionItem value={question} key={question}>
              <AccordionTrigger className="px-2 items-start text-start py-2 text-sm">{question}</AccordionTrigger>
              <AccordionContent>
                <p className="ml-4 italic text-sm">{answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
