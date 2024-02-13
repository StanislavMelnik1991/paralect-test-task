import { routeUtil } from 'utils';

import list from './actions/list';
import create from './actions/create';

const publicRoutes = routeUtil.getRoutes([
  list,
]);

const privateRoutes = routeUtil.getRoutes([
  create,
]);

const adminRoutes = routeUtil.getRoutes([
  list,
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
