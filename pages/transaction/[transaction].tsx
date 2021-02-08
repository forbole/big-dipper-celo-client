import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useRouter } from 'next/router';
import React from 'react';

import InputCard from '../../components/Transaction/InputCard';
import InputParameters from '../../components/Transaction/InputParameters';
import TransactionDetails from '../../components/Transaction/TransactionDetails';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

export default function Transaction(): JSX.Element {
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
