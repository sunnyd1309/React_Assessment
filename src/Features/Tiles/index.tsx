import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/root-reducer';
import { metricColors } from '../../constants/colors';

const useStyles = makeStyles({
  container: {
    padding: '12px',
    fontSize: '1em',
  },
  value: {
    margin: 0,
    fontSize: '1.2em',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.4em',
  },
});

const Tiles = () => {
  const metrics = useSelector((state: IAppState) => state.metrics.latestMetricInfo);
  const selectedMetrics = useSelector((state: IAppState) => state.filters.selectedMetrics);
  const classes = useStyles();

  return selectedMetrics.length ? (
    <Grid container spacing={4}>
      {selectedMetrics.map((metric) => (
        <Grid key={metric} item xs={6}>
          <Box
            className={classes.container}
            style={{
              backgroundColor: metricColors[metric],
            }}
          >
            <div className={classes.title}>
              {metric} (in {metrics.get(metric)?.unit})
            </div>
            <div className={classes.value}>{metrics.get(metric)?.value || '--'}</div>
          </Box>
        </Grid>
      ))}
    </Grid>
  ) : null;
};

export default Tiles;
