import { Pagination } from '@mantine/core';
import { useAppSelector } from '../../hooks/hooks';
import { useActions } from '../../hooks/actions';

export const Paginations = () => {
  const moviesData = useAppSelector(state => state.movies);
  const filterData = useAppSelector(state => state.filters);
  const { setPage } = useActions();
  const handlerPagination = (e: number) => {
    setPage(e)
  }
  return (
    <Pagination
      value={filterData.page}
      onChange={handlerPagination}
      total={moviesData?.pages}
      mt="xs"
      style={{ marginLeft: 'auto', marginRight: 'auto' }}
    />
  );
};
