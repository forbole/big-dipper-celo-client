import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import LatestBlocks from '../components/block/LatestBlocks';
import ChartData from '../components/home/ChartData';
import Epoch from '../components/home/Epoch';
import TokenPrice from '../components/home/TokenPrice';
import ValidatorsGroups from '../components/home/ValidatorsGroups';
import LatestTransactions from '../components/transaction/LatestTransactions';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

export default function Index(): JSX.Element {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <ChartData />
            </Grid>
            <Grid item xs={12} lg={6}>
                <TokenPrice />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                {/* <Epoch /> */}
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <ValidatorsGroups />
            </Grid>

            <Grid item xs={12} lg={6}>
                <LatestBlocks pagination={false} displayCard={false} />
            </Grid>
            <Grid item xs={12} lg={6}>
                <LatestTransactions pagination={false} />
            </Grid>
        </Grid>
    );
}
