// 'use client';

// import * as React from 'react';
// import { useState } from 'react';
// import Link from 'next/link';
// import { PageContainer } from '@/components/shared/page-container';
// import { cn } from '@/lib/utils/styles';
// import { useParams } from 'next/navigation';
// import { useTranslation } from '@/i18n/client';
// import type { LocaleType } from '@/i18n/settings';
// import { LanguageSelector } from './language-selector';
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   NavigationMenuViewport,
// } from '@/components/ui/navigation-menu';
// import { navCategories } from '@/lib/constants/common';
// import { Calculator, LucideIcon } from 'lucide-react';
// import { NavbarToggle } from './navbar-toggle';

// export const CollapsibleNavbar = () => {
//   const [open, setOpen] = useState(false);
//   const params = useParams();
//   const { t } = useTranslation(params.locale as LocaleType, 'translation');

//   return (
//     <header>
//       <nav className={cn('ease-in top-0 right-0 z-50 left-0 bg-transparent')}>
//         <PageContainer className="transition-all duration-300 flex py-6">
//           <section className="w-full flex items-center rounded-md p-3 flex-col md:flex-row shadow-lg">
//             <div className="w-full md:w-auto flex items-center justify-between">
//               <Link
//                 title={t('labels.home')}
//                 href={params.locale ? `/${params.locale}` : '/'}
//                 className="text-primary flex items-center gap-1 mr-2"
//               >
//                 <Calculator />
//                 <span className="text-xl">E.W</span>
//               </Link>
//               {/* Mobile Links */}
//               <div className="z-20 flex items-center gap-2 md:hidden">
//                 <NavbarToggle open={open} toggle={() => setOpen(!open)} />
//               </div>
//             </div>

//             <div
//               style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
//               className={cn(
//                 'overflow-hidden grid transition-all duration-200 w-full md:hidden items-center',
//                 open ? 'pt-6' : ''
//               )}
//             >
//               <ul
//                 className={cn(
//                   'transition-all duration-100 min-h-0 justify-between text-base flex flex-col gap-2',
//                   open ? 'opacity-100' : 'opacity-0'
//                 )}
//               >
//                 {navCategories.flatMap(({ links }) =>
//                   links.map(({ label, href, icon: Icon }) => (
//                     <li key={href}>
//                       <Link
//                         className="flex items-center gap-2 py-2"
//                         title={t(`labels.${label}`)}
//                         href={`/${params.locale}${href}`}
//                         onClick={(o) => setOpen(!o)}
//                       >
//                         <Icon className="h-4 w-4" />
//                         <span className="text-sm font-medium leading-none">{t(`labels.${label}`)}</span>
//                       </Link>
//                     </li>
//                   ))
//                 )}
//                 <li>
//                   <LanguageSelector />
//                 </li>
//               </ul>
//             </div>
//             {/* Mobile Menu End */}

//             {/* Desktop Menu with Radix UI */}
//             <NavigationMenu className="hidden md:flex">
//               <NavigationMenuList>
//                 {navCategories.map(({ category, label, links }) => (
//                   <NavigationMenuItem key={category}>
//                     <NavigationMenuTrigger>{t(label)}</NavigationMenuTrigger>
//                     <NavigationMenuContent>
//                       <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//                         {links.map(({ label, href, icon }) => (
//                           <ListItem
//                             key={href}
//                             title={t(`labels.${label}`)}
//                             href={`/${params.locale}${href}`}
//                             icon={icon}
//                           />
//                         ))}
//                       </ul>
//                     </NavigationMenuContent>
//                   </NavigationMenuItem>
//                 ))}
//               </NavigationMenuList>
//               <NavigationMenuViewport />
//             </NavigationMenu>

//             <div className="hidden md:block ml-auto">
//               <LanguageSelector />
//             </div>
//           </section>
//         </PageContainer>
//       </nav>
//     </header>
//   );
// };

// const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'> & { icon: LucideIcon }>(
//   ({ className, title, icon: Icon, ...props }, ref) => {
//     return (
//       <li>
//         <NavigationMenuLink asChild>
//           <a
//             ref={ref}
//             className={cn(
//               'flex items-center space-x-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
//               className
//             )}
//             {...props}
//           >
//             <Icon className="h-4 w-4" />
//             <span className="text-sm font-medium leading-none">{title}</span>
//           </a>
//         </NavigationMenuLink>
//       </li>
//     );
//   }
// );
// ListItem.displayName = 'ListItem';
