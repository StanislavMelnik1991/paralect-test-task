import { useCallback, useLayoutEffect, useState } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Select,
  TextInput,
  Group,
  Title,
  Stack,
  Skeleton,
  Text,
  Container,
  UnstyledButton,
  Flex,
  Button,
  Card,
  Image,
  Badge,
  Grid,
} from '@mantine/core';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import { IconSearch, IconX, IconSelector } from '@tabler/icons-react';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';

import { productApi } from 'resources/products';

import Link from 'next/link';
import { RoutePath } from 'routes';
import { PER_PAGE, selectOptions } from './constants';

import classes from './index.module.css';

interface UsersListParams {
  page?: number;
  perPage?: number;
  searchValue?: string;
  sort?: {
    createdOn: 'asc' | 'desc';
  };
  filter?: {
    createdOn?: {
      sinceDate: Date | null;
      dueDate: Date | null;
    };
  };
}

const Home: NextPage = () => {
  const [search, setSearch] = useInputState('');
  // const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  // const [sorting, setSorting] = useState<SortingState>([]);
  const [sortBy, setSortBy] = useState(selectOptions[0].value);
  const [filterDate, setFilterDate] = useState<DatesRangeValue>();

  const [params, setParams] = useState<UsersListParams>({});

  const [debouncedSearch] = useDebouncedValue(search, 500);

  const handleSort = useCallback((value: string) => {
    setSortBy(value);
    setParams((prev) => ({
      ...prev,
      sort: value === 'newest' ? { createdOn: 'desc' } : { createdOn: 'asc' },
    }));
  }, []);

  const handleFilter = useCallback(([sinceDate, dueDate]: DatesRangeValue) => {
    setFilterDate([sinceDate, dueDate]);

    if (!sinceDate) {
      setParams((prev) => ({
        ...prev,
        filter: {},
      }));
    }

    if (dueDate) {
      setParams((prev) => ({
        ...prev,
        filter: { createdOn: { sinceDate, dueDate } },
      }));
    }
  }, []);

  useLayoutEffect(() => {
    setParams((prev) => ({ ...prev, page: 1, searchValue: debouncedSearch, perPage: PER_PAGE }));
  }, [debouncedSearch]);

  const { data, isLoading: isListLoading } = productApi.useMyList(params);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Stack gap="lg">
        <Title order={2}>Users</Title>
        <Link href={RoutePath.CreateProduct}>
          <Button>create</Button>
        </Link>

        <Group wrap="nowrap" justify="space-between">
          <Group wrap="nowrap">
            <Skeleton
              className={classes.inputSkeleton}
              height={42}
              radius="sm"
              visible={isListLoading}
              width="auto"
            >
              <TextInput
                w={350}
                size="md"
                value={search}
                onChange={setSearch}
                placeholder="Search by name or email"
                leftSection={<IconSearch size={16} />}
                rightSection={search ? (
                  <UnstyledButton
                    component={Flex}
                    display="flex"
                    align="center"
                    onClick={() => setSearch('')}
                  >
                    <IconX color="gray" />
                  </UnstyledButton>
                ) : null}
              />
            </Skeleton>

            <Skeleton
              width="auto"
              height={42}
              radius="sm"
              visible={isListLoading}
            >
              <Select
                w={200}
                size="md"
                data={selectOptions}
                value={sortBy}
                onChange={handleSort}
                rightSection={<IconSelector size={16} />}
                comboboxProps={{
                  withinPortal: false,
                  transitionProps: {
                    transition: 'pop-bottom-right',
                    duration: 210,
                    timingFunction: 'ease-out',
                  },
                }}
              />
            </Skeleton>

            <Skeleton
              className={classes.datePickerSkeleton}
              height={42}
              radius="sm"
              visible={isListLoading}
              width="auto"
            >
              <DatePickerInput
                type="range"
                size="md"
                placeholder="Pick date"
                value={filterDate}
                onChange={handleFilter}
              />
            </Skeleton>
          </Group>
        </Group>

        {isListLoading && (
          <>
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={`sklton-${String(item)}`}
                height={50}
                radius="sm"
                mb="sm"
              />
            ))}
          </>
        )}

        {data?.items.length ? (
          <Grid grow>
            {data.items.map((product) => (
              <Grid.Col span={4} key={product._id}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      src={product.image}
                      height={220}
                      alt="Norway"
                    />
                  </Card.Section>

                  <Text fw="bold">{product.name}</Text>

                  <Group justify="space-between" mt="md" mb="xs">
                    <Badge color="gray">Price: </Badge>
                    <Text fw="bold">{`$${product.price}`}</Text>
                  </Group>

                  <Button size="sm" color="blue" fullWidth>
                    Add to Cart
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Container p={75}>
            <Text size="xl" c="gray">
              No results found, try to adjust your search.
            </Text>
          </Container>
        )}
      </Stack>
    </>
  );
};

export default Home;
