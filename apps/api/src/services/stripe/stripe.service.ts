
// eslint-disable-next-line import/no-extraneous-dependencies
import Stripe from 'stripe';
import config from 'config';

export class StripeService {
  stripe: Stripe;

  constructor(secret: string) {
    this.stripe = new Stripe(secret);
  }

  async createPaymentLink({
    products,
    cartId,
  }:
  {
    cartId: string,
    products: Array<{ id: string, price: number, name: string }>,
  }) {
    /* const amount = products.reduce((total, product) => total + product.price, 0); */
    const lineItems: Array<Stripe.Checkout.SessionCreateParams.LineItem> = products.map((el) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: el.name,
          },
          unit_amount: el.price * 100,
        },
        quantity: 1,
      };
    });
    const session = await this.stripe.checkout.sessions.create({
      line_items: lineItems,
      payment_intent_data: {
        metadata: { cartId },
      },
      mode: 'payment',
      success_url: `${config.WEB_URL}/cart`,
      cancel_url: config.WEB_URL,

    });
    return session;
  }

  getPayment(id: string) {
    return this.stripe.paymentIntents.retrieve(id);
  }
}