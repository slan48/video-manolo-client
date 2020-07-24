import React from 'react';
import { mount } from 'enzyme';
import MoviesList from "../../components/MoviesList";
import ProviderMock from "../../__mocks__/ProviderMock";
import { create } from 'react-test-renderer';

describe('<MoviesList />', function () {
  test('MoviesList component render', () => {
    const moviesList = mount(
      <ProviderMock>
        <MoviesList />
      </ProviderMock>
    );
    expect(moviesList.length).toEqual(1);
  })

  test('Loader Snapshot', () => {
    const moviesList = create(
      <ProviderMock>
        <MoviesList />
      </ProviderMock>
    );
    expect(moviesList.toJSON()).toMatchSnapshot();
  })
});
