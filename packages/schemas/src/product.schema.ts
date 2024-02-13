import { z } from 'zod';

import dbSchema from './db.schema';

export const productSchema = dbSchema.extend({
  createdBy: z.string(),

  name: z.string(),
  image: z.string().optional(),

  price: z.number(),
  quantity: z.number().default(1),
  remain: z.number().default(0),
}).strict();
