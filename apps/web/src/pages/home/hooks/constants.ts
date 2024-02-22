import { ColumnDef } from '@tanstack/react-table';
import { ComboboxItem } from '@mantine/core';

import { User } from 'types';

export const PER_PAGE = 6;

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => info.getValue(),
  },
];

export const selectOptions: Array<{
  group: string,
  items: Array<ComboboxItem>
}> = [
  {
    group: 'Date',
    items: [
      {
        value: 'newest',
        label: 'Newest',
      },
      {
        value: 'oldest',
        label: 'Oldest',
      },
    ],
  },
  {
    group: 'Price',
    items: [
      {
        value: 'expensive',
        label: 'Expensive',
      },
      {
        value: 'cheap',
        label: 'Cheap',
      },
    ],
  },
];

export type SortBy = 'createdOn' | 'price';
type SortType = 'asc' | 'desc';

export interface UsersListParams {
  page?: number;
  perPage?: number;
  searchValue?: string;
  sort?: Partial<Record<SortBy, SortType>>;
  filter?: {
    price?: {
      from: string | null;
      to: string | null;
    };
  };
}
