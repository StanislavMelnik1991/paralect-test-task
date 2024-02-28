import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { cartApi } from 'features/resources/cart';
import { CartProducts } from './constants';

export const useCart = () => {
  const router = useRouter();

  const { data } = cartApi.useMyCart();
  const { isLoading: isBueLoading, mutate: bue } = cartApi.useBue();

  const handleBue = useCallback(() => {
    bue(undefined, {
      onSuccess: (({ link }) => {
        router.push(link);
      }),
    });
  }, [bue, router]);

  const elements: Array<CartProducts> | undefined = data?.items.map(({
    _id,
    image = '',
    name,
    price,
    inBasket,
    quantity,
  }) => ({ image, price, quantity: inBasket, name, id: _id, available: quantity }));

  return {
    handleBue,
    isBueLoading,
    elements,
    amount: data?.amount || 0,
  };
};
