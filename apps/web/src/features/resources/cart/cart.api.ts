import { useMutation, useQuery } from 'react-query';

import { CartProduct } from 'types';

import { apiService } from 'features/services';
import queryClient from '_app/query-client';
import { useRouter } from 'next/router';

interface MyCart {
  items: Array<CartProduct>,
  amount: number,
  count: number,
}

export function useAddToCart<T>() {
  const createProduct = (data: T) => apiService.post('/me/cart', data);

  return useMutation<MyCart, unknown, T>(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries('cart');
    },
  });
}

export function useUpdateQuantity<T>() {
  const createProduct = (data: T) => apiService.put('/me/cart', data);

  return useMutation<MyCart, unknown, T>(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries('cart');
    },
  });
}

export function useMyCart() {
  const list = () => apiService.get('/me/cart/') as Promise<MyCart>;

  return useQuery<MyCart>(['cart'], list);
}
export function useMyCartHistory() {
  const list = () => apiService.get('/me/cart/history') as Promise<MyCart>;

  return useQuery<MyCart>(['cart_history'], list);
}

export function useBue() {
  const clientSecret = () => apiService.post('/me/cart/bue/');
  const router = useRouter();

  interface BueResponse { link: string, }

  return useMutation<BueResponse, unknown, undefined>(clientSecret, {
    onSuccess: ({ link }) => {
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries('cart');
      router.push(link);
    },
  });
}
