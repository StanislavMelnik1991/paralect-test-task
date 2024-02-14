import { z } from 'zod';

import { AppKoaContext, AppRouter, Product } from 'types';

import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';
import { analyticsService } from 'services';

const schema = z.object({
  name: z.string(),
  price: z.number().min(1).max(256),
  quantity: z.number().min(1).max(256),
  image: z.string().optional(),
});

interface ValidatedData extends z.infer<typeof schema> {
  user: Product;
}


async function handler(ctx: AppKoaContext<ValidatedData>) {

  const { _id: createdBy } = ctx.state.user;
  const { name, price, quantity, image } = ctx.validatedData;

  const product = await productService.insertOne({
    createdBy,
    name,
    price,
    quantity,
    image,
  });

  analyticsService.track('New product created', {
    name,
  });

  ctx.body = { product };
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(schema), handler);
};
