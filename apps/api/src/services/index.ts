import analyticsService from './analytics/analytics.service';
import authService from './auth/auth.service';
import { FirebaseService } from './firebase/firebase.service';
import emailService from './email/email.service';
import googleService from './google/google.service';
import rateLimitService from './rate-limit/rate-limit.service';
import socketService from './socket/socket.service';
import { StripeService } from './stripe/stripe.service';
import config from 'config';

const stripeService = new StripeService(config.STRIPE_SECRET_KEY);

const { privateKey: FIREBASE_STORAGE_PRIVATE_KEY } = JSON.parse(config.FIREBASE_STORAGE_PRIVATE_KEY as string);

const firebaseService = new FirebaseService({
  clientEmail: config.FIREBASE_STORAGE_CLIENT_EMAIL,
  privateKey: FIREBASE_STORAGE_PRIVATE_KEY,
  projectId: config.FIREBASE_STORAGE_PROJECT_ID,
});

export {
  analyticsService,
  authService,
  emailService,
  googleService,
  rateLimitService,
  socketService,
  firebaseService,
  stripeService,
};
