import { Grid } from '@mantine/core';
import { type Product } from 'types';
import { ProductCard } from 'components/ProductCard';
import { AddToCartButton } from './AddToCartButton';

type Props = {
  data: Array<Product>
  disabled: boolean
  accountId?: string
};

export const Results = ({ data, disabled, accountId }: Props) => (
  <Grid w="100%" gutter={20}>
    {data.map((product) => (
      <Grid.Col span={4} key={product._id}>
        <ProductCard
          product={product}
          mainButton={(
            <AddToCartButton
              productId={product._id}
              disabled={disabled || product.createdBy === accountId || !product.quantity}
            />
          )}
        />
      </Grid.Col>
    ))}
  </Grid>
);
