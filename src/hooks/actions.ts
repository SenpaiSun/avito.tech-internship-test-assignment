import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { moviesActions } from '../store/movies/movies';
import { filtersActions } from '../store/movies/filters';
import { searchResultActions } from '../store/movies/searchResult';

const actons = {
  ...moviesActions,
  ...filtersActions,
  ...searchResultActions
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actons, dispatch);
};