import { Button, Grid } from '@mantine/core';
import { type Product } from 'types';
import { cartApi } from 'features/resources/cart';
import { ProductCard, ProductCounter } from '_entities';
import { z } from 'zod';

type Props = {
  data: Array<Product>
  disabled: boolean
  accountId?: string
};

const schema = z.object({
  productId: z.string(),
});

type AddToCartParams = z.infer<typeof schema>;

const updateSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(0),
});

type UpdateQuantityParams = z.infer<typeof updateSchema>;

export const Results = ({ data, disabled, accountId }: Props) => {
  const { data: cart } = cartApi.useMyCart();
  const { mutate: addToCart, isLoading: isAddLoading } = cartApi.useAddToCart<AddToCartParams>();
  const {
    isLoading: isUpdateLoading,
    mutate: updateQuantity,
  } = cartApi.useUpdateQuantity<UpdateQuantityParams>();

  return (
    <Grid w="100%" gutter={20} grow>
      {data.map((product) => {
        const productInCart = cart?.items.find(({ _id: id }) => id === product._id);
        return (
          <Grid.Col span={4} key={product._id} miw={250}>
            <ProductCard
              product={product}
              mainButton={!productInCart ? (
                <Button
                  onClick={() => { addToCart({ productId: product._id }); }}
                  size="sm"
                  color="blue"
                  fullWidth
                  disabled={disabled || product.createdBy === accountId || !product.quantity}
                  loading={isAddLoading}
                >
                  {!product.quantity ? 'Not enough stock' : 'Add to Cart'}
                </Button>
              ) : (
                <ProductCounter
                  handleChange={(val: number) => updateQuantity({
                    productId: product._id,
                    quantity: val,
                  })}
                  isLoading={isUpdateLoading}
                  available={product.quantity}
                  quantity={productInCart.quantity}
                />
              )}
            />
          </Grid.Col>
        );
      })}
    </Grid>
  );
};
