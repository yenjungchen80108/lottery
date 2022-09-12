import {
    Action,
    configureStore,
    ThunkAction,
  } from '@reduxjs/toolkit';
import countReducer from '../page-components/Timer/timerSlice';

export const store = configureStore({
reducer: {
    count: countReducer
},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;