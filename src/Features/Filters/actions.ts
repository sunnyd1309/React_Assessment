import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { apolloClient } from '../../constants';
import { getMetricsQuery } from '../../constants/query';

export const actionTypes = {
  GET_METRICS_SUCCESS: 'GET_METRICS_SUCCESS',
  METRICS_FILTER_SELECTED: 'METRICS_FILTER_SELECTED',
};

// Defining a type for ThunkAction
export type ThunkAppAction = ThunkAction<void, undefined, unknown, AnyAction>;

export const getMetrics = (): ThunkAppAction => async (dispatch: any) => {
  const { data } = await apolloClient.query({ query: getMetricsQuery });
  dispatch({ type: actionTypes.GET_METRICS_SUCCESS, payload: data.metrics });
};

export const selectMetrics = (payload: string[]) => ({
  type: actionTypes.METRICS_FILTER_SELECTED,
  payload,
});
