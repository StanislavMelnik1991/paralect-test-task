import { z } from 'zod';

import { AppKoaContext, AppRouter, Product } from 'types';

import { productService } from 'resources/product';

import { validateMiddleware } from 'middlewares';
import { analyticsService } from 'services';
import { firebaseService } from 'services';

const schema = z.object({
  name: z.string(),
  price: z.number().min(1),
  quantity: z.number().min(1),
  image: z.string().url(),
});

interface ValidatedData extends z.infer<typeof schema> {
  product: Product;
}


async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { _id: createdBy, email } = ctx.state.user;
  const { name, price, quantity, image } = ctx.validatedData;

  const product = await productService.insertOne({
    createdBy,
    name,
    price,
    quantity,
  });
  
  const fileName = await firebaseService.rename(image, `${email}/products/${name}-${product._id}`);
  const updatedUser = await productService.updateOne(
    { _id: product._id },
    () => ({ image: fileName }),
  );

  analyticsService.track('New product created', {
    name,
  });

  ctx.body = { product: updatedUser };
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(schema), handler);
};
