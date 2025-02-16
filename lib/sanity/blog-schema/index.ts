import { BookIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import categorySchema from '../category-schema';
import calculatorButtonSchema from '../button-schema';
import { availableLocales } from '@/i18n/settings';

export default defineType({
  name: 'blogs',
  title: 'Blogs',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('A slug is required to generate a page on the website'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: categorySchema.name }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/png, image/jpeg, image/gif, image/mov',
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
            },
          ],
        },
        //@ts-ignore
        calculatorButtonSchema,
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      validation: (rule) => rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
        },
      ],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'language',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1).max(1),
      options: {
        list: availableLocales.map((l) => ({ title: l, value: l })),
      },
    }),
  ],
});
