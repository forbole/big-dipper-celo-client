import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Transactions from '../components/account/Transactions';
import Overview from '../components/tokens/Overview';
import ProfileSummary from '../components/tokens/ProfileSummary';
import TokenHolders from '../components/tokens/TokenHolders';

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
