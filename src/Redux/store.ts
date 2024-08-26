import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import workOrdersReducer from './workOrdersSlice';
import calendarReducer from './calendarSlice';
import { loadState, saveState } from 'utils/localStorage';

const makeStore = () => {
  const preloadedState = loadState();

  const store = configureStore({
    reducer: {
      workOrders: workOrdersReducer,
      calendar: calendarReducer,
    },
    preloadedState,
  });

  store.subscribe(() => {
    saveState({
      workOrders: store.getState().workOrders,
      calendar: store.getState().calendar,
    });
  });

  return store;
};

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);
