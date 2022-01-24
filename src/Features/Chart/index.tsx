import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, YAxis, CartesianGrid, Legend, ResponsiveContainer, XAxis } from 'recharts';
import { metricColors } from '../../constants/colors';
import { IAppState } from '../../redux/root-reducer';

const activeDots = { r: 8 };

const getFormattedTime = (time: string) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes: number = date.getMinutes();
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

// Component for rendering the chart
// Using recharts - npm module for rendering the component on UI
const Chart = () => {
  const dataStream = useSelector((state: IAppState) => state.metrics.dataStream);
  const ticks = Array.from(dataStream.keys());
  const tickValues = Array.from(dataStream.values());

  // Getting the units as a map for the metrics
  const unitsMap = useSelector((state: IAppState) => {
    const values = Array.from(state.metrics.latestMetricInfo.values());
    const keys = Array.from(state.metrics.latestMetricInfo.keys());
    const o: { [key: string]: string } = {};
    values.forEach((v, i) => {
      o[keys[i]] = v.unit;
    });
    return o;
  });

  // Getting the list of selected metrics from redux store
  const selectedMetrics = useSelector((state: IAppState) => state.filters.selectedMetrics);

  return (
    <ResponsiveContainer height={500}>
      <LineChart data={tickValues} style={{ marginTop: '20px' }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          scale="time"
          ticks={ticks}
          type="number"
          interval="preserveStartEnd"
          tickFormatter={getFormattedTime}
          domain={[ticks[0], ticks[ticks.length - 1]]}
        />
        {selectedMetrics.map((metric) => (
          <YAxis key={metric} unit={unitsMap[metric]} yAxisId={`yaxis-${metric}`} orientation="left" />
        ))}
        {selectedMetrics.map((metric) => {
          // Typecasting it to string so TS doesn't break
          const color: string = metricColors[metric];
          return (
            <Line
              key={metric}
              unit={unitsMap[metric]}
              yAxisId={`yaxis-${metric}`}
              dataKey={metric}
              stroke={color}
              activeDot={activeDots}
              dot={false}
            />
          );
        })}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
