import { apolloClient } from '../../constants';
import { newMeasurementQuery } from '../../constants/query';

export const actionTypes = {
  GET_METRICS_DATA: 'GET_METRICS_DATA',
};

// Metric data handled vai apollocient subscription
export const getMetricsData = () => async (dispatch: any) => {
  const request = apolloClient.subscribe({
    query: newMeasurementQuery,
  });
  request.subscribe({
    next({ data }) {
      dispatch({ type: actionTypes.GET_METRICS_DATA, payload: data.metricInfo });
    },
  });
};
