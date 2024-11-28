import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { TranslatedTitle } from './translated-title';
import { JsonSchema } from './json.ld';

type FaqProps = {
  faqList: Array<{ question: string; answer: string }>;
};

export function Faq(props: Readonly<FaqProps>) {
  const { faqList } = props;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <>
      <TranslatedTitle translation="labels.faq" className="text-center text-2xl my-2" />
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-[800px] m-auto">
        <div className="flex flex-col gap-4 col-span-1 md:col-span-3 min-w-">
          <Accordion type="single" collapsible className="w-full md:w-[500px]">
            {faqList.map(({ question, answer }) => (
              <AccordionItem value={question} key={question}>
                <AccordionTrigger className="px-2 items-start text-start">{question}</AccordionTrigger>
                <AccordionContent>
                  <p className="ml-4 italic">{answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        {/* <div className="col-span-1 md:col-span-1">
          <TableofContent faqList={faqList} />
        </div> */}
      </div>

      <JsonSchema schema={faqSchema} />
    </>
  );
}
