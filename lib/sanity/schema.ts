import { type SchemaTypeDefinition } from 'sanity';

import blogSchema from './blog-schema';
import categorySchema from './category-schema';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogSchema, categorySchema],
};
