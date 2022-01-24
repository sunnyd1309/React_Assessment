import React, { useEffect } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Filters from '../../Features/Filters';
import { getMetricsData } from '../../redux/metric/actions';
import Tiles from '../../Features/Tiles';
import { IAppState } from '../../redux/root-reducer';
import Chart from '../../Features/Chart';

const useStyles = makeStyles({
  grid: {
    padding: 32,
    margin: '8px auto 0',
    maxWidth: 'calc(100% - 320px)',
    minHeight: 'calc(100vh - 96px)',
    background: '#fafafa',
    flex: 1,
  },
});

const Dashboard: React.FC = () => {
  const selectedMetrics = useSelector(({ filters }: IAppState) => filters.selectedMetrics);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    // Start fetching the Metrics Info
    dispatch(getMetricsData());
  }, []);
  return (
    <Grid item xs={8} className={classes.grid}>
      <Filters />
      <Tiles />
      {selectedMetrics.length ? <Chart /> : null}
    </Grid>
  );
};

export default Dashboard;
