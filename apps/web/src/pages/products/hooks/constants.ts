export const PER_PAGE = 9;

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
