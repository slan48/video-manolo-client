import configureMockStore from 'redux-mock-store';
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import {setMovies, setMovie, changeLoggedInState, initialState, actionTypes} from "../../store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Actions', function () {
  test('setMovies action', async done => {
    const store = mockStore(initialState);
    const expectedActions = [
      actionTypes.SET_MOVIES
    ]

    fetchMock.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/movies/available', {response: 200})
    await store.dispatch(setMovies())
      .then(() => {
        const actualActions = store.getActions().map(action => action.type)
        expect(actualActions).toEqual(expectedActions)
      })
    fetchMock.restore()
    done();
  })

  test('setMovie action', async done => {
    const store = mockStore(initialState);
    const expectedActions = [
      actionTypes.SET_SELECTED_MOVIE
    ]

    fetchMock.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/movies/*', {response: 200})
    await store.dispatch(setMovie('testing'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type)
        expect(actualActions).toEqual(expectedActions)
      })
    fetchMock.restore()
    done();
  })

  test('changeLoggedInState action', () => {
    const store = mockStore(initialState);
    const expectedActions = [
      actionTypes.CHANGE_LOGGED_IN_STATE
    ]

    store.dispatch(changeLoggedInState(false))
    const actualActions = store.getActions().map(action => action.type)
    expect(actualActions).toEqual(expectedActions)
  })

});
