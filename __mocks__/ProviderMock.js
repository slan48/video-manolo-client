import React from 'react';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {createWrapper, HYDRATE} from 'next-redux-wrapper';
import {reducer} from "../store";
import {Provider} from "react-redux";

const middleware = [thunk];

// create store
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

// create a makeStore function
const makeStore = context => store;

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: process.env.NEXT_PUBLIC_ENV === 'development'});

const ProviderMock = (props) => (
  <Provider store={store}>
    {props.children}
  </Provider>
);

export default wrapper.withRedux(ProviderMock);
