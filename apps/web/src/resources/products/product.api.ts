import { useMutation, useQuery } from 'react-query';

import { Cart, Product } from 'types';

import { apiService } from 'services';
import queryClient from 'query-client';

export function useList<T>(params: T) {
  const list = () => apiService.get('/products', params);

  interface ProductsListResponse {
    count: number;
    items: Product[];
    totalPages: number;
  }

  return useQuery<ProductsListResponse>(['products', params], list);
}

export function useMyList<T>(params: T) {
  const list = () => apiService.get('/me/products', params) as Promise<ProductsListResponse>;

  interface ProductsListResponse {
    count: number;
    items: Product[];
    totalPages: number;
  }

  return useQuery<ProductsListResponse>(['myProducts', params], list);
}

export function useCreate<T>() {
  const createProduct = (data: T) => apiService.post('/me/products', data);

  return useMutation<{ product: Product }, unknown, T>(createProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['product'], data);
    },
  });
}

export function useAddToCart<T>() {
  const createProduct = (data: T) => apiService.post('/me/cart', data);

  return useMutation<{ cart: Cart }, unknown, T>(createProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
  });
}

export function useUploadImage<T>() {
  const uploadAvatar = (data: T) => apiService.post('/me/products/preview/', data);

  return useMutation<{ imageUrl: string }, unknown, T>(uploadAvatar, {
    onSuccess: (data) => {
      queryClient.setQueryData(['product'], data);
    },
  });
}

export function useMyCart() {
  const list = () => apiService.get('/me/cart/') as Promise<MyCart>;

  interface MyCart {
    items: Array<Product>,
    amount: number,
    count: number,
  }

  return useQuery<MyCart>(['my_cart'], list);
}

export function useBue() {
  const clientSecret = () => apiService.post('/me/cart/bue/');

  interface MyCart { link: string, }

  return useMutation<MyCart, unknown, undefined>(clientSecret, {
    onSuccess: (data) => {
      queryClient.setQueryData(['product'], data);
    },
  });
}
