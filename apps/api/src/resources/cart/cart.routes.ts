import { routeUtil } from 'utils';

import addToCart from './actions/addToCart';
import changeQuantity from './actions/changeQuantity';
import list from './actions/list';
import paymentLink from './actions/paymentLink';
import stripeWebhook from './actions/webhook';


const publicRoutes = routeUtil.getRoutes([stripeWebhook]);

const privateRoutes = routeUtil.getRoutes([
  addToCart,
  changeQuantity,
  paymentLink,
  list,
]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
