import React from 'react';
import '../scss/global.scss';
import Layout from "../components/Layout";
import {wrapper, store} from '../store';
import {Provider} from "react-redux";

const MyApp = ({Component, pageProps}) => (
  <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Provider>
);

export default wrapper.withRedux(MyApp);
