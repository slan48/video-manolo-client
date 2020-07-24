import { initialState, reducer, actionTypes } from "../../store";
import movieMock from "../../__mocks__/movieMock";

describe('Reducers', () => {
  test('SET_MOVIES', () => {
    const payload = [
      movieMock
    ]
    const action = {
      type: actionTypes.SET_MOVIES,
      payload
    }
    const expected = {
      ...initialState,
      movies: [movieMock]
    }

    expect(reducer(initialState, action)).toEqual(expected)
  })

  test('SET_SELECTED_MOVIE', () => {
    const payload = movieMock
    const action = {
      type: actionTypes.SET_SELECTED_MOVIE,
      payload
    }
    const expected = {
      ...initialState,
      selectedMovie: movieMock
    }

    expect(reducer(initialState, action)).toEqual(expected)
  })

  test('CHANGE_LOGGED_IN_STATE', () => {
    const payload = false
    const action = {
      type: actionTypes.CHANGE_LOGGED_IN_STATE,
      payload
    }
    const expected = {
      ...initialState,
      loggedIn: false
    }

    expect(reducer(initialState, action)).toEqual(expected)
  })
})

