import { configureStore } from '@reduxjs/toolkit';
import clientSlice from './clientSlice';

export const store = configureStore({
  reducer: {
    client: clientSlice,
  }
});