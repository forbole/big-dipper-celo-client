import 'date-fns';

import { useQuery } from '@apollo/client';
import DateFnsUtils from '@date-io/date-fns';
import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import numbro from 'numbro';
import React from 'react';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

import { GET_CHAIN } from '../Query/Chain';
import { GET_COIN_HISTORY_BY_DATES } from '../Query/Coin';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
import NotAvailable from '../Utils/NotAvailable';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            padding: '1.5%',
            borderRadius: 4,
            overflow: 'hidden'
        },
        box: {
            letterSpacing: '1px',
            padding: '0.6rem',
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },

        label: {
            display: 'flex',
            padding: '0 0 0 0.5rem',
            marginTop: '-0.5rem'
        },
        value: {
            display: 'inline-block',
            padding: '0.3rem 0 0  0.5rem'
        },
        priceCard: {
            display: 'inline-block',
            borderLeft: '4px solid rgba(102, 227, 157, 1)',
            alignItems: 'left',
            marginLeft: '1rem',
            height: '60%',
            overflow: 'visible',
            marginTop: '1rem'
        },
        marketCard: {
            display: 'inline-block',
            borderLeft: '4px solid rgba(255, 177, 52, 1)',
            alignItems: 'left',
            marginLeft: '1rem',
            height: '60%',
            overflow: 'visible',
            marginTop: '1rem'
        },

        priceCardsProps: {
            display: 'flex'
        },
        selectDateFrom: {
            fontSize: '0.75rem',
            [theme.breakpoints.down('sm')]: {
                transform: 'translate(0, 1.5px) scale(0.90)'
            },
            marginRight: '1rem',
            marginLeft: '0.6rem',
            position: 'relative'
        },
        selectDateTo: {
            fontSize: '0.75rem',
            [theme.breakpoints.down('sm')]: {
                transform: 'translate(0, 1.5px) scale(0.90)'
            },
            marginRight: '1rem',
            marginLeft: '1rem',
            position: 'relative'
        },
        dateSelection: {
            display: 'flex',
            padding: '0.5rem 0'
        },

        selectDateGrid: {
            fontSize: '14px',
            display: 'inline-flex'
        },

        tooltip: {
            opacity: 5,
            width: '19.125rem',
            height: '5rem'
        },

        tooltipCard: {
            padding: '0.625rem'
        },

        tooltipTime: {
            fontWeight: 600
        },

        tooltipCeloPrice: {
            fontWeight: 600,
            color: 'rgba(53,208,125,1)'
        },

        tooltipMarketCap: {
            fontWeight: 600,
            color: 'rgba(239,195,78,1)'
        }
    })
);

type TokenPriceTooltipProps = { active?: boolean; payload?: any };

