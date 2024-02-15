import multer from '@koa/multer';

import { Next, AppKoaContext, AppRouter } from 'types';

import { firebaseService } from 'services';


const upload = multer();

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;
  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { user: { email } } = ctx.state;
  const { file } = ctx.request;

  const imageUrl = await firebaseService.uploadAvatar(`${email}/products/preview`, file);

  ctx.assertClientError(imageUrl, {
    image: 'Cant upload image',
  });

  ctx.body = { imageUrl };
}

export default (router: AppRouter) => {
  router.post('/preview', upload.single('file'), validator, handler);
};
