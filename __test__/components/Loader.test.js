import React from 'react';
import { mount } from 'enzyme';
import Loader from "../../components/Loader";
import { create } from 'react-test-renderer';

describe('<Loader />', function () {
  test('Loader component render', () => {
    const loader = mount(<Loader />);
    expect(loader.length).toEqual(1);
  })

  test('Loader Snapshot', () => {
    const loader = create(
      <Loader />
    );
    expect(loader.toJSON()).toMatchSnapshot();
  })
});
