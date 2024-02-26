import { validateMiddleware } from 'middlewares';
import { AppKoaContext, AppRouter } from 'types';
import { z } from 'zod';
import { cartService } from '..';
import { analyticsService, stripeService } from 'services';
import { productService } from 'resources/product';

const schema = z.object({
  id: z.string(),
  object: z.string(),
  type: z.string(),
  data: z.object({
    object: z.object({
      id: z.string(),
    }),
  }),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { type, data: { object } } = ctx.validatedData;
  switch (type) {
    case 'charge.succeeded':
      break;
    case 'checkout.session.completed':
      break;
    case 'payment_intent.succeeded':
      if (object) {
        const { status, metadata } = await stripeService.getPayment(object.id);
        if (status === 'succeeded' && metadata.cartId) {
          analyticsService.track('User paid for the order', {
            cartId: metadata.cartId,
          });
          const cart = await cartService.updateOne(
            { _id: metadata.cartId },
            () => ({ isPaid: true }),
          );
          cart?.products.forEach(({ productId, quantity }) => {
            productService.updateOne(
              { _id: productId },
              (val) => ({
                pending: val.pending - quantity,
                sold: val.sold + quantity,
              }),
            );
          });
        }
      }
      break;
    case 'payment_intent.created':
      break;
    case '':
      break;
    default:
      logger.warn(`Unhandled event type ${type}`);
  }
  ctx.body = { received: true };
}

export default (router: AppRouter) => {
  router.post('/webhook', validateMiddleware(schema), handler);
};
