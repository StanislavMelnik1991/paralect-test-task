import Head from 'next/head';
import { NextPage } from 'next';
import {
  Stack,
  Button,
  Grid,
} from '@mantine/core';
import { NotFoundResults } from 'components/NotFound';
import { CartNavigation, CartTable } from './components';
import { useCart } from './hooks';

const Home: NextPage = () => {
  const {
    handleBue,
    isBueLoading,
    elements,
    amount,
    handleUpdateQuantity,
    isUpdateLoading,
  } = useCart();
  return (
    <>
      <Head>
        <title>My cart</title>
      </Head>
      <Stack gap="lg">
        <CartNavigation />

        {elements?.length ? (
          <Grid w="100%" columns={4} gutter={68}>
            <Grid.Col span={3}>
              <CartTable
                isUpdateLoading={isUpdateLoading}
                handleUpdateQuantity={handleUpdateQuantity}
                elements={elements}
              />
            </Grid.Col>
            <Grid.Col span={1}>
              <Button fullWidth h="100%" onClick={handleBue} loading={isBueLoading}>
                $
                {amount}
              </Button>
            </Grid.Col>
          </Grid>
        ) : (
          <NotFoundResults />
        )}
      </Stack>
    </>
  );
};

export default Home;
