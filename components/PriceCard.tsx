import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BigNumber from 'bignumber.js';
import cx from 'clsx';
import numbro from 'numbro';
import React from 'react';

import Link from '../components/Link';
import ComponentLoader from './misc/ComponentLoader';
import ErrorMessage from './misc/ErrorMessage';
import NotAvailable from './misc/NotAvailable';
import { GET_CHAIN } from './query/Chain';

const useStyles = makeStyles(({ spacing }) => {
    return {
        smallCard: {
            display: 'flex',
            padding: '0.5rem',
            border: 'solid 1px rgba(61, 66, 71, 1)',
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: 4,
            width: '13rem'
        },

        largeCard: {
            display: 'flex',
            padding: '1rem',
            //border: "solid 1px rgba(61, 66, 71, 1)",
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: 4,
            marginBottom: '1rem'
        }
    };
});

const PriceCard = () => {
    const classes = useStyles();

    const chainData = useQuery(GET_CHAIN, {
        pollInterval: 5000
    });

    if (chainData.loading) return <ComponentLoader />;
    if (chainData.error) return <ErrorMessage message={chainData.error.message} />;

    return (
        <Hidden smUp>
            <Card className={cx(classes.largeCard)} elevation={0}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography align="left" variant="body1">
                            CELO Price
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {chainData.data &&
                        chainData.data.chain &&
                        chainData.data.chain.tokenPrice &&
                        chainData.data.chain.tokenPrice.usd >= 0 ? (
                            <Typography align="right" variant="body1">
                                $ {numbro(chainData.data.chain.tokenPrice.usd).format('0.00')}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="left" variant="body1">
                            Market Cap
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {chainData.data &&
                        chainData.data.chain &&
                        chainData.data.chain.celoTotalSupply &&
                        chainData.data.chain.tokenPrice &&
                        chainData.data.chain.tokenPrice.usd >= 0 ? (
                            <Typography align="right" variant="body1">
                                ${' '}
                                {new BigNumber(
                                    (chainData.data.chain.tokenPrice.usd *
                                        chainData.data.chain.celoTotalSupply) /
                                        process.env.CELO
                                ).toFormat(2)}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
                    </Grid>
                </Grid>
            </Card>
        </Hidden>
    );
};

export default PriceCard;
