import { z } from 'zod';

import dbSchema from './db.schema';

export const productSchema = dbSchema.extend({
  createdBy: z.string(),

  name: z.string(),
  image: z.string().optional(),

  price: z.number(),
  isSold: z.boolean().default(false),
}).strict();
