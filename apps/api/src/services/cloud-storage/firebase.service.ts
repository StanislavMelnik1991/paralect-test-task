/* eslint-disable import/no-extraneous-dependencies */
import { initializeApp, App, cert, ServiceAccount } from 'firebase-admin/app';
import { getStorage, getDownloadURL } from 'firebase-admin/storage';
import type { File } from '@koa/multer';
import config from 'config';

class Firebase {
  app: App;


  constructor(options: ServiceAccount) {
    this.app = initializeApp({
      credential: cert(options),
      storageBucket: config.FIREBASE_STORAGE_BUCKET,
    });
  }

  async uploadAvatar(fileName: string, file: File) {
    const bucket = getStorage(this.app).bucket();
    const loadedFile = bucket.file(fileName);
    await loadedFile.save(file.buffer, { private: false }).catch((err) => {
      logger.error(err.message);
    });
    return getDownloadURL(loadedFile);
  }

  async rename(oldUrl: string, newName: string) {
    const oldName = this.parseUrl(oldUrl);
    const bucket = getStorage(this.app).bucket();
    const oldFile = bucket.file(oldName);
    const newFile = bucket.file(newName);
    const loadedFile = await oldFile.download();
    await Promise.all([
      newFile.save(loadedFile),
      oldFile.delete(),
    ]);
    return getDownloadURL(newFile);
  }

  async deleteObject(url?: string | null) {
    if (!url) {
      return;
    }

    const path = this.parseUrl(url);

    const storage = getStorage(this.app);
    const bucket = storage.bucket();
    try {
      await bucket.file(path).delete();
    } catch (error) {
      logger.error("can't delete file");
    }
  }

  private parseUrl(url: string) {
    const urlParts = url.split('/');
    const path = urlParts[urlParts.length - 1].split('?')[0];
    return decodeURIComponent(path);
  }
}

const { privateKey } = JSON.parse(process.env.FIREBASE_STORAGE_PRIVATE_KEY as string);

export default new Firebase({
  clientEmail: config.FIREBASE_STORAGE_CLIENT_EMAIL,
  privateKey,
  projectId: config.FIREBASE_STORAGE_PROJECT_ID,
});
