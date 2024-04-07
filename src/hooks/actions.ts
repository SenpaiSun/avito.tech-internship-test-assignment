import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { moviesActions } from '../store/movies/movies';
import { filtersActions } from '../store/movies/filters';

const actons = {
  ...moviesActions,
  ...filtersActions
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actons, dispatch);
};
