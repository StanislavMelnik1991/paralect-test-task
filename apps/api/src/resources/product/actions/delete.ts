import { z } from 'zod';
import { AppKoaContext, AppRouter } from 'types';
import { productService } from 'resources/product';
import { validateMiddleware } from 'middlewares';

const schema = z.object({
  id: z.string(),
});

type ValidatedData = z.infer<typeof schema>;


async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { _id: createdBy } = ctx.state.user;
  const { id } = ctx.validatedData;

  const product = await productService.deleteSoft({
    createdBy,
    _id: id,
  });

  ctx.assertClientError(product, { global: 'File not found' });
  ctx.body = { product };
}

export default (router: AppRouter) => {
  router.delete('/', validateMiddleware(schema), handler);
};
