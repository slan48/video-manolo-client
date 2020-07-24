import React from 'react';
import { mount } from 'enzyme';
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import ProviderMock from "../../__mocks__/ProviderMock";
import { create } from 'react-test-renderer';

describe('<Layout />', function () {
  const layout = mount(
    <ProviderMock>
      <Layout />
    </ProviderMock>
  );

  test('Layout component render', () => {
    expect(layout.length).toEqual(1);
  })

  test('Layout has header inside', () => {
    expect(layout.find('Header').length).toEqual(1);
  })

  test('Layout Snapshot', () => {
    const layout = create(
      <ProviderMock>
        <Layout />
      </ProviderMock>
    );
    expect(layout.toJSON()).toMatchSnapshot();
  })
});
