import { useMutation, useQuery } from 'react-query';

import { Product } from 'types';

import { apiService } from 'services';
import queryClient from 'query-client';

interface MyCart {
  items: Array<Product>,
  amount: number,
  count: number,
}

export function useAddToCart<T>() {
  const createProduct = (data: T) => apiService.post('/me/cart', data);

  return useMutation<MyCart, unknown, T>(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries('my_cart');
    },
  });
}

export function useUpdateQuantity<T>() {
  const createProduct = (data: T) => apiService.put('/me/cart', data);

  return useMutation<MyCart, unknown, T>(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries('my_cart');
    },
  });
}

export function useMyCart() {
  const list = () => apiService.get('/me/cart/') as Promise<MyCart>;

  return useQuery<MyCart>(['my_cart'], list);
}

export function useBue() {
  const clientSecret = () => apiService.post('/me/cart/bue/');

  interface BueResponse { link: string, }

  return useMutation<BueResponse, unknown, undefined>(clientSecret, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries('my_cart');
    },
  });
}
