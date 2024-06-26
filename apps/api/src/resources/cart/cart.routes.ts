import { routeUtil } from 'utils';

import addToCart from './actions/addToCart';
import changeQuantity from './actions/changeQuantity';
import list from './actions/list';
import history from './actions/history';
import paymentLink from './actions/paymentLink';
import stripeWebhook from './actions/webhook';


const publicRoutes = routeUtil.getRoutes([stripeWebhook]);

const privateRoutes = routeUtil.getRoutes([
  addToCart,
  changeQuantity,
  paymentLink,
  list,
  history,
]);

const adminRoutes = routeUtil.getRoutes([]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
