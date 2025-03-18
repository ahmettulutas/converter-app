'use client';
import { ArrowLeftRight, Calculator, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/layout/sidebar/mode-toggle';
import { navCategories } from '@/lib/constants/common';
import { LanguageSelector } from '../navbar/language-selector';
import { useTranslation } from '@/i18n/client';
import { useParams } from 'next/navigation';
import { LocaleType } from '@/i18n/settings';
import Link from 'next/link';

// Import your dataset (adjust the import path as needed)

export function AppSidebar() {
  const params = useParams();
  const { t } = useTranslation(params.locale as LocaleType, 'translation');
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2 font-semibold">
          <Calculator />
          <span>E.W</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="space-y-4 py-4">
          {navCategories.map((category) => (
            <div key={category.category} className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">{t(category.label)}</h2>
              <SidebarMenu>
                {category.links.map((link) => (
                  <SidebarMenuItem key={link.label}>
                    <SidebarMenuButton asChild>
                      <Link title={t(link.label)} href={`/${params.locale}${link.href}`}>
                        <link.icon className="mr-2 h-4 w-4" />
                        {t(link.label)}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <span /* href="/settings" */ className="flex items-center gap-2 text-sm">
            <Settings className="h-4 w-4" />
            Settings
          </span>
          <LanguageSelector />
          <ModeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
