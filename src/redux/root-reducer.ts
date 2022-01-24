import { combineReducers } from '@reduxjs/toolkit';
import filters from '../Features/Filters/reducer';
import metrics from './metric/reducer';

// Combining reducers using combineReducers
// This helps us divide the reducers into sub reducers for better code segregation
const reducer = combineReducers({
  filters,
  metrics,
});

export type IAppState = ReturnType<typeof reducer>;
export default reducer;