const TokenPriceTooltip = ({ active, payload }: TokenPriceTooltipProps) => {
    const classes = useStyles();

    if (active && payload) {
        return (
            <Card className={classes.tooltip}>
                <CardContent className={classes.tooltipCard}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Typography
                                color="textPrimary"
                                variant="body2"
                                align="left"
                                className={classes.tooltipTime}>
                                Time
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography color="textPrimary" variant="body2" align="right">
                                {moment.utc(payload[0]?.payload?.Time).format('Do MMMM, h:mm:ss a')}{' '}
                                UTC
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography
                                color="textPrimary"
                                variant="body2"
                                align="left"
                                className={classes.tooltipCeloPrice}>
                                CELO Price
                            </Typography>
                        </Grid>

                        <Grid item xs={7}>
                            <Typography color="textPrimary" variant="body2" align="right">
                                {payload[0]?.payload?.CELO} USD
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography
                                color="textPrimary"
                                variant="body2"
                                align="left"
                                className={classes.tooltipMarketCap}>
                                Market Cap
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography color="textPrimary" variant="body2" align="right">
                                {payload[0]?.payload?.Market_Cap} USD
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    return null;
};

const StyledDatePicker = withStyles({
    root: {
        '& div.MuiInputAdornment-positionEnd ': {
            // marginLeft: "-30%",
            position: 'absolute',
            marginLeft: '5.5rem'
        },
        '& .MuiFormLabel-root': {
            transform: 'translate(0, -1px) scale(1)',
            marginBottom: '0.5rem',
            position: 'absolute'
        },

        '& .MuiInputBase-root': {
            marginTop: '1.3rem',
            position: 'relative'
        },

        '& .MuiFormLabel-asterisk': {
            display: 'none'
        }
    }
})(KeyboardDatePicker);

function formatDate(date: any) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return [day, month, year].join('-');
}

const TokenPrice = (): JSX.Element => {
    const classes = useStyles();

    const currentDay = new Date();
    const weekBefore = currentDay.setDate(currentDay.getDate() - 7); //returns unix timestamp
    const oneWeekBefore = new Date(weekBefore); //parse unix timestamp to Date

    //set line chart to display past 7 days by default
    const [dateFrom, setDateFrom] = React.useState<Date | string | null>(formatDate(oneWeekBefore));

    const [dateTo, setDateTo] = React.useState<Date | string | null>(formatDate(new Date()));

    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDateFromChange = (date: Date | string | null) => {
        const formatDateFrom = formatDate(date);
        setDateFrom(formatDateFrom);
    };

    const handleDateToChange = (date: Date | string | null) => {
        const formatDateTo = formatDate(date);
        setDateTo(formatDateTo);
    };

    const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;

    const SelectDate = () => {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.dateSelection}>
                    <Grid item xs={6}>
                        <StyledDatePicker
                            disableToolbar
                            disableFuture
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="none"
                            id="date-picker-from"
                            label={<Typography variant="body2">Date from</Typography>}
                            value={dateFrom}
                            onChange={handleDateFromChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                            className={classes.selectDateFrom}
                            autoOk={true}
                            helperText=""
                            error={false}
                            required
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <StyledDatePicker
                            disableToolbar
                            disableFuture
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="none"
                            id="date-picker-to"
                            label={<Typography variant="body2">Date to</Typography>}
                            value={dateTo}
                            onChange={handleDateToChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                            className={classes.selectDateTo}
                            autoOk={true}
                            helperText=""
                            error={false}
                            required
                            inputValue=""
                        />
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
        );
    };

    const coinHistoryByDates = useQuery(GET_COIN_HISTORY_BY_DATES, {
        variables: { dateFrom, dateTo },
        pollInterval: 5000
    });

    const chainData = useQuery(GET_CHAIN, {
        pollInterval: 5000
    });

    if (coinHistoryByDates.loading && chainData.loading) return <ComponentLoader />;
    if (coinHistoryByDates.error || chainData.error)
        return (
            <ErrorMessage
                message={
                    (coinHistoryByDates?.error?.message as string) ||
                    (chainData?.error?.message as string)
                }
            />
        );

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <Typography variant="body1" className={classes.box}>
                            Token Price
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={2} className={classes.priceCardsProps}>
                                <Card className={classes.priceCard} elevation={0}>
                                    <Typography
                                        variant="body2"
                                        className={classes.label}
                                        color="textSecondary"
                                        noWrap>
                                        Price
                                    </Typography>
                                    {chainData?.data?.chain?.tokenPrice?.usd >= 0 ? (
                                        <Typography
                                            variant="body1"
                                            className={classes.value}
                                            color="textPrimary"
                                            noWrap>
                                            ${' '}
                                            {numbro(chainData?.data?.chain?.tokenPrice?.usd).format(
                                                '0.00'
                                            )}
                                        </Typography>
                                    ) : (
                                        <NotAvailable variant="body2" />
                                    )}
                                </Card>
                            </Grid>
                            <Grid item xs={6} md={4} className={classes.priceCardsProps}>
                                <Card className={classes.marketCard} elevation={0}>
                                    <Typography
                                        variant="body2"
                                        className={classes.label}
                                        color="textSecondary"
                                        noWrap>
                                        Market Cap
                                    </Typography>
                                    {chainData?.data?.chain?.celoTotalSupply &&
                                    chainData?.data?.chain?.tokenPrice?.usd >= 0 ? (
                                        <Typography
                                            variant="body1"
                                            className={classes.value}
                                            color="textPrimary"
                                            noWrap>
                                            ${' '}
                                            {new BigNumber(chainData?.data?.chain?.tokenPrice?.usd)
                                                .dividedBy(CELO_FRACTION)
                                                .times(chainData?.data?.chain?.celoTotalSupply)
                                                .toFormat(2)}
                                        </Typography>
                                    ) : (
                                        <NotAvailable variant="body2" />
                                    )}
                                </Card>
                            </Grid>
                            <Hidden smDown>
                                <Grid item md={6}>
                                    <SelectDate />
                                </Grid>
                            </Hidden>
                        </Grid>

                        <Hidden mdUp>
                            <Grid container className={classes.selectDateGrid}>
                                <Grid item xs={12} md={5} className={classes.selectDateGrid}>
                                    <SelectDate />
                                </Grid>
                            </Grid>
                        </Hidden>
                        <ResponsiveContainer width="100%" height={smallScreen ? 200 : 292}>
                            {coinHistoryByDates?.data?.coinHistoryByDates?.prices ? (
                                <LineChart
                                    width={500}
                                    height={250}
                                    data={
                                        coinHistoryByDates?.data?.coinHistoryByDates?.prices
                                            ? coinHistoryByDates?.data?.coinHistoryByDates?.prices
                                            : 0
                                    }
                                    margin={{
                                        top: 20,
                                        right: 20,
                                        left: 0,
                                        bottom: 0
                                    }}>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        strokeWidth={1}
                                        opacity={0.3}
                                    />
                                    <XAxis
                                        dataKey="Time"
                                        tick={{
                                            stroke: 'rgba(119, 119, 119, 1)',
                                            fontSize: 10,
                                            fontWeight: 100
                                        }}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        tickSize={0}
                                        tickMargin={10}
                                        tick={{
                                            stroke: 'rgba(119, 119, 119, 1)',
                                            fontSize: 10,
                                            fontWeight: 100
                                        }}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        tickSize={0}
                                        tickMargin={10}
                                        tick={{
                                            stroke: 'rgba(119, 119, 119, 1)',
                                            fontSize: 10,
                                            fontWeight: 100
                                        }}
                                        domain={[0, 5000000000]}
                                    />
                                    <Tooltip content={<TokenPriceTooltip />} />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="CELO"
                                        stroke="rgba(102, 227, 157, 1)"
                                        activeDot={{ stroke: 'rgba(102, 128, 113, 1)', r: 3 }}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="Market_Cap"
                                        stroke="rgba(255, 177, 52, 1)"
                                        activeDot={{ stroke: 'rgba(250, 123, 108, 1)', r: 0 }}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            ) : (
                                <ComponentLoader />
                            )}
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default TokenPrice;
