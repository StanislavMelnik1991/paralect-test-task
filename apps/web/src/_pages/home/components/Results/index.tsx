import { Grid } from '@mantine/core';
import { type Product } from 'types';
import { cartApi } from 'services/resources/cart';
import { ProductCard, ProductCounter } from '_entities';
import { AddToCartButton } from './AddToCartButton';

type Props = {
  data: Array<Product>
  disabled: boolean
  accountId?: string
};

export const Results = ({ data, disabled, accountId }: Props) => {
  const { data: cart } = cartApi.useMyCart();
  return (
    <Grid w="100%" gutter={20}>
      {data.map((product) => {
        const productInCart = cart?.items.find(({ _id: id }) => id === product._id);
        return (
          <Grid.Col span={4} key={product._id}>
            <ProductCard
              product={product}
              mainButton={!productInCart ? (
                <AddToCartButton
                  productId={product._id}
                  disabled={disabled || product.createdBy === accountId || !product.quantity}
                />
              ) : (
                <ProductCounter
                  available={productInCart.quantity}
                  id={product._id}
                  quantity={productInCart.inBasket}
                />
              )}
            />
          </Grid.Col>
        );
      })}
    </Grid>
  );
};
