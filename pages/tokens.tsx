import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Layout from '../components/Layout';
import Overview from '../components/tokens/Overview';
import ProfileSummary from '../components/tokens/ProfileSummary';
import Transactions from '../components/accounts/Transactions'
import TokenHolders from '../components/tokens/TokenHolders'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        root: {
            display: 'block-inline',
            justifyContent: 'center',
            },
            
        bottomPadding:{
            overflow: 'auto',
            padding: '1.5rem'
        },


    }),
    );   






export default function Tokens() {
  const classes = useStyles();

  return (
    <Layout >
        <Grid container className={classes.root} xs={12}  >
          
            <Grid item xs={12} lg={5} className={classes.bottomPadding}>
                <Overview />
            </Grid>
           
            <Grid item xs={12} lg={5} className={classes.bottomPadding}>
                <ProfileSummary />
            </Grid>
            
            <Grid item xs={12} lg={5} className={classes.bottomPadding}>
               <Transactions />
            </Grid>

            <Grid item xs={12} lg={5} className={classes.bottomPadding}>
               <TokenHolders />
            </Grid>
    </Grid>
    </Layout>
  );
}