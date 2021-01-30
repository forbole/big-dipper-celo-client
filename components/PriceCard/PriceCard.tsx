import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BigNumber from 'bignumber.js';
import cx from 'clsx';
import numbro from 'numbro';
import React from 'react';

import { GET_CHAIN } from '../Query/Chain';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
import NotAvailable from '../Utils/NotAvailable';

const useStyles = makeStyles(() => {
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
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: 4,
            marginBottom: '1rem'
        }
    };
});

const PriceCard = (): JSX.Element => {
    const classes = useStyles();

    const chainData = useQuery(GET_CHAIN, {
        pollInterval: 5000
    });

    const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;

    if (chainData.error) return <ErrorMessage />;

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
                            <ComponentLoader size="small" />
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
                                {new BigNumber(chainData.data.chain.tokenPrice.usd)
                                    .dividedBy(CELO_FRACTION)
                                    .times(chainData.data.chain.celoTotalSupply)
                                    .toFormat(2)}{' '}
                            </Typography>
                        ) : (
                            <ComponentLoader size="small" />
                        )}
                    </Grid>
                </Grid>
            </Card>
        </Hidden>
    );
};

export default PriceCard;
