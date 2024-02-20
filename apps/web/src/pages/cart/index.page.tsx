import { useCallback, useState } from 'react';
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
  Image,
  Button,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IconSearch, IconX, IconSelector } from '@tabler/icons-react';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';

import { productApi } from 'resources/products';

import { Table } from 'components';
import { RowSelectionState, SortingState } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { PER_PAGE, columns, selectOptions } from './constants';

import classes from './index.module.css';

const Home: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useInputState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [sortBy, setSortBy] = useState(selectOptions[0].value);
  const [filterDate, setFilterDate] = useState<DatesRangeValue>();

  const handleSort = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const handleFilter = useCallback(([sinceDate, dueDate]: DatesRangeValue) => {
    setFilterDate([sinceDate, dueDate]);
  }, []);

  const { data, isLoading: isListLoading } = productApi.useMyCart();
  const { isLoading: isBueLoading, mutate } = productApi.useBue();

  const handleBue = useCallback(() => {
    mutate(undefined, {
      onSuccess: (({ link }) => {
        router.push(link);
      }),
    });
  }, [mutate, router]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Stack gap="lg">
        <Title order={2}>My cart</Title>
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
          <>
            <Table
              columns={columns}
              data={data.items.map((el) => ({
                ...el,
                price: `$${el.price}`,
                image: (
                  <Group wrap="nowrap">
                    <Image w={80} h={80} src={el.image} />
                    <Text>{el.name}</Text>
                  </Group>
                ),
              }))}
              dataCount={data.count}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              sorting={sorting}
              onSortingChange={setSorting}
              perPage={PER_PAGE}
            />
            <Button onClick={handleBue} loading={isBueLoading}>bue</Button>
          </>
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
