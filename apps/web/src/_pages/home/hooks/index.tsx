import { useCallback, useLayoutEffect, useState } from 'react';
import { useDebouncedValue, useInputState } from '@mantine/hooks';
import { productApi } from 'services/resources/products';
import { accountApi } from 'services/resources/account';
import { PER_PAGE, selectOptions, UsersListParams } from './constants';

export const useHome = () => {
  const { data: account } = accountApi.useGet();
  const [search, setSearch] = useInputState('');
  const [sortBy, setSortBy] = useState(selectOptions[0].items[0].value);
  const [filterDate, setFilterDate] = useState<
  [string | undefined, string | undefined]
  >([undefined, undefined]);

  const [params, setParams] = useState<UsersListParams>({ sort: { createdOn: 'desc' } });
  const { data, isLoading: isProductsLoading } = productApi.useList(params);
  const [activePage, setPage] = useState(1);

  const [debouncedSearch] = useDebouncedValue(search, 500);
  const [debouncedFilter] = useDebouncedValue(filterDate, 500);

  const handleSort = useCallback((value: string) => {
    const newParams: UsersListParams = {
      page: activePage,
      sort: undefined,
    };

    switch (value) {
      case 'newest':
        newParams.sort = { createdOn: 'desc' };
        break;
      case 'oldest':
        newParams.sort = { createdOn: 'asc' };
        break;

      case 'expensive':
        newParams.sort = { price: 'desc' };
        break;

      case 'cheap':
        newParams.sort = { price: 'asc' };
        break;

      default:
        break;
    }
    setSortBy(value);
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  }, [activePage]);

  useLayoutEffect(() => {
    setParams((prev) => ({
      ...prev,
      page: activePage,
      searchValue: debouncedSearch,
      filter: {
        price: {
          from: debouncedFilter[0] || null,
          to: debouncedFilter[1] || null,
        },
      },
      perPage: PER_PAGE,
    }));
  }, [activePage, debouncedFilter, debouncedSearch]);

  const handleResetFilters = useCallback(() => {
    setSearch('');
    setFilterDate([undefined, undefined]);
  }, [setSearch]);

  return {
    data,
    isProductsLoading,
    account,
    search,
    sortBy,
    handleSort,
    handleFilter: setFilterDate,
    setSearch,
    activePage,
    setPage,
    selectOptions,
    filterDate: debouncedFilter,
    handleResetFilters,
  };
};
