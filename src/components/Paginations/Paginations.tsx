import { Pagination } from '@mantine/core';
import { useAppSelector } from '../../hooks/hooks';
import { useActions } from '../../hooks/actions';

interface PaginationsProps {
  value: number
  total: number
  onChangePage?: (e: number) => void
  size?: string
}

export const Paginations = (props: PaginationsProps) => {
  const { value, total, onChangePage, size } = props;
  const { setPage } = useActions();
  const handlerPagination = (e: number) => {
    onChangePage ? onChangePage(e) : setPage(e)
  }
  return (
    <Pagination
      size={size ? 'xs' : 'default'}
      value={value}
      onChange={handlerPagination}
      total={total}
      mt="xs"
      style={{ marginLeft: 'auto', marginRight: 'auto' }}
    />
  );
};
