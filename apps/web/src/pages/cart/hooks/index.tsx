import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { cartApi } from 'resources/cart';
import { z } from 'zod';
import { CartProducts } from './constants';

const schema = z.object({
  productId: z.string(),
  quantity: z.number().min(0),
});

type AddToCartParams = z.infer<typeof schema>;

export const useCart = () => {
  const router = useRouter();

  const { data } = cartApi.useMyCart();
  const { isLoading: isBueLoading, mutate: bue } = cartApi.useBue();
  const {
    isLoading: isUpdateLoading,
    mutate: updateQuantity,
  } = cartApi.useUpdateQuantity<AddToCartParams>();

  const handleBue = useCallback(() => {
    bue(undefined, {
      onSuccess: (({ link }) => {
        router.push(link);
      }),
    });
  }, [bue, router]);

  const handleUpdateQuantity = useCallback((props: AddToCartParams) => {
    updateQuantity(props);
  }, [updateQuantity]);

  const elements: Array<CartProducts> | undefined = data?.items.map(({
    _id,
    image = '',
    name,
    price,
    quantity,
  }) => ({ image, price, quantity, name, id: _id }));

  return {
    handleBue,
    handleUpdateQuantity,
    isBueLoading,
    elements,
    amount: data?.amount,
    isUpdateLoading,
  };
};
