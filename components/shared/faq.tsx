import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { TableofContent } from './collapsible';
import { TranslatedTitle } from './translated-title';

type FaqProps = {
  faqList: Array<{ question: string; answer: string }>;
};

export function Faq(props: Readonly<FaqProps>) {
  const { faqList } = props;

  return (
    <>
      <TranslatedTitle translation="labels.faq" className="text-center text-2xl my-2" />
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[800px] m-auto">
        <div className="flex flex-col gap-4 col-span-1 md:col-span-2">
          <Accordion type="single" collapsible className="w-full">
            {faqList.map(({ question, answer }, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-2">{question}</AccordionTrigger>
                <AccordionContent>
                  <p className="ml-2">{answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="col-span-1 md:col-span-1">
          <TableofContent faqList={faqList} />
        </div>
      </div>
    </>
  );
}
