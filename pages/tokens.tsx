import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import Transactions from '../components/Account/Transactions';
import Overview from '../components/Tokens/Overview';
import ProfileSummary from '../components/Tokens/ProfileSummary';
import TokenHolders from '../components/Tokens/TokenHolders';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            justifyContent: 'center'
        }
    })
);

export default function Tokens(): JSX.Element {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <Overview />
            </Grid>

            <Grid item xs={12}>
                <ProfileSummary />
            </Grid>

            <Grid item xs={12}>
                <Transactions address="" />
            </Grid>

            <Grid item xs={12}>
                <TokenHolders />
            </Grid>
        </Grid>
    );
}
