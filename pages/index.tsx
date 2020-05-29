import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Layout from '../components/Layout';
import ChartData from '../components/ChartData';
import LatestBlocks from '../components/LatestBlocks';
import LatestTransactions from '../components/LatestTransactions';
import Grid from '@material-ui/core/Grid';
import Transactions from '../components/Transactions'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        root: {
            display: 'block-inline',
            justifyContent: 'center',
            },

        bottomPadding:{
            //overflow: 'auto',
            padding: '1.5rem'
          },

          }),
          );   
          
export default function Index() {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container className={classes.root}  >
            <Grid item xs={12} className={classes.bottomPadding}> 
                <ChartData />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.bottomPadding}> 
                <LatestBlocks pagination={false} />
            </Grid>
            <Grid item xs={12} lg={6} className={classes.bottomPadding}> 
                <LatestTransactions pagination={false} />
            </Grid>
        </Grid>
    </Layout>
  );
}

        