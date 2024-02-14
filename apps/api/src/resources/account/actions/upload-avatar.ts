import multer from '@koa/multer';

import { Next, AppKoaContext, AppRouter } from 'types';

import { userService } from 'resources/user';

import { firebaseService } from 'services';


const upload = multer();

async function validator(ctx: AppKoaContext, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, { global: 'File cannot be empty' });

  await next();
}

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;
  const { file } = ctx.request;

  if (user.avatarUrl) {
    await firebaseService.deleteObject(user.avatarUrl);
  }

  const fileName = `${user._id}-${Date.now()}-${file.originalname}`;
  // const { Location } = await cloudStorageService.uploadPublic(`avatars/${fileName}`, file);
  const image = await firebaseService.uploadAvatar(`avatars/${fileName}`, file);
  if (!image) {
    return;
  }

  const updatedUser = await userService.updateOne(
    { _id: user._id },
    () => ({ avatarUrl: image }),
  );

  ctx.body = userService.getPublic(updatedUser);
}

export default (router: AppRouter) => {
  router.post('/avatar', upload.single('file'), validator, handler);
};
