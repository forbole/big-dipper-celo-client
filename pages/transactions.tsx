import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import LatestTransactions from '../components/Transaction/LatestTransactions';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

export default function Transactions(): JSX.Element {
    const classes = useStyles();
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <LatestTransactions pagination={true} />
            </Grid>
        </Grid>
    );
}
