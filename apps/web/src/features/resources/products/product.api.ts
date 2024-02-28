import { useMutation, useQuery } from 'react-query';

import { Product } from 'types';

import { apiService } from 'features/services';
import queryClient from '_app/query-client';

interface ProductsListResponse {
  count: number;
  items: Product[];
  totalPages: number;
}

export function useList<T>(params: T) {
  const list = () => apiService.get('/products', params);

  return useQuery<ProductsListResponse>(['products', params], list);
}

export function useMyList<T>(params: T) {
  const list = () => apiService.get('/me/products', params) as Promise<ProductsListResponse>;

  return useQuery<ProductsListResponse>(['myProducts', params], list);
}

export function useCreate<T>() {
  const createProduct = (data: T) => apiService.post('/me/products', data);

  return useMutation<{ product: Product }, unknown, T>(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('myProducts');
    },
  });
}
export function useDelete<T>() {
  const createProduct = (data: T) => apiService.delete('/me/products', data);

  return useMutation<{ product: Product }, unknown, T>(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('myProducts');
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
