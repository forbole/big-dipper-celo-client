import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import Transactions from '../components/account/Transactions';
import Link from '../components/Link';
import Overview from '../components/tokens/Overview';
import ProfileSummary from '../components/tokens/ProfileSummary';
import TokenHolders from '../components/tokens/TokenHolders';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'center'
        }
    })
);

export default function Tokens() {
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
