import {
  Stack,
  Grid,
  Skeleton,
} from '@mantine/core';
import { NotFoundResults } from '_entities';
import { CartNavigation, CartTable, Summary } from 'widgets/Cart';
import { cartApi } from 'features/resources';

const Cart = () => {
  const { data, isLoading } = cartApi.useMyCart();
  const { isLoading: isBueLoading, mutate: bue } = cartApi.useBue();

  return (
    <Stack gap="lg">
      <CartNavigation />
      {(isLoading || !!data?.count) && (
        <Grid
          w="100%"
          columns={4}
          gutter={68}
          grow
        >
          <Grid.Col span={3}>
            {!data || isLoading ? (
              <Skeleton height={103} />
            ) : (
              <CartTable elements={data.items} />
            )}
          </Grid.Col>
          <Grid.Col span={1} miw={315}>
            {!data || isLoading ? (
              <Skeleton height={224} />
            ) : (
              <Summary
                amount={data.amount}
                handleBue={() => { bue(undefined); }}
                isLoading={isBueLoading}
              />
            )}
          </Grid.Col>
        </Grid>
      )}
      {!isLoading && !data?.count && <NotFoundResults />}
    </Stack>
  );
};

export default Cart;
