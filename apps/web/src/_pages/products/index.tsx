import {
  Group,
  Stack,
  Skeleton,
  Grid,
  Pagination,
  Text,
} from '@mantine/core';
import { AddButton, Results } from 'widgets/YourProducts';
import { useProducts } from 'features/products';
import classes from './index.module.css';

const Products = () => {
  const {
    activePage,
    data,
    isProductsLoading,
    setPage,
    handleDelete,
  } = useProducts();

  return (
    <Stack className={classes.wrapper}>
      <Text size="lg" fw="bold">
        Your Products
      </Text>
      <Stack w="100%" gap={20} h="100%" justify="center">
        {isProductsLoading && (
        <Grid w="100%" grow>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => (
            <Grid.Col span={4} key={`sklton-${String(item)}`}>
              <Skeleton
                height={355}
                radius="sm"
                mb="sm"
              />
            </Grid.Col>
          ))}
        </Grid>
        )}

        <Results
          handleDelete={handleDelete}
          data={data?.items}
          addButton={<AddButton />}
        />
      </Stack>

      {data && data.totalPages > 1 && (
      <Group wrap="nowrap" justify="center" mt="auto">
        <Pagination
          total={data.totalPages}
          value={activePage}
          onChange={setPage}
          h={42}
        />
      </Group>
      )}

    </Stack>
  );
};

export default Products;
