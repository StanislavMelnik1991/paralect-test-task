import { Grid } from '@mantine/core';
import { type Product } from 'types';
import { ProductCard } from 'components/ProductCard';
import { RemoveButton } from './RemoveButton';
import { CardBadge } from './CardBadge';

type Props = {
  data: Array<Product>
  addButton?: JSX.Element
  handleDelete: ({ id, name }: {
    id: string;
    name: string;
  }) => () => void
};

export const Results = ({ data, addButton, handleDelete }: Props) => (
  <Grid w="100%" gutter={20} columns={5}>
    {addButton && (
      <Grid.Col span={1} key="add product">
        {addButton}
      </Grid.Col>
    )}
    {data.map((product) => (
      <Grid.Col span={1} key={product._id}>
        <ProductCard
          product={product}
          secondaryButton={
            !product.sold && !product.pending && (
              <RemoveButton
                onClick={handleDelete({ id: product._id, name: product.name })}
                disabled={!!product.sold || !!product.pending}
              />
            )
          }
          badge={(
            <CardBadge
              pending={product.pending}
              quantity={product.quantity}
              sold={product.sold}
            />
          )}
        />
      </Grid.Col>
    ))}
  </Grid>
);
