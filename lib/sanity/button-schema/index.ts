import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'calculatorButton',
  title: 'Calculator Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button Label',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Button URL',
      type: 'url',
    }),
  ],
});
