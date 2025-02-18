import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { TranslatedTitle } from './translated-title';
// import { JsonSchema } from './json.ld';
import { cn } from '@/lib/utils/styles';

type FaqProps = {
  faqList: Array<{ question: string; answer: string }>;
  containerClasses?: string;
};

export default function Faq(props: Readonly<FaqProps>) {
  const { faqList, containerClasses } = props;

  return (
    <div className={cn('flex flex-col max-w-[800px] m-auto', containerClasses)}>
      <TranslatedTitle translation="labels.faq" level="h4" className="text-center text-2xl my-2" />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="flex flex-col gap-4 col-span-1 md:col-span-3">
          <Accordion type="single" collapsible className="w-full md:w-[500px]">
            {faqList.map(({ question, answer }) => (
              <AccordionItem value={question} key={question}>
                <AccordionTrigger className="px-2 items-start text-start py-2 text-sm">{question}</AccordionTrigger>
                <AccordionContent>
                  <p className="ml-4 italic text-sm">{answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
