import { Badge, Flex, Grid } from '@mantine/core';
import { type Product } from 'types';
import { type MouseEventHandler } from 'react';
import { ProductCard } from 'components/ProductCard';
import { AddToCartButton } from './AddToCartButton';

type Props = {
  data: Array<Product>
  handleAddToCart: (id: string) => MouseEventHandler<HTMLButtonElement>
  disabled: boolean
  accountId?: string
};

export const Results = ({ data, handleAddToCart, disabled, accountId }: Props) => (
  <Grid w="100%" gutter={20}>
    {data.map((product) => (
      <Grid.Col span={4} key={product._id}>
        <ProductCard
          product={product}
          badge={(
            <Flex bg="white">
              <Badge radius={0} size="lg" variant="light" color="blue">{product.quantity}</Badge>
            </Flex>
          )}
          mainButton={(
            <AddToCartButton
              onClick={handleAddToCart(product._id)}
              disabled={disabled || product.createdBy === accountId}
            />
          )}
        />
      </Grid.Col>
    ))}
  </Grid>
);
