import { routeUtil } from 'utils';

import addToCart from './actions/addToCart';
import list from './actions/list';
import paymentLink from './actions/paymentLink';
import stripeWebhook from './actions/webhook';


const publicRoutes = routeUtil.getRoutes([stripeWebhook]);

const privateRoutes = routeUtil.getRoutes([
  addToCart,
  paymentLink,
  list,
]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
