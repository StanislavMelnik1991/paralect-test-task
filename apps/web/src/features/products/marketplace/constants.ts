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
        label: 'Sort by newest',
      },
      {
        value: 'oldest',
        label: 'Sort by oldest',
      },
    ],
  },
  {
    group: 'Price',
    items: [
      {
        value: 'expensive',
        label: 'Sort by expensive',
      },
      {
        value: 'cheap',
        label: 'Sort by cheap',
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
