import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { moviesActions } from "../store/movies/movies";

const actons = {
  ...moviesActions
}

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actons, dispatch);
}