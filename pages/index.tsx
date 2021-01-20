import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { GraphQLClient } from 'graphql-request';
import { GetServerSideProps } from 'next';
import React from 'react';

import LatestBlocks from '../components/Block/LatestBlocks';
import ChartData from '../components/Home/ChartData';
import Epoch from '../components/Home/Epoch';
import TokenPrice from '../components/Home/TokenPrice';
import ValidatorsGroups from '../components/Home/ValidatorsGroups';
import { GET_CHAIN } from '../components/Query/Chain';
import LatestTransactions from '../components/Transaction/LatestTransactions';

const graphQlClient = new GraphQLClient(`http://localhost:4000/graphql`);

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        }
    })
);
type IndexProps = {
    latestHeight: number;
    averageBlockTime: number;
    firstBlockNumberForEpoch: number;
    lastBlockNumberForEpoch: number;
    epochSize: number;
    epochNumber: number;
};

export default function Index({
    latestHeight,
    averageBlockTime,
    firstBlockNumberForEpoch,
    lastBlockNumberForEpoch,
    epochSize,
    epochNumber
}: IndexProps): JSX.Element {
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
                <Epoch
                    latestHeight={latestHeight}
                    averageBlockTime={averageBlockTime}
                    firstBlockNumberForEpoch={firstBlockNumberForEpoch}
                    lastBlockNumberForEpoch={lastBlockNumberForEpoch}
                    epochSize={epochSize}
                    epochNumber={epochNumber}
                />
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

export const getServerSideProps: GetServerSideProps = async () => {
    const chain = await graphQlClient.request(GET_CHAIN, {
        pollInterval: 2000
    });
    const latestHeight = chain?.chain?.latestHeight;
    const averageBlockTime = chain?.chain?.averageBlockTime;
    const firstBlockNumberForEpoch = chain?.chain?.firstBlockNumberForEpoch;
    const lastBlockNumberForEpoch = chain?.chain?.lastBlockNumberForEpoch;
    const epochSize = chain?.chain?.epochSize;
    const epochNumber = chain?.chain?.epochNumber;

    return {
        props: {
            latestHeight,
            averageBlockTime,
            firstBlockNumberForEpoch,
            lastBlockNumberForEpoch,
            epochSize,
            epochNumber
        }
    };
};
