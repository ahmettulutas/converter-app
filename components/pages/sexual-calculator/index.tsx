'use client';

import { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { options, orientations, questions } from '@/lib/utils/sexual-identity';
import { LocaleType } from '@/i18n/settings';
import { PageContainer } from '@/components/shared/page-container';
import { useTranslation } from '@/i18n/client';
import { Faq } from '@/components/shared/faq';
import { sexualFaqs } from '@/lib/constants/faq';

type Orientation = {
  name: string;
  description: string;
  score: number;
};

export default function SexualOrientationTest({ currentLocale }: Readonly<{ currentLocale: LocaleType }>) {
  const [answers, setAnswers] = useState<string[]>(new Array(questions[currentLocale].length).fill(''));
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Orientation[]>([]);
  const { t } = useTranslation(currentLocale, 'translation');
  const handleAnswerChange = (questionIndex: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };
  const resultRef = useRef<HTMLDivElement | null>(null);

  const calculateResults = () => {
    const newOrientations = orientations[currentLocale].map((o) => ({ ...o, score: 0 }));

    // Get respondent's gender from Question 2
    const respondentGender = answers[2];
    const isMale = respondentGender === 'man';
    const isFemale = respondentGender === 'woman';

    answers.forEach((answer, index) => {
      switch (index) {
        case 0:
        case 1:
        case 4:
        case 5:
          if (isMale) {
            if (answer === 'women' || answer === 'only-women' || answer === 'mostly-women')
              newOrientations[0].score += 2; // Hetero
            if (answer === 'men' || answer === 'only-men' || answer === 'mostly-men') newOrientations[1].score += 2; // Homo
          }
          if (isFemale) {
            if (answer === 'men' || answer === 'only-men' || answer === 'mostly-men') newOrientations[0].score += 2; // Hetero
            if (answer === 'women' || answer === 'only-women' || answer === 'mostly-women')
              newOrientations[1].score += 2; // Homo
          }
          if (answer === 'both') newOrientations[2].score += 1.5; // Bi
          if (answer === 'neither') newOrientations[4].score += 2; // Asexual
          break;
        case 2:
          if (answer === 'non-binary' || answer === 'other') newOrientations[3].score += 1.5;
          break;
        case 3:
          if (answer === 'only-women' || answer === 'only-men') newOrientations[0].score += 1.5;
          if (answer === 'both') newOrientations[2].score += 1.2;
          if (answer === 'neither') newOrientations[4].score += 2;
          break;
        case 6:
          if (answer === 'with-women' || answer === 'with-men') newOrientations[0].score += 1.5;
          if (answer === 'both') newOrientations[2].score += 1.5;
          if (answer === 'gender-independent') newOrientations[3].score += 1.5;
          break;
        case 7:
          if (answer === 'yes') newOrientations[4].score += 2;
          if (answer === 'sometimes') newOrientations[4].score += 1;
          break;
        case 8:
          if (answer === 'no') newOrientations[3].score += 1.5;
          break;
        case 9:
          if (answer === 'yes') newOrientations[2].score += 1.5;
          if (answer === 'sometimes') {
            newOrientations[2].score += 1;
            newOrientations[3].score += 1;
          }
        case 10:
          if (answer === 'always') newOrientations[3].score += 2;
          if (answer === 'often') newOrientations[3].score += 1.5;
          if (answer === 'rarely') newOrientations[2].score += 1;
          if (answer === 'never') newOrientations[0].score += 2;
          break;
        case 11:
          if (answer === 'stronger') newOrientations[3].score += 2;
          if (answer === 'weaker') newOrientations[4].score += 2;
          if (answer === 'same') {
            newOrientations[2].score += 1;
            newOrientations[3].score += 1;
          }
          break;
      }
    });

    const maxScore = Math.max(...newOrientations.map((o) => o.score));
    newOrientations.forEach((o) => (o.score = o.score > 0 ? (o.score / maxScore) * 100 : 0));
    setResults(newOrientations.sort((a, b) => b.score - a.score));
  };

  const handleSubmit = () => {
    calculateResults();
    setShowResults(true);

    // Scroll to results after a short delay (to ensure they are rendered)
    setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const renderResults = () => {
    return (
      <div className="p-4 bg-primary/10 rounded-md h-min" ref={resultRef}>
        <h3 className="font-semibold text-lg mb-2">{t('labels.testResult')}:</h3>
        <p className="mb-4">{t('labels.sexualResultDesc')}</p>
        {results.map((orientation, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{orientation.name}</span>
              <span>{Math.round(orientation.score)}%</span>
            </div>
            <Progress value={orientation.score} className="h-2" />
            <p className="text-sm mt-1">{orientation.description}</p>
          </div>
        ))}
        <p className="mt-4 text-sm">{t('labels.sexualResultWarn')}</p>
      </div>
    );
  };
  return (
    <PageContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-2 my-4">
      <h1 className="text-center text-2xl my-2 col-span-1 md:col-span-2">{t('labels.sexualIdentityTest')}</h1>
      <div className="col-span-1">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{t('labels.sexualIdentityTest')}</CardTitle>
            <CardDescription>{t('labels.sexualDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            {questions[currentLocale].map((question, index) => (
              <div key={index} className="mb-6">
                <p className="font-medium mb-2">{`${index + 1}. ${question}`}</p>
                <RadioGroup onValueChange={(value) => handleAnswerChange(index, value)} value={answers[index]}>
                  {options[currentLocale][index].map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`q${index}-option${optionIndex}`} />
                      <Label htmlFor={`q${index}-option${optionIndex}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={answers.some((answer) => answer === '')}>
              {t('labels.completeTest')}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="col-span-1 flex flex-col gap-4">
        {showResults && renderResults()}
        <Faq faqList={sexualFaqs[currentLocale]} containerClasses="m-0 w-full" />
      </div>
    </PageContainer>
  );
}
