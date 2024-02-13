import { useMutation, useQuery } from 'react-query';

import { Product } from 'types';

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

export function useCreate<T>() {
  const createProduct = (data: T) => apiService.post('/me/products', data);

  return useMutation<Product, unknown, T>(createProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['product'], data);
    },
  });
}
