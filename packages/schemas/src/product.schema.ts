import { z } from 'zod';

import dbSchema from './db.schema';

export const productSchema = dbSchema.extend({
  createdBy: z.string(),

  name: z.string(),
  image: z.string().optional(),

  price: z.number().optional().default(0),

  quantity: z.number().optional().default(1),
  pending: z.number().optional().default(0),
  sold: z.number().optional().default(0),

  clientSecret: z.string().optional(),
}).strict();
