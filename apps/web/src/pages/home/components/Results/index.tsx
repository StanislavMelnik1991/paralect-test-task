import { Grid } from '@mantine/core';
import { type Product } from 'types';
import { type MouseEventHandler } from 'react';
import { ProductCard } from 'components/ProductCard';
import { AddToCartButton } from './AddToCartButton';

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
          product={product}
          mainButton={(
            <AddToCartButton
              onClick={handleAddToCart({ id: product._id, name: product.name })}
              disabled={disabled || product.createdBy === accountId}
            />
          )}
        />
      </Grid.Col>
    ))}
  </Grid>
);
