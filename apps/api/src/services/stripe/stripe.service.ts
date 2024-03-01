
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
    userId,
  }:
  {
    userId: string,
    products: Array<{ 
      price: number, 
      name: string, 
      quantity: number 
    }>,
  }) {
    /* const amount = products.reduce((total, product) => total + product.price, 0); */
    const lineItems: Array<Stripe.Checkout.SessionCreateParams.LineItem> = products.map(({ name, price, quantity }) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: name,
          },
          unit_amount: price * 100,
        },
        quantity: quantity,
      };
    });
    const session = await this.stripe.checkout.sessions.create({
      line_items: lineItems,
      payment_intent_data: {
        metadata: { userId },
      },
      mode: 'payment',
      success_url: `${config.WEB_URL}/cart/success`,
      cancel_url: `${config.WEB_URL}/cart/failed`,

    });
    return session;
  }

  getPayment(id: string) {
    return this.stripe.paymentIntents.retrieve(id);
  }
}