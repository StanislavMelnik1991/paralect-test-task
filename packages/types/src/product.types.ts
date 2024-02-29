import { z } from 'zod';

import { productSchema } from 'schemas';

export type Product = z.infer<typeof productSchema>;

export type CartProduct = Omit<Product, 'pending' | 'sold' | 'deletedOn' > & {
  available: number,
  createdOn: string,
  updatedOn?: string,
};
