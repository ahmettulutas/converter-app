'use client';

import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Link from 'next/link';
import { TranslatedTitle } from './translated-title';
import { CardContainer } from './card-container';

type TableofContentProps = {
  faqList: Array<{ question: string; answer: string }>;
};
export function TableofContent(props: Readonly<TableofContentProps>) {
  const { faqList } = props;
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm">
            <TranslatedTitle level="h3" translation="labels.toc" className="text-center text-md my-2" />
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-2 text-sm">
        <CardContainer>
          <ul className="flex flex-col gap-2">
            {faqList.map((faq) => (
              <ol key={faq.question} className="hover:underline">
                <Link href={`#${faq.question}`}>{faq.question}</Link>
              </ol>
            ))}
          </ul>
        </CardContainer>
      </CollapsibleContent>
    </Collapsible>
  );
}
