import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import Loading from '../../components/Loading';

describe('Loading component', () => {
  it('should render loading bar with redux toolkit store', () => {
    const store = configureStore({
      reducer: {
        loadingBar: loadingBarReducer,
      },
      preloadedState: {
        loadingBar: {
          default: 50,
        },
      },
    });
    const { container } = render(
      <Provider store={store}>
        <Loading />
      </Provider>
    );

    const loadingBar = document.querySelector('.loading-container');
    expect(loadingBar).toBeInTheDocument();
  });
  it('should not render loading bar when loadingBar is 0', () => {
    const store = configureStore({
      reducer: {
        loadingBar: loadingBarReducer,
      },
      preloadedState: {
        loadingBar: {
          default: 0,
        },
      },
    });
    const { container } = render(
      <Provider store={store}>
        <Loading />
      </Provider>
    );

    const loadingBar = document.querySelector('.loading-container');
    expect(loadingBar).toBeInTheDocument();
  });
});
