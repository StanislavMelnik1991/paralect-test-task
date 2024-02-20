import { z } from 'zod';

import dbSchema from './db.schema';

export const cartSchema = dbSchema.extend({
  userId: z.string(),
  isPaid: z.boolean().default(false),
  products: z.array(z.object({
    productId: z.string(),
    quantity: z.number().optional().default(1),
  })),
}).strict();
