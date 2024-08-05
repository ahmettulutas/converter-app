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
        <ul className="flex flex-col gap-4 col-span-1 md:col-span-2">
          {faqList.map(({ question, answer }) => (
            <li key={question} id={question}>
              <h4 className="font-semibold text-lg">{question}</h4>
              <p className="ml-2">{`- ${answer}`}</p>
            </li>
          ))}
        </ul>
        <div className="col-span-1 md:col-span-1">
          <TableofContent faqList={faqList} />
        </div>
      </div>
    </>
  );
}
