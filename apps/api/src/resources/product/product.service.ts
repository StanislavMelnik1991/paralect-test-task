import _ from 'lodash';

import { Product } from 'types';
import { productSchema } from 'schemas';
import { DATABASE_DOCUMENTS } from 'app-constants';

import db from 'db';

const service = db.createService<Product>(DATABASE_DOCUMENTS.PRODUCTS, {
  schemaValidator: (obj) => productSchema.parseAsync(obj),
});

const privateFields: Array<keyof Product> = [
  'pending',
  'sold',
  'deletedOn',
];

const getCartFields = (product: Product | null) => _.omit(product, privateFields);

export default Object.assign(service, {
  getCartFields,
});
