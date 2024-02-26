import { routeUtil } from 'utils';

import list from './actions/list';
import userList from './actions/userList';
import create from './actions/create';
import uploadPreview from './actions/uploadPreview';
import deleteProduct from './actions/delete';

const publicRoutes = routeUtil.getRoutes([
  list,
]);

const privateRoutes = routeUtil.getRoutes([
  create,
  userList,
  uploadPreview,
  deleteProduct,
]);

const adminRoutes = routeUtil.getRoutes([
  list,
]);

export default {
  publicRoutes,
  privateRoutes,
  adminRoutes,
};
