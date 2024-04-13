import { Pagination } from '@mantine/core';
import { useAppSelector } from '../../hooks/hooks';
import { useActions } from '../../hooks/actions';
import { useLocation, useSearchParams } from 'react-router-dom';

interface PaginationsProps {
  value: number;
  total: number;
  onChangePage: (e: number) => void;
  size?: string;
}

export const Paginations = (props: PaginationsProps) => {
  const { value, total, onChangePage, size } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = useAppSelector(state => state.searchResult);
  const location = useLocation();
  const handlerPagination = (e: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if(location.pathname === '/movies') {
      newSearchParams.set('page', String(e));
    } else {
      onChangePage(e)
    }
    setSearchParams(newSearchParams)
  };
  return (
    <Pagination
      size={size ? 'xs' : 'sm'}
      value={value}
      onChange={handlerPagination}
      total={total}
      mt="xs"
      style={{ marginLeft: 'auto', marginRight: 'auto' }}
      siblings={0}
    />
  );
};
