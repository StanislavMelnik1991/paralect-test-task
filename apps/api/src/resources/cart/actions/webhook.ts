import { validateMiddleware } from 'middlewares';
import { AppKoaContext, AppRouter } from 'types';
import { z } from 'zod';
import { analyticsService, stripeService } from 'services';
import { productService } from 'resources/product';
import { userService } from 'resources/user';

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
        if (status === 'succeeded' && metadata.userId) {
          analyticsService.track('User paid for the order', {
            userId: metadata.userId,
          });

          const user = await userService.findOne({ _id: metadata.userId });
          if (!user) {
            ctx.throw('User not found', 404);
          }
          const { current, history } = user.cart;

          await Promise.all(current.map(({ productId, quantity }) => {
            return productService.updateOne(
              { _id: productId },
              (val) => ({
                pending: val.pending - quantity,
                sold: val.sold + quantity,
              }),
            );
          }));

          await userService.updateOne(
            { _id: metadata.userId },
            () => {

              return {
                cart: {
                  current: [],
                  history: [
                    ...history,
                    ...current,
                  ],
                },
              };
            },
          );
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
