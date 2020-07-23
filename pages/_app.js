import App from 'next/app';
import React from 'react';
import {Provider} from 'react-redux';
import { createWrapper } from "next-redux-wrapper";
import store from "../store";
import '../scss/global.scss';
import Layout from "../components/Layout";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
