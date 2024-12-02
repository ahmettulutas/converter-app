'use client';
import { useState } from 'react';

import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { NavbarToggle } from './navbar-toggle';
import { PageContainer } from '@/components/shared/page-container';
import { cn } from '@/lib/utils/styles';
import { navLinks } from '@/lib/constants/common';
import { LanguageSelector } from './language-selector';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/i18n/client';
import { LocaleType } from '@/i18n/settings';

export const CollapsibleNavbar = () => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const { t } = useTranslation(params.locale as LocaleType, 'translation');
  return (
    <header>
      <nav className={cn('ease-in top-0 right-0 z-50 left-0 bg-transparent')}>
        <PageContainer className="transition-all duration-300 flex py-6">
          <section className="w-full flex items-center rounded-md p-3 flex-col md:flex-row shadow-lg">
            <div className="w-full md:w-auto flex items-center justify-between">
              <Link
                title={t('labels.home')}
                href={params.locale ? `/${params.locale}` : '/'}
                className="text-primary flex items-center gap-1"
              >
                <Calculator />
                <span className="text-xl">E.W</span>
              </Link>
              {/* Mobile Links */}
              <div className="z-20 flex items-center gap-2 md:hidden">
                <NavbarToggle open={open} toggle={() => setOpen(!open)} />
              </div>
            </div>
            <div
              style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
              className={cn(
                'overflow-hidden grid transition-all duration-200 w-full md:hidden items-center',
                open ? 'pt-6' : ''
              )}
            >
              <ul
                className={cn(
                  'transition-all duration-100 min-h-0 justify-between text-base flex flex-col gap-2',
                  open ? 'opacity-100' : 'opacity-0'
                )}
              >
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link title={t(`labels.${label}`)} href={`/${params.locale}${href}`}>
                      {t(`labels.${label}`)}
                    </Link>
                  </li>
                ))}
                <li>
                  <LanguageSelector />
                </li>
              </ul>
            </div>
            {/* Mobile Links end */}
            {/* Desktop Links */}
            <ul className="gap-4 hidden md:flex justify-between m-auto text-sm">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    title={t(`labels.${label}`)}
                    href={`/${params.locale}${href}`}
                    className="h-full block relative mx-auto hover:underline"
                  >
                    {t(`labels.${label}`)}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Desktop Links end */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
          </section>
        </PageContainer>
      </nav>
    </header>
  );
};
