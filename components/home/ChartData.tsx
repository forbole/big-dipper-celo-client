import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BigNumber from 'bignumber.js';
import cx from 'clsx';
import numbro from 'numbro';
import React from 'react';

import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import NotAvailable from '../misc/NotAvailable';
import { GET_CHAIN } from '../query/Chain';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        padding: '1.5%'
    },

    blocksCard: {
        display: 'block',
        justifyContent: 'center',
        borderRadius: 4,
        background: 'rgba(53, 208, 126, 1)',
        alignItems: 'left',
        height: '8.75rem'
    },
    transactionsCard: {
        display: 'block',
        justifyContent: 'center',
        borderRadius: 4,
        background: 'rgba(190, 150, 253, 1)',
        alignItems: 'left',
        height: '8.75rem'
    },
    priceCard: {
        display: 'block',
        justifyContent: 'center',
        borderRadius: 4,
        background: 'rgba(250, 123, 108, 1)',
        alignItems: 'left',
        height: '8.75rem'
    },
    marketCapCard: {
        display: 'block',
        justifyContent: 'center',
        borderRadius: 4,
        background: 'rgba(239, 195, 78, 1)',
        alignItems: 'left',
        height: '8.75rem'
    },
    card: {
        display: 'block',
        justifyContent: 'center',
        borderLeft: '4px solid #FBCC5C',
        borderRadius: 4,
        background: 'rgba(255, 255, 255, 1)',
        alignItems: 'center',
        height: '100%'
    },
    value: {
        fontWeight: 300,
        display: 'inline-block',
        padding: '0 0.75rem 2rem 1.5rem',
        color: 'rgba(255, 255, 255, 1)'
    },
    valueSuffix: {
        padding: '0.2rem 0.75rem 0.5rem 0'
    },
    label: {
        display: 'flex',
        padding: '1.5rem 0.75rem 1rem 1.5rem',
        color: 'rgba(255, 255, 255, 1)'
    },

    dollarSign: {
        color: 'rgba(255, 255, 255, 1)',
        display: 'inline-block',
        marginLeft: '1.5rem',
        verticalAlign: 'text-bottom'
    },
    dollarValue: {
        color: 'rgba(255, 255, 255, 1)',
        fontWeight: 300,
        display: 'inline-flex'
    }
});

const ChartData = (): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const { loading, error, data } = useQuery(GET_CHAIN, {
        pollInterval: 5000
    });

    if (loading) return <ComponentLoader size="small" />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={6} md={3}>
                    <Card className={cx(classes.blocksCard)} elevation={0}>
                        <Typography variant="body2" className={classes.label}>
                            Total blocks
                        </Typography>
                        {data.chain && data.chain.latestHeight >= 0 ? (
                            <Typography variant="h4" className={classes.value}>
                                {largeScreen
                                    ? numbro(data.chain.latestHeight).format('000,000')
                                    : numbro(data.chain.latestHeight).format({
                                          average: true,
                                          mantissa: 4
                                      })}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body1" className={classes.value} />
                        )}
                    </Card>
                </Grid>

                <Grid item xs={6} md={3}>
                    <Card className={cx(classes.transactionsCard)} elevation={0}>
                        <Typography variant="body2" className={classes.label}>
                            Total transactions
                        </Typography>
                        {data.chain && data.chain.txCount >= 0 ? (
                            <Typography variant="h4" className={classes.value}>
                                {largeScreen
                                    ? numbro(data.chain.txCount).format('000,000')
                                    : numbro(data.chain.txCount).format({
                                          average: true,
                                          mantissa: 4
                                      })}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body1" className={classes.value} />
                        )}
                    </Card>
                </Grid>

                <Grid item xs={6} md={3}>
                    <Card className={cx(classes.priceCard)} elevation={0}>
                        <Typography variant="body2" className={classes.label}>
                            Celo Price
                        </Typography>
                        {data.chain.tokenPrice && data.chain.tokenPrice.usd >= 0 ? (
                            <>
                                {' '}
                                <Typography variant="h6" className={classes.dollarSign}>
                                    $
                                </Typography>
                                <Typography variant="h4" className={classes.dollarValue}>
                                    {numbro(data.chain.tokenPrice.usd).format('0.00')}
                                </Typography>{' '}
                            </>
                        ) : (
                            <NotAvailable variant="body1" className={classes.value} />
                        )}
                    </Card>
                </Grid>

                <Grid item xs={6} md={3}>
                    <Card className={cx(classes.marketCapCard)} elevation={0}>
                        <Typography variant="body2" className={classes.label}>
                            Market Cap
                        </Typography>
                        {data.chain &&
                        data.chain.celoTotalSupply &&
                        data.chain.tokenPrice &&
                        data.chain.tokenPrice.usd >= 0 ? (
                            <>
                                <Typography variant="h6" className={classes.dollarSign}>
                                    $
                                </Typography>
                                <Typography
                                    variant="h4"
                                    className={classes.dollarValue}
                                    noWrap={false}>
                                    {largeScreen
                                        ? new BigNumber(
                                              (data.chain.tokenPrice.usd *
                                                  data.chain.celoTotalSupply) /
                                                  process.env.CELO
                                          ).toFormat(2)
                                        : numbro(
                                              new BigNumber(
                                                  (data.chain.tokenPrice.usd *
                                                      data.chain.celoTotalSupply) /
                                                      process.env.CELO
                                              ).toFormat(2)
                                          ).format({ average: true, mantissa: 4 })}
                                </Typography>
                            </>
                        ) : (
                            <NotAvailable variant="body1" className={classes.value} />
                        )}
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default ChartData;
