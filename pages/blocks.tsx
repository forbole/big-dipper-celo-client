
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import ChartData from '../components/ChartData';
import LatestTransactions from '../components/LatestTransactions';
import Grid from '@material-ui/core/Grid';
import Transactions from '../components/Transactions'
import LatestBlocks from '../components/LatestBlocks';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        root: {
            display: 'block-inline',
            justifyContent: 'center',
            },

        bottomPadding:{
            overflow: 'auto',
            padding: '1.5%'
          },

          }),
          );   
          
export default function Index() {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container className={classes.root}  >
            <Grid item xs={12} className={classes.bottomPadding}> 
            <LatestBlocks pagination={true} />
            </Grid>
        </Grid>
    </Layout>
  );
}