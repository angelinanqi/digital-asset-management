import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/app/searchSlice';

export const store = configureStore({
    reducer: { search: searchReducer },
});