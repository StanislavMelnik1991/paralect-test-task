import { ColumnDef } from '@tanstack/react-table';
import { ComboboxItem } from '@mantine/core';

import { Product } from 'types';

export const PER_PAGE = 5;

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'image',
    header: 'image',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'name',
    header: 'Product',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
];

export const selectOptions: ComboboxItem[] = [
  {
    value: 'newest',
    label: 'Newest',
  },
  {
    value: 'oldest',
    label: 'Oldest',
  },
];

export interface CartProducts {
  id: string
  image: string
  name: string
  price: number
  quantity: number
}
