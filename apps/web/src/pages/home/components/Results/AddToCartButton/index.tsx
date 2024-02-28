import { Button } from '@mantine/core';
import { ProductCounter } from 'components';
import { cartApi } from 'resources/cart';
import { z } from 'zod';

type Props = {
  disabled: boolean
  productId: string;
};

const schema = z.object({
  productId: z.string(),
});

type AddToCartParams = z.infer<typeof schema>;

export const AddToCartButton = ({ disabled, productId }: Props) => {
  const { mutate: addToCart, isLoading } = cartApi.useAddToCart<AddToCartParams>();
  const { data } = cartApi.useMyCart();
  const productInCart = data?.items.find(({ _id: id }) => id === productId);
  return productInCart ? (
    <ProductCounter
      quantity={productInCart.inBasket}
      available={productInCart.quantity}
      id={productInCart._id}
    />
  ) : (
    <Button
      onClick={() => { addToCart({ productId }); }}
      size="sm"
      color="blue"
      fullWidth
      disabled={disabled}
      loading={isLoading}
    >
      {disabled ? 'Not enough stock' : 'Add to Cart'}
    </Button>
  );
};
