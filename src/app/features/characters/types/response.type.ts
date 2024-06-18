import { Pagination } from './pagination.type';

export type Response<T> = {
  info: Pagination;
  results: T[];
};
