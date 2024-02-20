export enum ScopeType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export enum LayoutType {
  MAIN = 'MAIN',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export enum RoutePath {
  // Private paths
  Home = '/',
  Profile = '/profile',
  Cart = '/cart',
  Products = '/products',
  CreateProduct = '/products/create',

  // Auth paths
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  ForgotPassword = '/forgot-password',
  ResetPassword = '/reset-password',
  ExpireToken = '/expire-token',

  NotFound = '/404',
}

type RoutesConfiguration = {
  [routePath in RoutePath]: {
    scope?: ScopeType;
    layout?: LayoutType;
  };
};

export const routesConfiguration: RoutesConfiguration = {
  // Private routes
  [RoutePath.Home]: {
    scope: ScopeType.PUBLIC,
    layout: LayoutType.MAIN,
  },
  [RoutePath.Profile]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MAIN,
  },
  [RoutePath.Cart]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MAIN,
  },
  [RoutePath.Products]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MAIN,
  },
  [RoutePath.CreateProduct]: {
    scope: ScopeType.PRIVATE,
    layout: LayoutType.MAIN,
  },

  // Auth routes
  [RoutePath.SignIn]: {
    scope: ScopeType.UNAUTHORIZED,
    layout: LayoutType.UNAUTHORIZED,
  },
  [RoutePath.SignUp]: {
    scope: ScopeType.UNAUTHORIZED,
    layout: LayoutType.UNAUTHORIZED,
  },
  [RoutePath.ForgotPassword]: {
    scope: ScopeType.UNAUTHORIZED,
    layout: LayoutType.UNAUTHORIZED,
  },
  [RoutePath.ResetPassword]: {
    scope: ScopeType.UNAUTHORIZED,
    layout: LayoutType.UNAUTHORIZED,
  },
  [RoutePath.ExpireToken]: {
    scope: ScopeType.UNAUTHORIZED,
    layout: LayoutType.UNAUTHORIZED,
  },

  [RoutePath.NotFound]: {},
};
