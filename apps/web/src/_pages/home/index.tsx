import Head from 'next/head';
import { NextPage } from 'next';
import {
  Group,
  Stack,
  Skeleton,
  Grid,
  Pagination,
} from '@mantine/core';
import { NotFoundResults } from '_entities';
import classes from './index.module.css';
import { useHome } from './hooks';
import {
  Results,
  ResultsInfo,
  SearchProducts,
  Filters,
} from './components';

const Home: NextPage = () => {
  const {
    isProductsLoading,
    data,
    account,
    search,
    setSearch,
    activePage,
    setPage,
    handleSort,
    sortBy,
    selectOptions,
    filterDate,
    handleFilter,
    handleResetFilters,
  } = useHome();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Stack className={classes.wrapper}>
        <Grid w="100%" h="100%" columns={4} gutter={28}>
          <Grid.Col span={1}>
            <Filters
              data={filterDate}
              onChange={handleFilter}
            />
          </Grid.Col>
          <Grid.Col span={3} h="100%">
            <Stack w="100%" gap={20} h="100%">
              <SearchProducts
                isLoading={isProductsLoading}
                setValue={setSearch}
                value={search}
              />
              <ResultsInfo
                count={data?.count}
                data={selectOptions}
                isLoading={isProductsLoading}
                onChange={handleSort}
                value={sortBy}
                filter={filterDate}
                onRemove={() => handleFilter(['', ''])}
              />

              {isProductsLoading && (
              <Grid w="100%">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Grid.Col span={4} key={`sklton-${String(item)}`}>
                    <Skeleton
                      height={475}
                      radius="sm"
                      mb="sm"
                    />
                  </Grid.Col>
                ))}
              </Grid>
              )}

              {data?.items.length ? (
                <Results
                  data={data.items}
                  disabled={!account}
                  accountId={account?._id}
                />
              ) : (
                <NotFoundResults onClick={handleResetFilters} />
              )}
            </Stack>
          </Grid.Col>
        </Grid>
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
    </>
  );
};

export default Home;
