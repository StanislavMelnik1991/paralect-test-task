import {
  Stack,
  Grid,
} from '@mantine/core';
import { NotFoundResults } from '_entities';
import { CartNavigation, CartTable, Summary } from 'widgets/Cart';
import { useCart } from 'features/cart';

const Cart = () => {
  const {
    handleBue,
    isBueLoading,
    elements,
    amount,
  } = useCart();
  return (
    <Stack gap="lg">
      <CartNavigation />

      {elements?.length ? (
        <Grid w="100%" columns={4} gutter={68}>
          <Grid.Col span={3}>
            <CartTable elements={elements} />
          </Grid.Col>
          <Grid.Col span={1}>
            <Summary
              amount={amount}
              handleBue={handleBue}
              isLoading={isBueLoading}
            />
          </Grid.Col>
        </Grid>
      ) : (
        <NotFoundResults />
      )}
    </Stack>
  );
};

export default Cart;
