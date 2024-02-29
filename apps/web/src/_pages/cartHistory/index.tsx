import {
  Stack,
  Grid,
  Skeleton,
} from '@mantine/core';
import { NotFoundResults } from '_entities';
import { CartNavigation, HistoryTable } from 'widgets/Cart';
import { cartApi } from 'features/resources';

const History = () => {
  const { data, isLoading } = cartApi.useMyCartHistory();

  return (
    <Stack gap="lg">
      <CartNavigation />
      {(isLoading || !!data?.count) && (
        <Grid w="100%" columns={4} gutter={68} grow>
          <Grid.Col span={3}>
            {isLoading ? (
              <Skeleton height={103} />
            ) : (
              <HistoryTable elements={data.items} />
            )}
          </Grid.Col>
        </Grid>
      )}
      {!isLoading && !data?.count && <NotFoundResults />}
    </Stack>
  );
};

export default History;
