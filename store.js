import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "./lib/axios";

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

const reducers = (state = initialState, action) => {
  switch (action.type) {
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

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
