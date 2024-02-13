import { z } from 'zod';

import dbSchema from './db.schema';

export const userSchema = dbSchema.extend({
  email: z.string(),
  passwordHash: z.string().nullable().optional(),

  isEmailVerified: z.boolean().default(false),

  signupToken: z.string().nullable().optional(),
  resetPasswordToken: z.string().nullable().optional(),

  avatarUrl: z.string().nullable().optional(),
  oauth: z.object({
    google: z.boolean().default(false),
  }).optional(),

  baskets: z.array(dbSchema.extend({
    isPaid: z.boolean().default(false),
    products: z.array(z.object({
      productId: z.string(),
      quantity: z.number().min(1).default(1),
    })),
  })).optional(),

  lastRequest: z.date().optional(),
}).strict();
