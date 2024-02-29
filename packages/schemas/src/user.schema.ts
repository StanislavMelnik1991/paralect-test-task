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

  lastRequest: z.date().optional(),

  cart: z.object({
    history: z.array(z.object({
      productId: z.string(),
      quantity: z.number().optional().default(1),
      price: z.number().min(0),
      createdOn: z.date().optional(),
      updatedOn: z.date().optional(),
    })),
    current: z.array(z.object({
      productId: z.string(),
      quantity: z.number().optional().default(1),
      price: z.number().min(0),
      createdOn: z.date().optional(),
      updatedOn: z.date().optional(),
    })),
  }).optional().default({ history: [], current: [] }),
}).strict();
