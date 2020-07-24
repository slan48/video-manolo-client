import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "./lib/axios";
import Cookie from "js-cookie";
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

const initialState = {
  movies: [],
  selectedMovie: null,
  loggedIn: false
}

const actionTypes = {
  SET_MOVIES: 'SET_MOVIES',
  SET_SELECTED_MOVIE: 'SET_SELECTED_MOVIE',
  CHANGE_LOGGED_IN_STATE: 'CHANGE_LOGGED_IN_STATE',
  CHANGE_IS_ADMIN_STATE: 'CHANGE_IS_ADMIN_STATE',
}

// ACTIONS
export const setMovies = () => async dispatch => {
  try{
    const { data } = await axios.get('movies/available');
    const movies = data.movies;
    dispatch({type: actionTypes.SET_MOVIES, payload: movies})
  } catch (e) {
    console.log(e);
    dispatch({type: actionTypes.SET_MOVIES, payload: []})
  }
}

export const setMovie = (movieId) => async dispatch => {
  try{
    const { data } = await axios.get('movies/' + movieId);
    const movie = data.movie;
    dispatch({type: actionTypes.SET_SELECTED_MOVIE, payload: movie})
  } catch (e) {
    console.log(e);
    dispatch({type: actionTypes.SET_SELECTED_MOVIE, payload: null})
  }
}

export const changeLoggedInState = (newState) => dispatch => {
  dispatch({type: actionTypes.CHANGE_LOGGED_IN_STATE, payload: newState})
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {...state, ...action.payload}

    case actionTypes.SET_MOVIES:
      return {...state, movies: action.payload}

    case actionTypes.SET_SELECTED_MOVIE:
      return {...state, selectedMovie: action.payload}

    case actionTypes.CHANGE_LOGGED_IN_STATE:
      return {...state, loggedIn: action.payload}

    default:
      return state
  }
}

const middleware = [thunk];

// create store
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

// create a makeStore function
const makeStore = context => store;

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: process.env.NEXT_PUBLIC_ENV === 'development'});
