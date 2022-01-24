import { gql } from '@apollo/client';

export const newMeasurementQuery = gql`
  subscription {
    metricInfo: newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

export const getMetricsQuery = gql`
  {
    metrics: getMetrics
  }
`;

export const weatherQuery = gql`
  query ($latLong: WeatherQuery!) {
    getWeatherForLocation(latLong: $latLong) {
      description
      locationName
      temperatureinCelsius
    }
  }
`;
