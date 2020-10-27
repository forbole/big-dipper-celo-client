import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import PriceCard from '../components/PriceCard';
// import DepositList from '../components/proposal/DepositList';
import ProposalList from '../components/proposal/ProposalList';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);

export default function Proposals(): JSX.Element {
    const classes = useStyles();
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <PriceCard />
            </Grid>
            <Grid item xs={12}>
                <ProposalList />
            </Grid>
            <Grid item xs={12}>
                {/* <DepositList /> */}
            </Grid>
        </Grid>
    );
}
