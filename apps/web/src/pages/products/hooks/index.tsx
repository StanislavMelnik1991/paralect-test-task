import { useLayoutEffect, useState, useCallback } from 'react';
import { productApi } from 'resources/products';
import { toast } from 'react-toastify';
import { PER_PAGE, UsersListParams } from './constants';

export const useProducts = () => {
  const [params, setParams] = useState<UsersListParams>({ sort: { createdOn: 'desc' } });
  const { data, isLoading: isProductsLoading } = productApi.useMyList(params);
  const [activePage, setPage] = useState(1);

  const { mutate: deleteProduct } = productApi.useDelete<{ id: string }>();

  const handleDelete = useCallback(({ id, name }: { id: string, name: string }) => () => {
    deleteProduct({ id }, {
      onSuccess: () => { toast(`${name} has been deleted`); },
      onError: (err) => { toast.error(err as string); },
    });
  }, [deleteProduct]);

  useLayoutEffect(() => {
    setParams((prev) => ({
      ...prev,
      page: activePage,
      perPage: PER_PAGE,
    }));
  }, [activePage]);

  return {
    data,
    isProductsLoading,
    activePage,
    setPage,
    handleDelete,
  };
};
