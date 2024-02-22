import { Grid } from '@mantine/core';
import { type Product } from 'types';
import { type MouseEventHandler } from 'react';
import { ProductCard } from 'components/ProductCard';

type Props = {
  data: Array<Product>
  handleAddToCart: (data: {
    id: string;
    name: string;
  }) => MouseEventHandler<HTMLButtonElement>
  disabled: boolean
  accountId?: string
};

export const Results = ({ data, handleAddToCart, disabled, accountId }: Props) => (
  <Grid w="100%" gutter={20}>
    {data.map((product) => (
      <Grid.Col span={4} key={product._id}>
        <ProductCard
          handleAddToCart={handleAddToCart}
          product={product}
          disabled={disabled || product.createdBy === accountId}
        />
      </Grid.Col>
    ))}
  </Grid>
);
