import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import workOrdersReducer from './workOrdersSlice';
import calendarReducer from './calendarSlice'; // Import the calendar slice
import { loadState, saveState } from 'utils/localStorage';

const makeStore = () => {
    const preloadedState = loadState();

    const store = configureStore({
        reducer: {
            workOrders: workOrdersReducer,
            calendar: calendarReducer,  // Add the calendar slice here
        },
        preloadedState,  // Initialize the store with the saved state
    });

    store.subscribe(() => {
        saveState({
            workOrders: store.getState().workOrders,
            calendar: store.getState().calendar, // Save the calendar state to localStorage
        });
    });

    return store;
};

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);
