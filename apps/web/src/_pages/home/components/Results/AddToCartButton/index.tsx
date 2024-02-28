import { Button } from '@mantine/core';
import { cartApi } from 'services/resources/cart';
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

  return (
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
