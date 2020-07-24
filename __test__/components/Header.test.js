import React from 'react';
import { mount, shallow } from 'enzyme';
import ProviderMock from "../../__mocks__/ProviderMock";
import Header from "../../components/Header";
import { create } from 'react-test-renderer';

describe('<Header />', function () {
  const header = mount(
    <ProviderMock>
      <Header />
    </ProviderMock>
  );

  test('Header component render', () => {
    expect(header.length).toEqual(1);
  })

  test('Render <h1> tag', () => {
    expect(header.find('h1').length).toEqual(1);
  })

  test('Header Snapshot', () => {
    const header = create(
      <ProviderMock>
        <Header />
      </ProviderMock>
    );
    expect(header.toJSON()).toMatchSnapshot();
  })
});
