import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React from 'react';

import InputCard from '../../components/transaction/InputCard';
import InputParameters from '../../components/transaction/InputParameters';
import TransactionDetails from '../../components/transaction/TransactionDetails';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

export default function Transaction() {
    const classes = useStyles();
    const router = useRouter();
    const transactionHash: string = router.query.transaction as string;

    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <TransactionDetails hash={transactionHash} />
            </Grid>
            <Grid item xs={12}>
                <InputCard hash={transactionHash} />
            </Grid>
            <Grid item xs={12}>
                <InputParameters hash={transactionHash} />
            </Grid>
        </Grid>
    );
}
